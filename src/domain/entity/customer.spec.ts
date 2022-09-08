import Address from "./address";
import Customer from "./customer";

describe("Customer", () => {
    it("should throw a error when id is empty", () => {
        expect(() => new Customer("", "John Doe")).toThrowError("Id is required");
    });

    it("should throw a error when name is empty", () => {
        expect(() => new Customer("123", "")).toThrowError("Name is required");
    });

    it("should change name", () => {
        //Arrange 
        const customer = new Customer("123", "John Doe");

        //Act
        customer.changeName("Jane Doe");

        //Assert
        expect(customer.getName()).toBe("Jane Doe");
    });

    it("should activate customer", () => {
        //Arrange 
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", "123", "City", "State", "Zip");
        customer.setAddress(address);

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it("should throw a error when activate a customer without address", () => {
        //Arrange 
        const customer = new Customer("123", "John Doe");

        //Act & Assert
        expect(() => customer.activate()).toThrowError("Address is required");
    });

    it("should deactivate customer", () => {
        //Arrange 
        const customer = new Customer("123", "John Doe");

        //Act
        customer.deactivate();

        //Assert
        expect(customer.isActive()).toBe(false);
    })

    it("should add reward points", () => {
        const customer = new Customer("123", "John Doe");
        expect(customer.getRewardPoints()).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.getRewardPoints()).toBe(10);
        
        customer.addRewardPoints(10);
        expect(customer.getRewardPoints()).toBe(20);
    });
});
