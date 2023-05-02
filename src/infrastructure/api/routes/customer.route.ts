import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const input = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip
            }
        }

        const output = await useCase.execute(input);
        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({});

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});