import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export default class LogMessageWhenCustomerIsCreated2Handler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        console.log("This is the second handler for the customer created event.");
    }
}