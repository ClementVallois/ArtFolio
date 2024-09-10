class User {
    constructor(id, firstName, lastName, birthDate, username, description, status, role, auth0Id, createdAt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.username = username;
        this.description = description;
        this.status = status;
        this.role = role;
        this.auth0Id = auth0Id;
        this.createdAt = createdAt;
    }

    // TODO: voir comment utiliser le ToJSon
    // toJson() {
    //     if (!firstName || !lastName || !birthDate || !username || !description || !status || !role || !auth0Id) {
    //         throw new Error('Les champs obligatoires doivent être spécifiés :  firstName, lastName, username, birthDate, username, status, role, auth0Id');
    //     }
    //     return {
    //         id: this.id,
    //         firstName: this.firstName,
    //         lastName: this.lastName,
    //         birthdate: this.birthDate,
    //         username: this.username,
    //         description: this.description,
    //         status: this.status,
    //         role: this.role,
    //         auth0Id: this.auth0Id
    //     };
    // }



    // Méthode pour valider le prénom et le nom avec des Regex
    validateName(name, fieldName) {
        const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿĀ-ſŒœÆæÇçÊêÎîÔôÛûÂâÄäËëÏïÖöÜüŸÿ]+$/;
        if (!nameRegex.test(name)) {
            throw new Error(`Model Le champ ${fieldName} ne doit contenir que des lettres et des tirets.`);
        }
    }

    // Méthode pour valider le nom d'utilisateur avec un Regex
    validateUsername(username) {
        const usernameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿĀ-ſŒœÆæÇçÊêÎîÔôÛûÂâÄäËëÏïÖöÜüŸÿ]+$/;
        if (!usernameRegex.test(username)) {
            throw new Error('Model Le nom d\'utilisateur ne doit contenir que des lettres, des chiffres, des points, des tirets et des tirets bas.');
        }
    }

    // Méthode pour valider la date de naissance avec un Regex
    validateBirthDate(birthDate) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthDate)) {
            throw new Error('Model Le format de la date de naissance doit être YYYY-MM-DD.');
        }
    }

    // Méthode pour valider la description avec un Regex
    validateDescription(description) {
        const descriptionRegex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u1F700-\u1F77F\u1F900-\u1F9FF\u1FA70-\u1FAFF]+$/u;
        if (!descriptionRegex.test(description)) {
            throw new Error("Model Les carractères acceptés pour la descriptions sont de A-Z, 1-9, ainsi que ()\"&,;:/!?éàèïùçêîôûâäëïöüÿœæ@ and some emojis");
        }
    }

    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, firstName, lastName, birthDate, username, description, status, role, auth0Id, createdAt } = json;
        return new User(id, firstName, lastName, birthDate, username, description, status, role, auth0Id, createdAt);
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
        if (modifiedData.hasOwnProperty('birthDate')) {
            patch.birthDate = modifiedData.birthDate;
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


