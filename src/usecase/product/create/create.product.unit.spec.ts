import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test for creating product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "iPhone",
            price: 6000.00
        };

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 6000.00
        };

        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should throw an error when price is negative", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "iPhone",
            price: -1
        };

        await expect(createProductUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});