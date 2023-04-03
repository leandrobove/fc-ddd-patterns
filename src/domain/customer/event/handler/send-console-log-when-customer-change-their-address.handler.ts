import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogWhenCustomerChangeTheirAddressHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: CustomerAddressChangedEvent): void {
        const data = event.eventData;
        console.log(`Endereço do cliente: ${data.id}, ${data.name} alterado para: ${data.address}`);
    }

}