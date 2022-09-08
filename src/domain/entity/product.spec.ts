import Product from "./product";

describe("Product", () => {
    it("should throw a error when id is empty", () => {
        expect(() => new Product("", "Product 1", 10)).toThrowError("Id is required");
    });

    it("should throw a error when name is empty", () => {
        expect(() => new Product("123", "", 10)).toThrowError("Name is required");
    });
    
    it("should throw a error when price is zero", () => {
        expect(() => new Product("123", "Product 1", 0)).toThrowError("Price must be greater than 0");
    });

    it("should throw a error when price is less than zero", () => {
        expect(() => new Product("123", "Product 1", -1)).toThrowError("Price must be greater than 0");
    });

    it("shoud change name", () => {
        const product = new Product("123", "Product 1", 10);
        product.changeName("Product 2");
        
        expect(product.getName()).toBe("Product 2");
    });

    it("shoud change price", () => {
        const product = new Product("123", "Product 1", 10);
        product.changePrice(20);
        
        expect(product.getPrice()).toBe(20);
    });
});
