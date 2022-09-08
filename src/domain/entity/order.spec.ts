import Order from "./order";
import OrderItem from "./order-item";

describe("Order", () => {
    it("should throw a error when id is empty", () => {
        expect(() => new Order("", "123", [])).toThrowError("Id is required");
    });

    it("should throw a error when customer id is empty", () => {
        expect(() => new Order("123", "", [])).toThrowError("Customer Id is required");
    });

    it("should throw a error when items is empty", () => {
        expect(() => new Order("123", "123", [])).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        //Arrange 
        const item1 = new OrderItem("123", "p1", "Product 1", 1, 10);
        const item2 = new OrderItem("123", "p2", "Product 2", 2, 20);
        const order = new Order("1", "123", [item1, item2]);

        //Act
        const total = order.total();

        //Assert
        expect(total).toBe(50);
    });
});
