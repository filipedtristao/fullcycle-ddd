import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class LogMessageWhenCustomerAddressIsChangedHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log(`Customer ${event.data.customerId}, ${event.data.customerName} address changed to ${event.data.email}`);
    }
}