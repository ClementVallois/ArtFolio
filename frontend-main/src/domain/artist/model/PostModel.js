class Post {
    constructor(id, isPinned, description, artistId, createdAt) {
        this.id = id;
        this.isPinned = isPinned;
        this.description = description;
        this.artistId = artistId;
        this.createdAt = createdAt;
    }

    toJson() {
        return {
            id: this.id,
            isPinned: this.isPinned,
            description: this.description,
            artistId: this.artistId
        };
    }

    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, isPinned, description, artistId, createdAt } = json;
        return new Post(id, isPinned, description, artistId, createdAt);
    }


    // Méthode pour valider la description avec un Regex
    validateDescription(description) {
        const descriptionRegex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1F600-\u1F64F\u1F300-\u1F5FF\u1F680-\u1F6FF\u1F700-\u1F77F\u1F900-\u1F9FF\u1FA70-\u1FAFF]+$/u;
        if (!descriptionRegex.test(description)) {
            throw new Error("Model Les carractères acceptés pour la descriptions sont de A-Z, 1-9, ainsi que ()\"&,;:/!?éàèïù@ ");
        }
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
