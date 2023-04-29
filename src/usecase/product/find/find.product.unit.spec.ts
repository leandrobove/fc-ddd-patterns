import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "iPhone", 6000.00);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test for finding product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: product.id
        };

        const output = await findProductUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        //force throw error
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const input = {
            id: product.id
        };

        expect(() => {
            return findProductUseCase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});