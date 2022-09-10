import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("OrderService", () => {
    it("should place an order", () => {
        const customer = new Customer("c1", "John Doe");
        const item1 = new OrderItem("i1", "p1", "Product 1", 1, 10);
        const item2 = new OrderItem("i2", "p2", "Product 2", 2, 20);

        const order = OrderService.placeOrder(customer, [item1, item2]);
        
        expect(order.total()).toBe(50);
        expect(customer.getRewardPoints()).toBe(25);
    });

    it("should get total of all orders", () => {
        //Arrange
        const orderItem1 = new OrderItem("i1", "p1", "Product 1", 1, 10);
        const orderItem2 = new OrderItem("i2", "p2", "Product 2", 2, 20);

        const order1 = new Order("o1", "123", [orderItem1]);
        const order2 = new Order("o2", "123", [orderItem2]);

        //Act
        const total = OrderService.calculateTotal([order1, order2]);

        //Assert
        expect(total).toBe(50);
    });
});