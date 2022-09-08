import Product from "../../domain/entity/product";
import ProductService from "./product.service";

describe("ProductService", () => {
    it("should change the price of all products", () => {
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);

        ProductService.increasePrice([product1, product2], 10);

        expect(product1.getPrice()).toBe(11);
        expect(product2.getPrice()).toBe(22);
    });
});