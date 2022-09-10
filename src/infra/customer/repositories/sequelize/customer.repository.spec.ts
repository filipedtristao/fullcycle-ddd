import { Sequelize } from 'sequelize-typescript';
import Address from '../../../../domain/customer/entity/address';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerModel from './customer.model';
import CustomerRepository from './customer.repository';

describe('CustomerRepository', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('c1', 'Customer 1');
        const address = new Address('Street 1', '1', 'City 1', 'State 1', 'Zip 1');

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findByPk(customer.getId());

        expect(customerModel?.toJSON()).toStrictEqual({
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
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('c1', 'Customer 1');

        customer.changeAddress(new Address('Street 1', '1', 'City 1', 'State 1', 'Zip 1'));

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findByPk(customer.getId());

        expect(customerModel?.toJSON()).toStrictEqual({
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

        customer.changeName('Customer 1 Updated');
        customer.deactivate();
        customer.changeAddress(new Address('Street 1 Updated', '1 Updated', 'City 1 Updated', 'State 1 Updated', 'Zip 1 Updated'));

        await customerRepository.update(customer);

        const customerModelUpdated = await CustomerModel.findByPk(customer.getId());

        expect(customerModelUpdated?.toJSON()).toStrictEqual({
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
    });

    it('should find a customer by id', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('c1', 'Customer 1');
        customer.changeAddress(new Address('Street 1', '1', 'City 1', 'State 1', 'Zip 1'));

        await customerRepository.create(customer);

        const customerFound = await customerRepository.findById(customer.getId());

        expect(customerFound).toEqual(customer);
    });

    it('should find all products', async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer('c1', 'Customer 1');
        const customer2 = new Customer('c2', 'Customer 2');

        customer1.changeAddress(new Address('Street 1', '1', 'City 1', 'State 1', 'Zip 1'));
        customer2.changeAddress(new Address('Street 2', '2', 'City 2', 'State 2', 'Zip 2'));

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customersFound = await customerRepository.findAll();

        expect(customersFound).toEqual([customer1, customer2]);
    });
});