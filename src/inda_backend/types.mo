module {

    public type EditableData = {
        phone: ?Nat;
        email: Text;
        wallet: ?Principal
    };

    public type User = EditableData and {
        principalId: Principal;
        name: Text;
        lastName: Text;
        kyc: Bool;
        country: ?Text;
        // agregar campos comunes a todos lo tipos de usuario
    };

    public let userDefaultValues = {
        name= "";
        lastName = "";
        email = "";
        phone = null;
        kyc =  false;
        country = null;
        wallet = null 
    };


    public type UserCreator = User and {
        publications: Publication;
        webSite: Text;
        // Agregar campos relacionados al usuario en calidad de creador de contenido
    };

    public type UserBrand = User and {
        brandName: Text;
        industry: Industry;
        availableCountries: [Text];
        webSite: Text;
        socialMedia: [Text]
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
    };

    public type Industry = {
        #fashion;
        #dress;
        #sportswear;
        // Agregar mas variantes de rubros
        #other: Text
    }
}