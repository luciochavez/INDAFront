import Map "mo:map/Map";
import { phash; nhash } "mo:map/Map";
import Types "types";
import {now} "mo:base/Time";

shared ({ caller = Deployer }) actor class ( ) = {

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


  public shared ({ caller }) func addAdmin(p: Principal, name: Text): async (){
    assert (Map.has<Principal, Text>(admins, phash, caller));
    ignore Map.put<Principal, Text>(admins, phash, p, name);
  };

  stable let publications = Map.new<Nat, Publication>();

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
          
        };
        ignore Map.put<Principal, User>(users, phash, caller, newUser);
        #Ok
      }
    }
  };

  public shared query ({ caller }) func signIn(): async Types.LoginResult {
    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user")};
      case ( ?user ) {
        let creator = Map.get<Principal, Creator>(creators, phash, caller);
        let brand = Map.get<Principal, Brand>(brands, phash, caller);
        let partnership = Map.get<Principal, Types.Partnership>(partnerships, phash, caller);
        switch creator {
          case ( ?creator ) {
            return #Ok(#creator(creator))
          };
          case null {
            switch brand {
              case ( ?brand ) { return #Ok(#brand(brand))};
              case null {
                switch partnership {
                  case ( ?partnership ) { return #Ok(#partnership(partnership))};
                  case null { return #Ok(#user(user))};
                }
              };
            }
          };
        }
      }
    }

  };

  public shared ({ caller }) func registerAsCreator({init: Types.CreatorInitArgs}): async {#Ok; #Err: Text}{
    if (Map.has<Principal, Brand>(brands, phash, caller)) {
      return #Err("The caller is already as a brand");
    };

    if (Map.has<Principal, Partnership>(partnerships, phash, caller)) {
      return #Err("The caller is already as a partnership");
    };

    let user = Map.get<Principal, User>(users, phash, caller);
    switch user{
      case null { return #Err("Caller is not a user")};
      case ( ?user ) { 
        if( init.portfolio.size() == 0) { 
          return #Err("Portfolio is empty")
          };
        if( init.guvernamentalID.size() == 0) { 
          return #Err("GuvernamentalID is empty")
          };
        ignore Map.put<Principal, Creator>(
          creators, 
          phash, 
          caller, 
          {user with
            verified = false;
            guvernamentalID = init.guvernamentalID;
            webSite = init.webSite;
            portfolio = init.portfolio;
            publications: [Publication] = [];     
            events: [Types.Event] = [];
          });
        #Ok
      }
    }
  };

  public shared ({ caller }) func registerAsBrand(init: Types.BrandInitArgs): async {#Ok; #Err: Text}{
    if (Map.has<Principal, Creator>(creators, phash, caller)) {
      return #Err("The caller is already as a creator");
    };

    if (Map.has<Principal, Partnership>(partnerships, phash, caller)) {
      return #Err("The caller is already as a partnership");
    };

    let user = Map.get<Principal, User>(users, phash, caller);
    switch user{
      case null { return #Err("Caller is not a user")};
      case ( ?user ) { 
        
        if( init.guvernamentalID.size() == 0) { 
          return #Err("GuvernamentalID is empty")
        };
        ignore Map.put<Principal, Brand>(
          brands, 
          phash, 
          caller, 
          {user with
            verified = false;
            status = init.status;
            brandName: Text = init.brandName;
            industry = init.industry;
            availableCountries = init.availableCountries;
            webSite = init.webSite;
            socialMedia = init.socialMedia;
            events = [];
          });
        #Ok
      }
    }

  };

  public shared ({ caller }) func registerAsPartnership(init: Types.PartnershipInitArgs): async {#Ok; #Err: Text} {
    if (Map.has<Principal, Creator>(creators, phash, caller)) {
      return #Err("The caller is already as a creator");
    };
    if (Map.has<Principal, Brand>(brands, phash, caller)) {
      return #Err("The caller is already as a brand");
    };
    let user = Map.get<Principal, User>(users, phash, caller);
    switch user {
      case null { return #Err("Caller is not a user")};
      case (?user) {
        if (init.guvernamentalID.size() == 0) {
          return #Err("GuvernamentalID is empty")
        };
        ignore Map.put<Principal, Partnership>(
          partnerships, 
          phash, 
          caller, 
          {user with
            verified = false;
            events = [];
            status = init.status;
            industry = init.industry;
            availableCountries = init.availableCountries;
            webSite = init.webSite;
            socialMedia = init.socialMedia;
          }
        );
        return #Ok
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
      case null { return #Err("Caller is not a creator")};
      case ( ?creator ) {
        ignore Map.put<Principal, Creator>(
          creators, 
          phash, 
          user, 
          {creator with verified = true});
        #Ok
      }
    }
  };

  public shared ({ caller }) func verifyBrand(user: Principal): async {#Ok; #Err: Text} {
    if (not Map.has<Principal, Text>(admins, phash, caller)) {
      return #Err("Caller is not a admin");
    };
    
    let brand = Map.get<Principal, Brand>(brands, phash, user);
    switch brand {
      case null { return #Err("Caller is not a brand")};
      case ( ?brand ) {
        ignore Map.put<Principal, Brand>(
          brands, 
          phash, 
          user, 
          {brand with verified = true}
        );
      }
    };
    #Ok
  };

  public shared ({ caller }) func verifyPartnership(user: Principal): async {#Ok; #Err: Text} {
    if (not Map.has<Principal, Text>(admins, phash, caller)) {
      return #Err("Caller is not a admin");
    };
    let partnership = Map.get<Principal, Partnership>(partnerships, phash, user);
    switch partnership {
      case null { return #Err("Caller is not a brand")};
      case ( ?partnership ) {
        ignore Map.put<Principal, Partnership>(
          partnerships, 
          phash, 
          user, 
          {partnership with verified = true}
        );
      }
    };
    #Ok
  };

  public shared ({ caller }) func editUser(data: Types.EditableData): async (){
    //TODO
  };

  public shared ({ caller }) func publish({access: Types.AccessPost; title: Text; content: Types.Content}): async {#Ok: Nat; #Err: Text}{
    let creator = Map.get<Principal, Creator>(creators, phash, caller);
    switch creator {
      case null { return #Err("Caller is not a creator")};
      case ( ?creator ) {
        let pub = {
          date = now();
          author = {principal = caller; name = creator.name};
          title;
          content;
          access;
        };

        lastPubId += 1;
        ignore Map.put<Nat, Publication>(publications, nhash, lastPubId, pub);
        
        #Ok(lastPubId)
      }
    }
  };

  func hasPermission(user: Principal): Bool {
    Map.has<Principal, Creator>(creators, phash, user) or
    Map.has<Principal, Brand>(brands, phash, user) or
    Map.has<Principal, Partnership>(partnerships, phash, user)
  };

  public shared ({ caller }) func readPublication(id:Nat): async {#Ok: Publication; #Err: Text} {
    let pub = Map.get<Nat, Publication>(publications, nhash, id);
    switch pub {
      case null { return #Err("Publication not found")};
      case (?pub) {
        switch (pub.access){
          case (#Public){ #Ok(pub)};
          case (#MembersOnly) {
            if(hasPermission(caller)){
              #Ok(pub)
            } else {
              return #Err("You don't have permission to read this publication")
            }
            
          }
        }
      }
    }

  };
   
   

};
