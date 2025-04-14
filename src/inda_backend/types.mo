module {

    public type EditableData = {
        phone: ?Nat;
        email: Text;
        paypalme: ?Text;
        wallet: ?Principal;
    };

    public type GuvernamentalID = {
        #ine: Nat; #passport: Text; #rfc: Nat; #other: {k:Text; v: Text}
    };

    public type User = EditableData and {
        principalId: Principal;
        name: Text;
        lastName: Text;
        kyc: Bool;
        country: ?Text;
        guvernamentalID: [GuvernamentalID];
        // agregar campos comunes a todos lo tipos de usuario
    };

    public let userDefaultValues = {
        name= "";
        lastName = "";
        email = "";
        phone = null;
        kyc =  false;
        country = null;
        wallet = null;
        paypalme = null;
        guvernamentalID: [GuvernamentalID] = [];
    };

    public type LoginResult = {
        #Ok: {
            #user: User;
            #creator: UserCreator;
            #brand: UserBrand;
            #partnership: Partnership;
        };
        #Err: Text
    };

    public type Event = {
        date: Int;
        location: Text;
        ticketPrice: Nat;
        description: Text;
        sponsors: [{#partnership: Partnership; #brand: UserBrand}];
        kind: {#workshop; #conference; #meeting; #webinar; #mg; #other: Text};
        assistance: {#virtual; #inPerson}
    };

    public type CreatorInitArgs = {
        guvernamentalID: [GuvernamentalID];
        webSite: Text;
        portfolio: [Text];
    };

    public type BrandInitArgs = {
        guvernamentalID: [GuvernamentalID];
        status: LegalStatusBrand;
        brandName: Text;
        industry: Industry;
        availableCountries: [Text];
        webSite: Text;
        socialMedia: [Text];
    };

    public type PartnershipInitArgs = {
        partnershipName: Text;
        kind: {#guvernamental: Text; #ambassy: Text; #academic: Text; #other: Text};
        guvernamentalID: [GuvernamentalID];
        status: {#registered; #unregistered};
        socialMedia: [Text];
        industry: Industry;
        webSite: Text;
        availableCountries: [Text];
    };

    public type UserCreator = User and CreatorInitArgs and{
        verified: Bool;
        publications: [Publication];     
        events: [Event];
        // Agregar campos relacionados al usuario en calidad de creador de contenido
    };

    public type LegalStatusBrand = {
        #Registered;
        #Unregistered;
        #Pending;
        #Other: Text;
    };
    public type UserBrand = User and {
        verified: Bool;
        status: LegalStatusBrand;
        brandName: Text;
        industry: Industry;
        availableCountries: [Text];
        webSite: Text;
        socialMedia: [Text];
        events: [Event];
    };

    public type Partnership = User and {
        verified: Bool;
        status: {#registered; #unregistered};
        socialMedia: [Text];
        events: [Event];
        industry: Industry;
        webSite: Text;
        availableCountries: [Text];
    };

    public type Content = {
        #Html: Text;
        #MD: Text;
        #Photo: {photo: Blob; despription: Text};
        #Multimedia: {file: Blob; description: Text}
    };

    public type Publication = {
        date: Int;
        author: {principal: Principal; name: Text};
        title: Text;
        content: Content;
        access: AccessPost;
    };

    public type AccessPost = {
        #Public;
        #MembersOnly;
    };

    public type Industry = {
        #fashion;
        #sustainable;
        #inclusion;
        #innovation;
        #other: Text
        // Agregar mas variantes de rubros
    }
}