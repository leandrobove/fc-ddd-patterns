import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { FindCustomerDtoInput, FindCustomerDtoOutput } from "./find.customer.dto";

export default class FindCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: FindCustomerDtoInput): Promise<FindCustomerDtoOutput> {
        const customer = await this.customerRepository.find(input.id);

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
    }

}