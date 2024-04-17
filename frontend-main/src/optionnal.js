class Optional {
    constructor(value) {
        this.value = value === undefined || value == null ? null : value;
    }

    static of(value) {
        if (value === null || value === undefined) {
            return new Error("Value is null")
        }
        return new Optional(value);
    }

    static empty() {
        return new Optional(null);
    }

    static ofNullable(value) {
        return new Optional(value);
    }

    isEmpty() {
        return this.value === null;
    }

    get() {
        return this.value;
    }

    getOrThrow(callback) {
        if (this.value === null) {
            callback();
        }

        return this.value;
    }

    orElse(other) {
        return this.value === null ? other : this.value;
    }
}

export { Optional };