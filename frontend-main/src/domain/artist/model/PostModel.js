class Post {
    constructor(id, is_pinned, description, createdAt) {
        this.id = id;
        this.is_pinned = is_pinned;
        this.description = description;
        //  this.user_id = user_id;
        this.createdAt = createdAt;
    }

    toJson() {
        return {
            id: this.id,
            is_pinned: this.is_pinned,
            description: this.description,
            // userId: this.userId
        };
    }

    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, is_pinned, description, createdAt } = json;
        return new Post(id, is_pinned, description, createdAt);
    }


    // Méthode pour vérifier si la valeur isPinned est true ou false
    validateIsPinned(is_pinned) {
        if (is_pinned === true || is_pinned === false) {
            // La valeur isPinned est soit true soit false
            return is_pinned;
        } else {
            // La valeur isPinned n'est ni true ni false
            throw new Error("La valeur de 'isPinned' doit être true ou false.");
        }
    }


    // Méthode pour valider la description avec un Regex
    validateDescription(description) {
        const dateRegex = /^[a-zA-Z0-9._\-() "&,;:/!?]+$/;
        if (!dateRegex.test(description)) {
            throw new Error("Les carractères acceptés pour la descriptions sont de A-Z, 1-9, ainsi que ()\"&,;:/!? ");
        }
    }



    // pour transformer l'objet en JSON pour un patch, prenant en paramètre les données modifiées
    static toJsonPatch(modifiedData) {
        const patch = {};
        // Vérifiez chaque propriété modifiée et ajoutez-la au patch
        if (modifiedData.hasOwnProperty('is_pinned')) {
            patch.is_pinned = modifiedData.is_pinned;
        }
        if (modifiedData.hasOwnProperty('description')) {
            patch.description = modifiedData.description;
        }
        return patch;
    }
}

export { Post };
