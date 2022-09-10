import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class LogMessageWhenCustomerIsCreated1Handler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("This is the first handler for the customer created event.");
    }
}