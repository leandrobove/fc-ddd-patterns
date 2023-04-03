import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogWhenCustomerChangeTheirAddressHandler from "./handler/send-console-log-when-customer-change-their-address.handler";
import SendConsoleLogWhenCustomerIsCreated1Handler from "./handler/send-console-log-when-customer-is-created1.handler";
import SendConsoleLogWhenCustomerIsCreated2Handler from "./handler/send-console-log-when-customer-is-created2.handler";

describe("Customer domain event tests", () => {

    it("should notify two customer event handlers when a new customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogWhenCustomerIsCreated1Handler();
        const eventHandler2 = new SendConsoleLogWhenCustomerIsCreated2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler1);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({});

        // Quando o notify for executado os dois handlers devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should notify customer event handler when a customer change their address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerChangeTheirAddressHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(eventHandler);

        const address = new Address("north way road", 199, "00000-000", "New York");
        const customer = new Customer("123", "John");
        customer.changeAddress(address);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.Address
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(customerAddressChangedEvent.dataTimeOccurred).not.toBeNull();
    });
});