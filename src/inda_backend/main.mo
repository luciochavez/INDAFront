import Map "mo:map/Map";
import { phash } "mo:map/Map";
import Types "types"

actor {

  type User = Types.User;
  type Creator = Types.UserCreator;
  type Brand = Types.UserBrand;


  stable let users = Map.new<Principal, User>();
  stable let creators = Map.new<Principal, Creator>();
  stable let brands = Map.new<Principal, Creator>();
  
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

  public shared ({ caller }) func signIn(): async {#Ok: User; #Err: Text} {
    switch( Map.get<Principal, User>(users, phash, caller)) {
      case null{ #Err("Is not User")};
      case ( ?user ) {#Ok(user)}
    }
  };

  public shared ({ caller }) func registerAsCreator(): async (){
    //TODO
  };

  public shared ({ caller }) func registerAsBrand(): async (){
    //TODO
  };

  public shared ({ caller }) func editUser(data: Types.EditableData): async (){
    //TODO
  };


};
