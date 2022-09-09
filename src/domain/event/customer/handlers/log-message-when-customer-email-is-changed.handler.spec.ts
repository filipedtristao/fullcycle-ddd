import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerChangedAddressEvent from "../customer-changed-address.event";
import LogMessageWhenCustomerAddressIsChangedHandler from "./log-message-when-customer-address-is-changed.handler";

describe('LogMessageWhenCustomerEmailIsChangedHandler', () => {
    it('should log message when customer address is changed', () => {
        const handler = new LogMessageWhenCustomerAddressIsChangedHandler();
        const eventDispatcher = new EventDispatcher();
        const spy = jest.spyOn(handler, 'handle');
        const event = new CustomerChangedAddressEvent({
            customerId: '1',
            customerName: 'John Doe',
            address: 'New York',
        });

        eventDispatcher.register('CustomerChangedAddressEvent', handler);
        eventDispatcher.notify(event);
        
        expect(spy).toBeCalled();
    });
});