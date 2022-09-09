import EventDispatcher from "../../@shared/event-dispatcher";
import ProductCreatedEvent from "../product-created.event";
import SendEmailWhenProductIsCreatedHandler from "./send-email-when-product-is-created.handler";

describe('SendEmailWhenProductIsCreatedHandler', () => {
    it('should send email when product is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');
        const productEvent = new ProductCreatedEvent({
            productId: "1",
            productName: "Product 1",
            productPrice: 100
        });

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getHandlers()["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["ProductCreatedEvent"]).toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["ProductCreatedEvent"].length).toBe(1);

        eventDispatcher.notify(productEvent);

        expect(spyEventHandler).toBeCalled();
    });
});
    