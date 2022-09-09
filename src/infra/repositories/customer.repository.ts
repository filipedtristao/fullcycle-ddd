import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repositories/customer.repository.interface";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(customer: Customer): Promise<void> {
        await CustomerModel.create({
            id: customer.getId(),
            name: customer.getName(),
            active: customer.isActive(),
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            zip: customer.getAddress().getZip(),
            rewardPoints: customer.getRewardPoints(),
        });
    }

    async update(customer: Customer): Promise<void> {
        await CustomerModel.update({
            name: customer.getName(),
            active: customer.isActive(),
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            zip: customer.getAddress().getZip(),
            rewardPoints: customer.getRewardPoints(),
        }, {
            where: {
                id: customer.getId(),
            },
        });
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zip);

            customer.addRewardPoints(customerModel.rewardPoints);
            customer.changeAddress(address);

            if (customerModel.active) {
                customer.activate();
            } else {
                customer.deactivate();
            }

            return customer;
        });
    }

    async findById(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findByPk(id);

        if (!customerModel) {
            throw new Error('Customer not found');
        }

        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zip);

        customer.addRewardPoints(customerModel.rewardPoints);
        customer.changeAddress(address);

        if (customerModel.active) {
            customer.activate();
        } else {
            customer.deactivate();
        }

        return customer;
    }
}