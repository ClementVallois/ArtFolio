class Asset {
    constructor(id, url, type, userId, postId) {
        this.id = id;
        this.url = url;
        this.type = type;
        this.userId = userId;
        this.postId = postId;
    }
}

module.exports = Asset;