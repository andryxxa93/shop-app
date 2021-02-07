import moment from "moment";

export default class Order {
    constructor(id, items, amount, date) {
        this.id = id;
        this.items = items;
        this.amount = amount;
        this.date = date;
    }

    get readeableDate(){
        return moment((this.date)).format('MMMM Do YYYY, hh:mm')
    }
}