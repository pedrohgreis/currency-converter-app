export class RateNotFound extends Error{
    constructor(){
        super("Exchange rate not found")
    }
}