import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dateTimeOcurrence: Date;
    data: any;

    constructor(data: any) {
        this.dateTimeOcurrence = new Date();
        this.data = data;
    }
}