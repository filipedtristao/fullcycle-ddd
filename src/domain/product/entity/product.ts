export default class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
    ) {
        this.validate();
    }

    validate() {
        if (this.id.length === 0) {
            throw new Error('Id is required');
        }

        if (this.name.length === 0) {
            throw new Error('Name is required');
        }

        if (this.price <= 0) {
            throw new Error('Price must be greater than 0');
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    changeName(name: string) {
        this.name = name;
    }

    changePrice(price: number) {
        this.price = price;
    }
}