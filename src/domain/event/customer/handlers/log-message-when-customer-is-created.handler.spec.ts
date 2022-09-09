import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.event";
import LogMessageWhenCustomerIsCreated1Handler from "./log-message-when-customer-is-created-1.handler";
import LogMessageWhenCustomerIsCreated2Handler from "./log-message-when-customer-is-created-2.handler";

describe('LogMessageWhenCustomerIsCreatedHandler', () => {
    it('should log messages when customer is created', () => {
        const handler1 = new LogMessageWhenCustomerIsCreated1Handler();
        const handler2 = new LogMessageWhenCustomerIsCreated2Handler();
        const eventDispatcher = new EventDispatcher();
        const event = new CustomerCreatedEvent({});

        const spy1 = jest.spyOn(handler1, 'handle');
        const spy2 = jest.spyOn(handler2, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', handler1);
        eventDispatcher.register('CustomerCreatedEvent', handler2);

        eventDispatcher.notify(event);

        expect(spy1).toBeCalled();
        expect(spy2).toBeCalled();
    });
})