class User {
    constructor(id, firstName, lastName, birthdate, username, description, status, role, auth0Id, createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.username = username;
        this.description = description;
        this.status = status;
        this.role = role;
        this.auth0Id = auth0Id;
        this.createdAt = createdAt;
    }

    toJson() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthdate,
            username: this.username,
            description: this.description,
        };
    }

    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, firstName, lastName, birthdate, username, description, status, role, auth0Id, createdAt } = json;
        return new User(id, firstName, lastName, birthdate, username, description, status, role, auth0Id, createdAt);
    }


    // pour transformer l'objet en JSON pour un patch, prenant en paramètre les données modifiées
    static toJsonPatch(modifiedData) {
        const patch = {};
        // Vérifiez chaque propriété modifiée et ajoutez-la au patch
        if (modifiedData.hasOwnProperty('firstName')) {
            patch.firstName = modifiedData.firstName;
        }
        if (modifiedData.hasOwnProperty('lastName')) {
            patch.lastName = modifiedData.lastName;
        }
        if (modifiedData.hasOwnProperty('birthdate')) {
            patch.birthdate = modifiedData.birthdate;
        }
        if (modifiedData.hasOwnProperty('username')) {
            patch.username = modifiedData.username;
        }
        if (modifiedData.hasOwnProperty('description')) {
            patch.description = modifiedData.description;
        }
        return patch;
    }
}

export { User };
