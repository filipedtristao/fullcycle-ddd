import { Sequelize } from 'sequelize-typescript';
import Product from '../../domain/entity/product';
import ProductModel from '../database/sequelize/model/product.model';
import ProductRepository from './product.repository';

describe('ProductRepository', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(() => {
        sequelize.close();
    });

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('p1', 'Product 1', 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findByPk(product.getId());

        expect(productModel?.toJSON()).toStrictEqual({
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        });
    });

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('p1', 'Product 1', 10);

        await productRepository.create(product);

        const createdProductModel = await ProductModel.findByPk(product.getId());

        expect(createdProductModel?.toJSON()).toStrictEqual({
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        });

        product.changeName('Product 1 updated');
        product.changePrice(20);

        await productRepository.update(product);

        const updatedProductModel = await ProductModel.findByPk(product.getId());

        expect(updatedProductModel?.toJSON()).toStrictEqual({
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        });
    });

    it('should find a product by id', async () => {
        const productRepository = new ProductRepository();
        const product = new Product('p1', 'Product 1', 10);

        await productRepository.create(product);

        const foundProduct = await productRepository.findById(product.getId());

        expect(foundProduct).toEqual(product);
    });

    it('should find all products', async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product('p1', 'Product 1', 10);
        const product2 = new Product('p2', 'Product 2', 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        expect(foundProducts).toEqual([product1, product2]);
    });
});