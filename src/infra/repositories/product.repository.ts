import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repositories/product.repository.interface";
import ProductModel from "../database/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
        })
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product.getName(),
            price: product.getPrice(),
        }, {
            where: {
                id: product.getId(),
            },
        });
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(model => new Product(model.id, model.name, model.price));
    }

    async findById(id: string): Promise<Product> {
        const model = await ProductModel.findOne({where: {id}});

        if (!model) {
            throw new Error('Product not found');
        }

        return new Product(model.id, model.name, model.price);
    }
}