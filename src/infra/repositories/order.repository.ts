import { Op } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order-item";
import OrderRepositoryInterface from "../../domain/repositories/order.repository.interface";
import OrderItemModel from "../database/sequelize/model/order-item.model";
import OrderModel from "../database/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(order: Order): Promise<void> {
        await OrderModel.create({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map(item => {
                return {
                    id: item.getId(),
                    product_id: item.getProductId(),
                    name: item.getName(),
                    price: item.getPrice(),
                    quantity: item.getQuantity(),
                };
            }),
        }, {
            include: ['items'],
        });
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update({
            id: order.getId(),
            customer_id: order.getCustomerId(),
        }, {
            where: { id: order.getId() },
        });

        await OrderItemModel.destroy({
            where: { id: { [Op.notIn]: order.getItems().map(item => item.getId()) } },
        });

        const promises = order.getItems().map(item => {
            return OrderItemModel.upsert({
                id: item.getId(),
                order_id: order.getId(),
                product_id: item.getProductId(),
                name: item.getName(),
                price: item.getPrice(),
                quantity: item.getQuantity(),
            });
        });

        await Promise.all(promises);
    }

    async findById(id: string): Promise<Order> {
        const orderModel = await OrderModel.findByPk(id, {
            include: ['items'],
        });

        if (!orderModel) {
            throw new Error('Order not found');
        }

        const items = orderModel.items.map(item => new OrderItem(item.id, item.product_id, item.name, item.quantity, item.price));

        return new Order(orderModel.id, orderModel.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ['items'],
        });

        return orderModels.map(orderModel => {
            const items = orderModel.items.map(item => new OrderItem(item.id, item.product_id, item.name, item.quantity, item.price));

            return new Order(orderModel.id, orderModel.customer_id, items);
        });
    }
}