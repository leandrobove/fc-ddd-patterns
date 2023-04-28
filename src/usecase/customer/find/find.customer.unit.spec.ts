import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


//find(id: string): Promise<Customer>

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();

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

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

        //force throw error
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const input = {
            id: customer.id
        };

        expect(() => {
            return findCustomerUseCase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});