export default class Address {
    constructor(
        private street: string,
        private number: string,
        private city: string,
        private state: string,
        private zip: string,
    ) { 
        this.validate();
    }

    getStreet() {
        return this.street;
    }

    getCity() {
        return this.city;
    }

    getState() {
        return this.state;
    }

    getZip() {
        return this.zip;
    }

    getNumber() {
        return this.number;
    }

    validate() {
        if (this.street.length === 0) {
            throw new Error('Street is required');
        }

        if (this.city.length === 0) {
            throw new Error('City is required');
        }

        if (this.state.length === 0) {
            throw new Error('State is required');
        }

        if (this.zip.length === 0) {
            throw new Error('Zip is required');
        }
    }

    toString() {
        return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    }
}