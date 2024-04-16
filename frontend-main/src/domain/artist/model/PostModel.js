class Post {
    constructor(id, isPinned, description, userId) {
        this.id = id;
        this.isPinned = isPinned;
        this.description = description;
        this.userId = userId;
    }
}

module.exports = Post;
