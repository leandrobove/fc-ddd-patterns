import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const input = {
            name: req.body.name,
            price: req.body.price
        };

        const output = await useCase.execute(input);

        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository());
    try {
        const input = {};
        const output = await useCase.execute(input);

        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});