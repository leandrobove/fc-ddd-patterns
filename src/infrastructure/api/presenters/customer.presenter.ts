import { number } from "yup";
import { ListCustomerDtoOutput } from "../../../usecase/customer/list/list.customer.dto";
import { toXML } from "jstoxml";

export default class CustomerPresenter {

    static convertListToXML(data: ListCustomerDtoOutput): string {
        const xmlOptions = {
            header: true,
            indent: "   ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city,
                    }
                }))
            }
        }, xmlOptions);
    }
}