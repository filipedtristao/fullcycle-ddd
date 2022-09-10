import EventInterface from "../../@shared/events/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurrence: Date;
    data: any;

    constructor(data: any) {
        this.dateTimeOcurrence = new Date();
        this.data = data;
    }
}