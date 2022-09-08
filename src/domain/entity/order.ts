import OrderItem from "./order-item";

export default class Order {
    constructor(
        private id: string,
        private customerId: string,
        private items: OrderItem[],
    ) {
        this.validate();
    }

    validate() {
        if (this.id.length === 0) {
            throw new Error('Id is required');
        }

        if (this.customerId.length === 0) {
            throw new Error('Customer Id is required');
        }

        if (this.items.length === 0) {
            throw new Error('Items are required');
        }
    }

    getId() {
        return this.id;
    }

    getCustomerId() {
        return this.customerId;
    }

    getItems() {
        return this.items;
    }

    addItem(item: OrderItem) {
        this.items.push(item);
    }

    removeItem(itemId: string) {
        this.items = this.items.filter(item => item.getId() !== itemId);
    }

    total() {
        return this.items.reduce((total, item) => {
            return total + item.total();
        }, 0);
    }
}