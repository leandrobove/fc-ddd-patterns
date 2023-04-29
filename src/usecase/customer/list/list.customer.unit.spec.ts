import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "John",
    new Address("A", 1, "1", "City1")
);
const customer2 = CustomerFactory.createWithAddress(
    "Bob",
    new Address("B", 2, "2", "City2")
);

const customers = [customer1, customer2];

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
        create: jest.fn(),
        update: jest.fn()
    }
};

const input = {};

describe("Unit tests for customer list use case", () => {

    it("should list customers", async () => {
        const customerRepository = MockRepository();

        const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listCustomerUseCase.execute(input);

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });

});