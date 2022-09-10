export default class OrderItem {
    constructor(
        private id: string,
        private productId: string,
        private name: string,
        private quantity: number,
        private price: number,
    ) {
        this.validate();
    }

    validate() {
        if (this.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }

        if (this.price <= 0) {
            throw new Error('Price must be greater than 0');
        }

        if (this.name.length === 0) {     
            throw new Error('Name is required');
        }

        if (this.id.length === 0) {
            throw new Error('Id is required');
        }
    }

    getId() {
        return this.id;
    }

    getProductId() {
        return this.productId;
    }

    getName() {
        return this.name;
    }

    getQuantity() {
        return this.quantity;
    }

    getPrice() {
        return this.price;
    }

    total() {
        return this.quantity * this.price;
    }
}