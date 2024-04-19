class Post {
    constructor(id, isPinned, description, createdAt) {
        this.id = id;
        this.isPinned = isPinned;
        this.description = description;
        //  this.user_id = user_id;
        this.createdAt = createdAt;
    }

    toJson() {
        return {
            id: this.id,
            isPinned: this.isPinned,
            description: this.description,
            // userId: this.userId
        };
    }

    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, isPinned, description, createdAt } = json;
        return new Post(id, isPinned, description, createdAt);
    }


    // pour transformer l'objet en JSON pour un patch, prenant en paramètre les données modifiées
    static toJsonPatch(modifiedData) {
        const patch = {};
        // Vérifiez chaque propriété modifiée et ajoutez-la au patch
        if (modifiedData.hasOwnProperty('isPinned')) {
            patch.isPinned = modifiedData.isPinned;
        }
        if (modifiedData.hasOwnProperty('description')) {
            patch.description = modifiedData.description;
        }
        return patch;
    }
}

export { Post };
