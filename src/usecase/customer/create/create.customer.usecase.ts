import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { CreateCustomerDtoInput, CreateCustomerDtoOutput } from "./create.customer.dto";

export default class CreateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: CreateCustomerDtoInput): Promise<CreateCustomerDtoOutput> {
        const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city);
        const customer = CustomerFactory.createWithAddress(input.name, address); //generates uuid

        await this.customerRepository.create(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        };
    };
}