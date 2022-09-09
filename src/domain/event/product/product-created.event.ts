import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurrence: Date;
    data: any;

    constructor(data: any) {
        this.dateTimeOcurrence = new Date();
        this.data = data;
    }
}