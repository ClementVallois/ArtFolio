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

    toJson() {
        if (!firstName || !lastName || !birthDate || !username || !status || !role) {
            throw new Error('Les champs obligatoires doivent être spécifiés :  firstName, lastName, username, birthDate, username, status, role');
        }
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthDate,
            username: this.username,
            description: this.description,
            status: this.status,
            role: this.role,
        };
    }



    // Méthode pour valider le prénom et le nom avec des Regex
    validateName(name, fieldName) {
        const nameRegex = /^[a-zA-Z-]+$/;
        if (!nameRegex.test(name)) {
            throw new Error(`Le champ ${fieldName} ne doit contenir que des lettres et des tirets.`);
        }
    }

    // Méthode pour valider le nom d'utilisateur avec un Regex
    validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9._-]+$/;
        if (!usernameRegex.test(username)) {
            throw new Error('Le nom d\'utilisateur ne doit contenir que des lettres, des chiffres, des points, des tirets et des tirets bas.');
        }
    }

    // Méthode pour valider la date de naissance avec un Regex
    validateBirthDate(birthDate) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthDate)) {
            throw new Error('Le format de la date de naissance doit être YYYY-MM-DD.');
        }
    }

    // Méthode pour valider la date de naissance avec un Regex
    validateDescription(description) {
        const dateRegex = /^[a-zA-Z0-9._\-() "&,;:/!?]+$/;
        if (!dateRegex.test(description)) {
            throw new Error("Les carractères acceptés pour la descriptions sont de A-Z, 1-9, ainsi que ()\"&,;:/!? ");
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


