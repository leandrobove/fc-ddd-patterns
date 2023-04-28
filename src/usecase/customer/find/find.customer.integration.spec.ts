import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Integration test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        
        const input = {
            id: customer.id
        };

        const outputExpected = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
        };

        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
        const outputUseCase = await findCustomerUseCase.execute(input);

        expect(outputExpected).toEqual(outputUseCase);
    });


});