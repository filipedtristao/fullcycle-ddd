import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class LogMessageWhenCustomerIsCreated1Handler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("This is the first handler for the customer created event.");
    }
}