import Address from "./address";

export default class Customer {
    private address!: Address;
    private active: boolean = true;
    private rewardPoints: number = 0;

    constructor(
        private id: string,
        private name: string,
    ) {
        this.validate()
    }

    validate() {
        if (this.name.length === 0) {
            throw new Error('Name is required');
        }

        if (this.id.length === 0) {
            throw new Error('Id is required');
        }

        if (!this.active) {
            throw new Error('Customer is not active');
        }

        return true;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    changeName(name: string) {
        this.name = name;
    }

    isActive() {
        return this.active;
    }

    activate() {
        if (!this.address) {
            throw new Error('Address is required');
        }

        this.active = true;
    }

    deactivate() {
        this.active = false;
    }

    addRewardPoints(points: number) {
        this.rewardPoints += points;
    }

    getRewardPoints() {
        return this.rewardPoints;
    }

    setAddress(address: Address) {
        this.address = address;
    }
}