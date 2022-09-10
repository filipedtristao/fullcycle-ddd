import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class LogMessageWhenCustomerAddressIsChangedHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log(`Customer ${event.data.customerId}, ${event.data.customerName} address changed to ${event.data.email}`);
    }
}