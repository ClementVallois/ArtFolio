class Category {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }


    // pour transformer le json en object grâce au Model
    static fromJson(json) {
        const { id, name, description, createdAt } = json;
        return new Category(id, name, description, createdAt);
    }
}

export { Category };

