import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export default class LogMessageWhenCustomerIsCreated2Handler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("This is the second handler for the customer created event.");
    }
}