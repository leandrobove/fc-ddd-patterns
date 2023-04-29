import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { ListCustomerDtoInput, ListCustomerDtoOutput } from "./list.customer.dto";

export default class ListCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: ListCustomerDtoInput): Promise<ListCustomerDtoOutput> {
        const customers = await this.customerRepository.findAll();

        return OutPutMapper.toOutput(customers);
    }
}

class OutPutMapper {
    static toOutput(customersEntity: Customer[]): ListCustomerDtoOutput {
        return {
            customers: customersEntity.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city
                },
            })),
        };
    }
}