import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test for product update use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        const product = new Product("123", "iPhone", 6000.00);

        const productRepository = new ProductRepository();
        productRepository.create(product);

        const input = {
            id: product.id,
            name: "iPhone Updated",
            price: 6500.00,
        }

        const updateProductUseCase = new UpdateProductUseCase(productRepository);
        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);
    });

    it("should thrown an error when update product not found", async () => {
        const productRepository = new ProductRepository();

        const input = {
            id: "1234",
            name: "iPhone Updated",
            price: 6500.00,
        }

        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        await expect(updateProductUseCase.execute(input)).rejects.toThrow(
            "Product not found"
        );
    });
});