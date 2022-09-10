import { Sequelize } from 'sequelize-typescript';
import { v4 } from 'uuid';
import Address from '../../../../domain/customer/entity/address';
import Customer from '../../../../domain/customer/entity/customer';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repositories/sequelize/customer.model';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import ProductModel from '../../../product/repositories/sequelize/product.model';
import OrderRepository from './order.repository';
import CustomerRepository from '../../../customer/repositories/sequelize/customer.repository';
import ProductRepository from '../../../product/repositories/sequelize/product.repository';

describe('OrderRepository', () => {
    let sequelize: Sequelize;
    let createOrder = async (customer: Customer, orderItems: OrderItem[]): Promise<Order> => {
        const orderRepository = new OrderRepository();
        const id = v4();
        const order = new Order(`o${id}`, customer.getId(), orderItems);

        await orderRepository.create(order);

        return order;
    }

    let createCustomer = async (): Promise<Customer> => {
        const customerRepository = new CustomerRepository();
        const id = v4();
        const customer = new Customer(`c${id}`, 'Customer 1');

        customer.changeAddress(new Address('Street 1', '1', 'City 1', 'State 1', 'Zip 1'));

        await customerRepository.create(customer);

        return customer;
    }

    let createItem = async (): Promise<OrderItem> => {
        const productRepository = new ProductRepository();

        const id = v4();
        const product = new Product(`p${id}`, `Product ${id}`, 10);
        await productRepository.create(product);

        return new OrderItem(`oi${id}`, product.getId(), `Product ${id}`, 10, 1);
    };

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });

    it('should create an order', async () => {
        const customer = await createCustomer();
        const orderItem = await createItem();
        const order = await createOrder(customer, [orderItem]);

        const orderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: [
                {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                },
            ],
        });
    });

    it('should update order items', async () => {
        const orderRepository = new OrderRepository();
        const customer = await createCustomer();
        const createItems = [await createItem(), await createItem()];
        const order = await createOrder(customer, createItems);
        
        const orderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });

        order.addItem(await createItem());
        order.addItem(await createItem());

        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(updatedOrderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });
    });

    it('should delete order items', async () => {
        const orderRepository = new OrderRepository();
        const customer = await createCustomer();
        const createItems = [await createItem(), await createItem()];
        const order = await createOrder(customer, createItems);
        
        const orderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });

        order.removeItem(createItems[0].getId());

        await orderRepository.update(order);

        const updatedOrderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(updatedOrderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });
    });

    it('should find an order by id', async () => {
        const orderRepository = new OrderRepository();
        const customer = await createCustomer();
        const orderItem = await createItem();
        const order = await createOrder(customer, [orderItem]);

        const orderModel = await OrderModel.findByPk(order.getId(), {
            include: ['items'],
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.getId(),
            customer_id: order.getCustomerId(),
            items: order.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });

        const foundOrder = await orderRepository.findById(order.getId());

        expect(foundOrder).toEqual(order);
    });

    it('should find all orders', async () => {
        const orderRepository = new OrderRepository();
        const customer1 = await createCustomer();
        const orderItem1 = await createItem();
        const order1 = await createOrder(customer1, [orderItem1]);

        const orderModel1 = await OrderModel.findByPk(order1.getId(), {
            include: ['items'],
        });

        expect(orderModel1?.toJSON()).toStrictEqual({
            id: order1.getId(),
            customer_id: order1.getCustomerId(),
            items: order1.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order1.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });

        const customer2 = await createCustomer();
        const orderItem2 = await createItem();
        const order2 = await createOrder(customer2, [orderItem2]);

        const orderModel2 = await OrderModel.findByPk(order2.getId(), {
            include: ['items'],
        });

        expect(orderModel2?.toJSON()).toStrictEqual({
            id: order2.getId(),
            customer_id: order2.getCustomerId(),
            items: order2.getItems().map((orderItem) => {
                return {
                    id: orderItem.getId(),
                    order_id: order2.getId(),
                    product_id: orderItem.getProductId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                };
            }),
        });

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toEqual([order1, order2]);
    });
});