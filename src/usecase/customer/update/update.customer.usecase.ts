import RepositoryInterface from "../../../domain/@shared/repository/repository-interface";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { UpdateCustomerDtoInput, UpdateCustomerDtoOuput } from "./update.customer.dto";

export default class UpdateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: UpdateCustomerDtoInput): Promise<UpdateCustomerDtoOuput> {

        const customer = await this.customerRepository.find(input.id);

        const address = new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        );
        customer.changeAddress(address);
        customer.changeName(input.name);

        await this.customerRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
        };
    }
}