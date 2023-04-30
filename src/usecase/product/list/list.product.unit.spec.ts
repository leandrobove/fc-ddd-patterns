import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product(
    "1", "iPhone", 6500.00
);
const product2 = new Product(
    "2", "iPad", 9000.00
);

const products = [product1, product2];

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
        create: jest.fn(),
        update: jest.fn()
    }
};

const input = {};

describe("Unit tests for product list use case", () => {

    it("should list products", async () => {
        const productRepository = MockRepository();

        const listProductUseCase = new ListProductUseCase(productRepository);
        const output = await listProductUseCase.execute(input);

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});