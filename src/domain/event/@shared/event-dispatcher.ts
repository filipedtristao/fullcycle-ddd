import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private handlers: { [key: string]: EventHandlerInterface[] } = {};

    public getHandlers(): { [key: string]: EventHandlerInterface[] } {
        return this.handlers;
    }

    public notify(event: EventInterface): void {
        const eventHandlers = this.getHandlers()[event.constructor.name] || [];

        eventHandlers.forEach((eventHandler: EventHandlerInterface) => {
            eventHandler.handle(event);
        });
    }

    public register(event: string, handler: EventHandlerInterface): void {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }

        this.handlers[event].push(handler);
    }

    public unregister(event: string, handler: EventHandlerInterface): void {
        const index = this.handlers[event]?.indexOf(handler);

        if (index > -1) {
            this.handlers[event].splice(index, 1);
        }
    }

    public unregisterAll(): void {
        this.handlers = {};
    }
}