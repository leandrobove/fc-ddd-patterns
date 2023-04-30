import Product from "../../../domain/product/entity/product"
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product(
    "123",
    "iPhone",
    6000.00
);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

const input = {
    id: product.id,
    name: "iPhone Updated",
    price: 6500.00
};

describe("Unit tests for product update use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });

});