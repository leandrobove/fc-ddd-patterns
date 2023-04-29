import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test for product find use case", () => {

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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("123", "iPhone", 6000.00);
        await productRepository.create(product);

        const input = {
            id: product.id
        };

        const outputExpected = {
            id: product.id,
            name: product.name,
            price: product.price
        };

        const findProductUseCase = new FindProductUseCase(productRepository);
        const outputUseCase = await findProductUseCase.execute(input);

        expect(outputUseCase).toEqual(outputExpected);
    });
});