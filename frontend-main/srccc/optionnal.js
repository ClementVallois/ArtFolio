class Optional {
    constructor(value) {
        this.value = value === undefined || value == null ? null : value;
    }

    static of(value) {
        if (value === null || value === undefined) {
            throw new Error('Value cannot be null or undefined');
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

// const loginAPI = null;

// const getAll = { header: { bearer: loginAPI, data: null } } 

// getAll?.header?.bearer? 


const loginAPI = Optional.of({ bearer: {} });

const getAll = Optional.of({ header: { loginAPI.get().bearer }, data: {} })

getAll
    .getOrThrow(() => console.log("c'est ton getAll le soucis")).
    header
    .getOrThrow(() => console.log("c'est ton header²")).
    bearer
    .getOrThrow(() => console.log("c'est ton bearer")); 