import Map "mo:map/Map";
import { phash; nhash } "mo:map/Map";
import Types "types";
import { now } "mo:base/Time";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Int "mo:base/Int";
import Blob "mo:base/Blob";
import ICP_Ledger "./interfaces/ledger_icp";
import ST_ICP_Ledger "./interfaces/ledger_st_icp";
import Meta_pool "./interfaces/meta_pool";
import Hex "./Hex";
import Error "mo:base/Error";


shared ({ caller = Deployer }) actor class ( ) = this {

  type User = Types.User;
  type Creator = Types.UserCreator;
  type Brand = Types.UserBrand;
  type Publication = Types.Publication;
  type Partnership = Types.Partnership;

  stable let users = Map.new<Principal, User>();
  stable let creators = Map.new<Principal, Creator>();
  stable let partnerships = Map.new<Principal, Partnership>();
  stable let brands = Map.new<Principal, Brand>();
  stable let admins = Map.new<Principal, Text>();


  ignore Map.put<Principal, Text>(admins, phash, Deployer, "deployer");

  ////// Ledgers reference | internal accounts /////////

  let Icp_Ledger_Reference = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai") : actor {
    icrc1_transfer : shared ICP_Ledger.TransferArg -> async ICP_Ledger.Result;
    transfer : shared ICP_Ledger.TransferArgs -> async ICP_Ledger.Result_6;
    icrc1_balance_of : query ICP_Ledger.Account -> async Nat;
    account_identifier : shared query ICP_Ledger.Account -> async Blob;
    icrc1_fee : query () -> async Nat;
    query_blocks : shared query (ICP_Ledger.GetBlocksArgs) -> async (ICP_Ledger.QueryBlocksResponse);
  };

  let St_Icp_Ledger_Reference = actor ("qfr6e-biaaa-aaaak-qafuq-cai") : ST_ICP_Ledger.Self;

  type RevenueAccount = {
    #Creator;
    #Brand;
    #Partnership;
    #Whitdrawal;
  };

  func getRevenueAccount(a : RevenueAccount) : ICP_Ledger.Account {
    let owner = Principal.fromActor(this);
    switch a {
      case (#Creator)     {{owner; subaccount = ?"creators000000000000000000000000"}};
      case (#Brand)       {{owner; subaccount = ?"brands00000000000000000000000000"}};
      case (#Partnership) {{owner; subaccount = ?"partnerships00000000000000000000"}};
      case (#Whitdrawal)  {{owner; subaccount = ?"withdrawals000000000000000000000"}};
    };
  };

  ////////////// Platform Fees ///////////////////////////////////////
  var creatorFee : Nat64 = 1_000_000_000; // valor en e8s de ICP aproximadamente 50 ICP
  var brandFee : Nat64 = 2_000_000_000; // valor en e8s de ICP aproximadamente 100 ICP

  ////////////// Meta Pool Stacking //////////////////////////////////

  func buildMemo() : Nat64 {
    0;
  };

  let metaPoolDepositsCanister = actor ("hnwvc-lyaaa-aaaal-aaf6q-cai") : Meta_pool.Self;

  var permileStaking = 5000; 

  func depositAddress() : async Text {
    // Unica address de deposito
    await metaPoolDepositsCanister.getDepositAddress(null);
  };

  func transferToMyStakingAddress(amount: Nat, fee: Nat64, _from: RevenueAccount): async ICP_Ledger.Result_6 {
    let stakingAddress = await depositAddress();
    let from = getRevenueAccount(_from);
    // let fee = await Icp_Ledger_Reference.icrc1_fee();
    // let available = await Icp_Ledger_Reference.icrc1_balance_of(from);
    // if (available < fee + amount) {
    //   return #Err(#InsufficientFunds( { balance = {e8s = Nat64.fromNat(available - fee: Nat)}}))
    // };
    let transferArgs: ICP_Ledger.TransferArgs = {
      to = switch (Hex.decode(stakingAddress)) {
          case (#err(_)) {throw Error.reject("Invalid address")};
          case (#ok(bs)) Blob.fromArray(bs);
      };
      fee = {e8s = fee};
      memo = buildMemo();
      from_subaccount = from.subaccount;
      created_at_time = null;
      amount = {e8s = Nat64.fromNat(amount)};
    };
    await Icp_Ledger_Reference.transfer(transferArgs);
  };

  func stackingMetaPoolPushNotification(): async Meta_pool.DepositReceipt {
    await metaPoolDepositsCanister.depositIcp();
  };

  public shared ({ caller }) func stackAllToMetaPool(_from: RevenueAccount): async Meta_pool.DepositReceipt {
    assert(isAdmin(caller));
    let from = getRevenueAccount(_from);
    let available = await Icp_Ledger_Reference.icrc1_balance_of(from);
    let fee = await Icp_Ledger_Reference.icrc1_fee();
    let transferResult = await transferToMyStakingAddress(available - fee, Nat64.fromNat(fee), _from);
    switch (transferResult) {
      case (#Ok(_)) {
        await stackingMetaPoolPushNotification();
      };
      case (#Err(_)) {
        #Err(#TransferFailure)
      }
    }
  };

 ///////////////////////// Meta Pool unstacking //////////////////////

  type Withdrawal = {
    id : Text;
    user : Principal;
    createdAt : Int;
    expectedAt : Int;
    readyAt : ?Int;
    disbursedAt : ?Int;
    total : Nat64;
    pending : Nat64;
    available : Nat64;
    disbursed : Nat64;
  };

  func createWithdrawal(_amount: ?Nat): async Meta_pool.Result_1{
    let account = {owner = Principal.fromActor(this); subaccount = null};
    let available = await St_Icp_Ledger_Reference.icrc1_balance_of(account);
    let fee = await St_Icp_Ledger_Reference.icrc1_fee();
    let amount = switch (_amount) {
      case null {available - fee: Nat};
      case ( ?a ) {if(a >= available) {available - fee: Nat} else {a}};
    };
    await metaPoolDepositsCanister.createWithdrawal(account, Nat64.fromNat(amount));
  };

  func completeWhitdrawal(data: Withdrawal): async Meta_pool.PayoutResult{
    let _to = await Icp_Ledger_Reference.account_identifier(getRevenueAccount(#Whitdrawal));
    let to = Hex.encode(Blob.toArray(_to));
    await metaPoolDepositsCanister.completeWithdrawal(data.user, data.available, to);
  };

  public shared ({ caller }) func withdrawalFromStaking(amount: ?Nat): async Meta_pool.PayoutResult {
    assert(isAdmin(caller));
    let withdrawal = await createWithdrawal(amount);
    switch (withdrawal) {
      case (#ok(w)) {
        await completeWhitdrawal(w);
      };
      case (#err(e)){
        #err(e)
      }
    }    
  };
 
 ///////////////////////// ADMIN FUNCTIONS //////////////////////////

  public shared ({ caller }) func withdrawal(to: ICP_Ledger.Account, _from: RevenueAccount): async ICP_Ledger.Result{
    assert(isAdmin(caller));
    let from = getRevenueAccount(_from);
    let available = await Icp_Ledger_Reference.icrc1_balance_of(from);
    let fee = await Icp_Ledger_Reference.icrc1_fee();
    if (available > fee) {
      let transferArgs: ICP_Ledger.TransferArg = {
        to;
        fee = null;
        memo = null;
        from_subaccount = from.subaccount;
        created_at_time = ? Nat64.fromNat(Int.abs(now()));
        amount = available - fee: Nat;    
      };
      await Icp_Ledger_Reference.icrc1_transfer(transferArgs) 
    } else {
      #Err(#InsufficientFunds( { balance = available }))
    }
  };

  public shared ({ caller }) func getFees() : async {
    #Ok : { brandFee : Nat64; creatorFee : Nat64 };
    #Err : Text;
  } {
    if (not isAdmin(caller)) { return #Err("Caller is not an admin") };
    #Ok({ creatorFee; brandFee });
  };

  public shared ({ caller }) func setFees({
    newBrandFee : ?Nat64;
    newCreatorFee : ?Nat64;
  }) : async { #Ok; #Err : Text } {
    if (not isAdmin(caller)) { return #Err("Caller is not an admin") };
    creatorFee := switch newCreatorFee {
      case null creatorFee;
      case (?fee) { fee };
    };
    brandFee := switch newBrandFee {
      case null brandFee;
      case (?fee) { fee };
    };
    return #Ok;
  };

  public shared ({ caller }) func getPermileStaking(): async Nat{
    permileStaking
  };

  public shared ({ caller }) func setPermileStaking(permile: Nat): async {#Ok}{
    assert (isAdmin(caller));
    permileStaking := permile;
    #Ok
  };

  ///////////////////////////    Private functions  /////////////////////

  func isAdmin(p: Principal): Bool {
    Map.has<Principal, Text>(admins, phash, p)
  };


  public shared ({ caller }) func addAdmin(p: Principal, name: Text): async (){
    assert(isAdmin(caller));
    ignore Map.put<Principal, Text>(admins, phash, p, name);
  };

  func checkPaidMembership(p : Principal, kindUser : Text) : Bool {
    let lastPaymentDate : Int = switch kindUser {
      case "Creator" {
        let user = Map.get<Principal, User>(users, phash, p);
        switch user {
          case null { 0 };
          case (?user) {
            user.lastPaymentDate;
          };
        };
      };
      case "Brand" {
        let user = Map.get<Principal, Brand>(brands, phash, p);
        switch user {
          case null { 0 };
          case (?user) {
            user.lastPaymentDate;
          };
        };
      };
      case _ { 0 };
    };
    return now() < lastPaymentDate * 30 * 24 * 60 * 60 * 1000000000;
  };

  /////////////////////////////////////////////////////////////////////

  let publications = Map.new<Nat, Publication>();

  stable var lastPubId = 0;
  
  public shared ({ caller }) func signUp({name: Text; lastName: Text; email: Text}): async {#Ok; #Err: Text}{
    switch (Map.get<Principal, User>(users, phash, caller)) {
      case (?user) {#Err("The caller is already linked to the user " # user.name)};
      case ( null ) {
        let newUser: User = {Types.userDefaultValues with
          principalId = caller;
          name;
          email;
          lastName;
          lastPaymentDate = 0;
          lastMemoPayment = null;

        };
        ignore Map.put<Principal, User>(users, phash, caller, newUser);
        #Ok;
      };
    };
  };

  public shared query ({ caller }) func signIn() : async Types.LoginResult {
    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user") };
      case (?user) {
        let creator = Map.get<Principal, Creator>(creators, phash, caller);
        let brand = Map.get<Principal, Brand>(brands, phash, caller);
        let partnership = Map.get<Principal, Types.Partnership>(partnerships, phash, caller);
        switch creator {
          case (?creator) {
            return #Ok(#creator(creator));
          };
          case null {
            switch brand {
              case (?brand) { return #Ok(#brand(brand)) };
              case null {
                switch partnership {
                  case (?partnership) { return #Ok(#partnership(partnership)) };
                  case null { return #Ok(#user(user)) };
                };
              };
            };
          };
        };
      };
    };
  };

  public shared ({ caller }) func requestRegisterAsCreator({init: Types.CreatorInitArgs}): async {#Ok: ICP_Ledger.TransferArgs; #Err: Text}{
    if (Map.has<Principal, Brand>(brands, phash, caller)) {
      return #Err("The caller is already as a brand");
    };

    if (Map.has<Principal, Partnership>(partnerships, phash, caller)) {
      return #Err("The caller is already as a partnership");
    };

    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user") };
      case (?user) {
        if (init.portfolio.size() == 0) {
          return #Err("Portfolio is empty");
        };
        if (init.guvernamentalID.size() == 0) {
          return #Err("GuvernamentalID is empty");
        };
        ignore Map.put<Principal, Creator>(
          creators,
          phash,
          caller,
          {
            user with
            verified = false;
            registrationFeePaid = false;
            guvernamentalID = init.guvernamentalID;
            webSite = init.webSite;
            portfolio = init.portfolio;
            publications : [Publication] = [];
            events : [Types.Event] = [];
          },
        );
        let creatorsAccount = getRevenueAccount(#Creator);
        let memo = Nat64.fromNat(Int.abs(now()));
        let transferArgs : ICP_Ledger.TransferArgs = {
          to = Principal.toLedgerAccount(creatorsAccount.owner, creatorsAccount.subaccount);
          fee = { e8s = 10000 };
          memo;
          from_subaccount = null;
          created_at_time = null;
          amount = { e8s = creatorFee };
        };
        #Ok(transferArgs);
      };
    };
  };

  func verifyTransaction(from: RevenueAccount, args : ICP_Ledger.TransferArg, blocks : [ICP_Ledger.CandidBlock]) : Bool {
    for ({ transaction } in blocks.vals()) {
      let memo = transaction.icrc1_memo;
      switch (transaction.operation) {
        case (?#Transfer(t)) {
          let toVerified = t.to == Principal.toLedgerAccount(args.to.owner, args.to.subaccount);
          let amountVerified = t.amount == { e8s = Nat64.fromNat(args.amount) };
          let memoVerified = memo == args.memo;
          if (toVerified and amountVerified and memoVerified) {
            return true;
          };
        };
        case _ {};
      };
    };
    false;
  };

  func stakingToMetaPool(_from: RevenueAccount, amount: Nat): async  {#Err : Meta_pool.DepositErr; #Ok : Nat} {
    let fee = await Icp_Ledger_Reference.icrc1_fee();
    let transferResult = await transferToMyStakingAddress(amount - fee, Nat64.fromNat(fee), _from);
    switch (transferResult) {
      case (#Ok(_)) {
        await stackingMetaPoolPushNotification();
      };
      case (#Err(_)) {
        #Err(#TransferFailure)
      }
    }
  };

  public shared ({ caller }) func notifyPayment(kindSubscription: RevenueAccount ,index : Nat64, args : ICP_Ledger.TransferArg) : async {
    #Ok: Nat;
    #Err : Meta_pool.DepositErr or {#IndaError: Text};
  } {
    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { #Err(#TransferFailure) };
      case (?user) {
        let { blocks } = await Icp_Ledger_Reference.query_blocks({ start = index; length = index});
        if (not verifyTransaction(kindSubscription, args, blocks )) {
          return #Err(#IndaError("Error verifying transaction"));
        };
        let forStaking = args.amount - (permileStaking * args.amount) / 1000;
        await stakingToMetaPool(kindSubscription, forStaking );
      };
    };
  };

  public shared ({ caller }) func requestRegisterAsBrand(init: Types.BrandInitArgs): async {#Ok; #Err: Text}{
    if (Map.has<Principal, Creator>(creators, phash, caller)) {
      return #Err("The caller is already as a creator");
    };

    if (Map.has<Principal, Partnership>(partnerships, phash, caller)) {
      return #Err("The caller is already as a partnership");
    };

    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user") };
      case (?user) {

        if (init.guvernamentalID.size() == 0) {
          return #Err("GuvernamentalID is empty");
        };
        ignore Map.put<Principal, Brand>(
          brands,
          phash,
          caller,
          {
            user with
            verified = false;
            status = init.status;
            brandName : Text = init.brandName;
            industry = init.industry;
            availableCountries = init.availableCountries;
            webSite = init.webSite;
            socialMedia = init.socialMedia;
            events = [];
          },
        );
        #Ok;
      };
    }

  };

  public shared ({ caller }) func requestRegisterAsPartnership(init: Types.PartnershipInitArgs): async {#Ok; #Err: Text} {
    if (Map.has<Principal, Creator>(creators, phash, caller)) {
      return #Err("The caller is already as a creator");
    };
    if (Map.has<Principal, Brand>(brands, phash, caller)) {
      return #Err("The caller is already as a brand");
    };
    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user") };
      case (?user) {
        if (init.guvernamentalID.size() == 0) {
          return #Err("GuvernamentalID is empty");
        };
        ignore Map.put<Principal, Partnership>(
          partnerships,
          phash,
          caller,
          {
            user with
            verified = false;
            events = [];
            status = init.status;
            industry = init.industry;
            availableCountries = init.availableCountries;
            webSite = init.webSite;
            socialMedia = init.socialMedia;
          },
        );
        return #Ok;
      };
    };
  };

  public shared ({ caller }) func verifyCreator(user: Principal): async {#Ok; #Err: Text}{
    if (not Map.has<Principal, Text>(admins, phash, caller)) {
      return #Err("Caller is not a admin");
    };
    if (not Map.has<Principal, Creator>(creators, phash, caller)) {
      return #Err("User is not a creator");
    };
    let creator = Map.get<Principal, Creator>(creators, phash, user);
    switch creator {
      case null { return #Err("Caller is not a creator") };
      case (?creator) {
        ignore Map.put<Principal, Creator>(
          creators,
          phash,
          user,
          { creator with verified = true },
        );
        #Ok;
      };
    };
  };

  public shared ({ caller }) func verifyBrand(user: Principal): async {#Ok; #Err: Text} {
    if (not Map.has<Principal, Text>(admins, phash, caller)) {
      return #Err("Caller is not a admin");
    };

    let brand = Map.get<Principal, Brand>(brands, phash, user);
    switch brand {
      case null { return #Err("Caller is not a brand") };
      case (?brand) {
        ignore Map.put<Principal, Brand>(
          brands,
          phash,
          user,
          { brand with verified = true },
        );
      };
    };
    #Ok;
  };

  public shared ({ caller }) func verifyPartnership(user: Principal): async {#Ok; #Err: Text} {
    if (not Map.has<Principal, Text>(admins, phash, caller)) {
      return #Err("Caller is not a admin");
    };
    let partnership = Map.get<Principal, Partnership>(partnerships, phash, user);
    switch partnership {
      case null { return #Err("Caller is not a brand") };
      case (?partnership) {
        ignore Map.put<Principal, Partnership>(
          partnerships,
          phash,
          user,
          { partnership with verified = true },
        );
      };
    };
    #Ok;
  };

  // public shared ({ caller }) func editUser(data: Types.EditableData): async (){
  //   //TODO
  // };

  public shared ({ caller }) func publish({access: Types.AccessPost; title: Text; content: Types.Content}): async {#Ok: Nat; #Err: Text}{
    let creator = Map.get<Principal, Creator>(creators, phash, caller);
    switch creator {
      case null { return #Err("Caller is not a creator") };
      case (?creator) {
        let pub = {
          date = now();
          author = { principal = caller; name = creator.name };
          title;
          content;
          access;
        };

        lastPubId += 1;
        ignore Map.put<Nat, Publication>(publications, nhash, lastPubId, pub);

        #Ok(lastPubId);
      };
    };
  };

  func hasPermission(user: Principal): Bool {
    Map.has<Principal, Creator>(creators, phash, user) or
    Map.has<Principal, Brand>(brands, phash, user) or
    Map.has<Principal, Partnership>(partnerships, phash, user)
  };

  public shared ({ caller }) func readPublication(id:Nat): async {#Ok: Publication; #Err: Text} {
    let pub = Map.get<Nat, Publication>(publications, nhash, id);
    switch pub {
      case null { return #Err("Publication not found") };
      case (?pub) {
        switch (pub.access) {
          case (#Public) { #Ok(pub) };
          case (#MembersOnly) {
            if (hasPermission(caller)) {
              #Ok(pub);
            } else {
              return #Err("You don't have permission to read this publication");
            }

          };
        };
      };
    }

  };

};
