class Asset {
    constructor(id, url, type, userId, postId) {
        this.id = id;
        this.url = url;
        this.type = type;
        this.userId = userId;
        this.postId = postId;
    }

    toJson() {
        if (!type) {
            throw new Error('Les champs obligatoires doivent être spécifiés : type');
        }
        return {
            id: this.id,
            url: this.url,
            type: this.type,
            userId: this.userId,
            postId: this.postId,
        };
    }

    // pour transformer le JSON en objet grâce au Model
    static fromJson(json) {
        const { id, url, type, userId, postId } = json;
        return new Asset(id, url, type, userId, postId);
    }
}

export { Asset };
