class User {
    constructor(id, firstName, lastName, birthdate, username, description, status, role, auth0Id) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.username = username;
        this.description = description;
        this.status = status;
        this.role = role;
        this.auth0Id = auth0Id;
    }

    changeFirstName(newFirstName) {
        this.firstName = newFirstName;
    }

    changeLastName(newLastName) {
        this.lastName = newLastName;
    }

    changeBirthdate(newBirthdate) {
        this.birthdate = newBirthdate;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }
}

module.exports = User;