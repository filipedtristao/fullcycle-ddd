import { v4 } from "uuid";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default class OrderService {
    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Items are required");
        }

        const order = new Order(v4(), customer.getId(), items);
        customer.addRewardPoints(order.total() / 2);

        return order;
    }

    static calculateTotal(orders: Order[]) {
        return orders.reduce((total, order) => total + order.total(), 0);
    }
}