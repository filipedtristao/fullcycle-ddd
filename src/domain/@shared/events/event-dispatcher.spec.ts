import EventDispatcher from "./event-dispatcher";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

describe('EventDispatcher', () => {
    const mockHandler = class implements EventHandlerInterface {
        handle(event: EventInterface): void {
            return;
        }
    };

    const mockEvent = class implements EventInterface {
        dateTimeOcurrence: Date;
        data: any;

        constructor(data: any) {
            this.dateTimeOcurrence = new Date();
            this.data = data;
        }
    };

    it("should register event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new mockHandler();
        
        eventDispatcher.register("mockEvent", eventHandler);
        
        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["mockEvent"]).toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["mockEvent"].length).toBe(1);
    });

    it("should unregister event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new mockHandler();
        
        eventDispatcher.register("mockEvent", eventHandler);

        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["mockEvent"]).toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["mockEvent"].length).toBe(1);

        eventDispatcher.unregister("mockEvent", eventHandler);
        
        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["mockEvent"]).not.toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["mockEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new mockHandler();
        
        eventDispatcher.register("mockEvent", eventHandler);

        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["mockEvent"]).toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["mockEvent"].length).toBe(1);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeUndefined();
    });

    it("should notify event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new mockHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("mockEvent", eventHandler);

        expect(eventDispatcher.getHandlers()["mockEvent"]).toBeDefined();
        expect(eventDispatcher.getHandlers()["mockEvent"]).toContain(eventHandler);
        expect(eventDispatcher.getHandlers()["mockEvent"].length).toBe(1);

        // When the event is notified, the event handler should be called.
        eventDispatcher.notify(new mockEvent({ 
            name: "Product 1",
            price: 100,
            quantity: 10,
        }));

        expect(spyEventHandler).toBeCalled();
    });
});