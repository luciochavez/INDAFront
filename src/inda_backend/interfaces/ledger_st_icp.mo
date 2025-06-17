// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type Account = { owner : Principal; subaccount : ?Subaccount };
  public type Allowance = { allowance : Nat; expires_at : ?Nat64 };
  public type ICRC1MetadataValue = {
    #Int : Int;
    #Nat : Nat;
    #Blob : Blob;
    #Text : Text;
  };
  public type ICRC1Standard = { url : Text; name : Text };
  public type ICRC1TransferArgs = {
    to : Account;
    fee : ?Nat;
    memo : ?Blob;
    from_subaccount : ?Subaccount;
    created_at_time : ?Nat64;
    amount : Nat;
  };
  public type ICRC1TransferError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type ICRC1TransferResult = {
    #Ok : TxIndex;
    #Err : ICRC1TransferError;
  };
  public type ICRC2AllowanceArgs = { account : Account; spender : Principal };
  public type ICRC2ApproveArgs = {
    fee : ?Nat;
    memo : ?Blob;
    from_subaccount : ?Blob;
    created_at_time : ?Nat64;
    amount : Int;
    expires_at : ?Nat64;
    spender : Principal;
  };
  public type ICRC2ApproveError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #Expired : { ledger_time : Nat64 };
    #InsufficientFunds : { balance : Nat };
  };
  public type ICRC2ApproveResult = { #Ok : Nat; #Err : ICRC2ApproveError };
  public type ICRC2TransferFromArgs = {
    to : Account;
    fee : ?Nat;
    from : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
  };
  public type ICRC2TransferFromError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #InsufficientAllowance : { allowance : Nat };
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type ICRC2TransferFromResult = {
    #Ok : Nat;
    #Err : ICRC2TransferFromError;
  };
  public type Metadata = {
    fee : Nat;
    decimals : Nat8;
    owner : Principal;
    logo : Text;
    name : Text;
    totalSupply : Nat;
    symbol : Text;
  };
  public type Subaccount = Blob;
  public type Time = Int;
  public type TokenInfo = {
    holderNumber : Nat;
    deployTime : Time;
    metadata : Metadata;
    historySize : Nat;
    cycles : Nat;
    feeTo : Principal;
  };
  public type TxIndex = Nat;
  public type TxReceipt = {
    #Ok : Nat;
    #Err : {
      #InsufficientAllowance;
      #InsufficientBalance;
      #ErrorOperationStyle;
      #Unauthorized;
      #LedgerTrap;
      #ErrorTo;
      #Other : Text;
      #BlockUsed;
      #AmountTooSmall;
    };
  };
  public type Self = actor {
    allowance : shared query (Principal, Principal) -> async Nat;
    approve : shared (Principal, Nat) -> async TxReceipt;
    balanceOf : shared query Principal -> async Nat;
    burn : shared Nat -> async TxReceipt;
    burnFor : shared (Principal, Nat) -> async TxReceipt;
    burnForAccount : shared (Account, Nat) -> async TxReceipt;
    decimals : shared query () -> async Nat8;
    getAllowanceSize : shared query () -> async Nat;
    getHolderAccounts : shared query (Nat, Nat) -> async [(Account, Nat)];
    getHolders : shared query (Nat, Nat) -> async [(Principal, Nat)];
    getMetadata : shared query () -> async Metadata;
    getTokenFee : shared query () -> async Nat;
    getTokenInfo : shared query () -> async TokenInfo;
    getUserApprovals : shared query Principal -> async [(Principal, Allowance)];
    historySize : shared query () -> async Nat;
    icrc1_balance_of : shared query Account -> async Nat;
    icrc1_decimals : shared query () -> async Nat8;
    icrc1_fee : shared query () -> async Nat;
    icrc1_metadata : shared query () -> async [(Text, ICRC1MetadataValue)];
    icrc1_minting_account : shared query () -> async ?Account;
    icrc1_name : shared query () -> async Text;
    icrc1_supported_standards : shared query () -> async [ICRC1Standard];
    icrc1_symbol : shared query () -> async Text;
    icrc1_total_supply : shared query () -> async Nat;
    icrc1_transfer : shared ICRC1TransferArgs -> async ICRC1TransferResult;
    icrc2_allowance : shared query ICRC2AllowanceArgs -> async Allowance;
    icrc2_approve : shared ICRC2ApproveArgs -> async ICRC2ApproveResult;
    icrc2_transfer_from : shared ICRC2TransferFromArgs -> async ICRC2TransferFromResult;
    logo : shared query () -> async Text;
    mint : shared (Principal, Nat) -> async TxReceipt;
    mintAll : shared [(Principal, Nat)] -> async TxReceipt;
    mintAllAccounts : shared [(Account, Nat)] -> async ICRC1TransferResult;
    name : shared query () -> async Text;
    setFee : shared Nat -> ();
    setFeeTo : shared Principal -> ();
    setLogo : shared Text -> ();
    setMintingAccount : shared ?Account -> async ();
    setName : shared Text -> ();
    setOwner : shared Principal -> ();
    symbol : shared query () -> async Text;
    totalSupply : shared query () -> async Nat;
    transfer : shared (Principal, Nat) -> async TxReceipt;
    transferFrom : shared (Principal, Principal, Nat) -> async TxReceipt;
  }
}