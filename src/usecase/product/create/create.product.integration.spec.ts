import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Integration test for creating product use case", () => {
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

    it("should create a product", async () => {
        //given
        const input = {
            name: "iPhone",
            price: 6000.00
        };

        //when
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        //then
        const productExpected = {
            id: output.id,
            name: "iPhone",
            price: 6000.00
        };

        const product = await productRepository.find(output.id);
        
        expect(product.id).toEqual(productExpected.id);
        expect(product.name).toEqual(productExpected.name);
        expect(product.price).toEqual(productExpected.price);
    });
});