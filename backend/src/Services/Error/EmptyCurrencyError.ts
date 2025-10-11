export class EmptyCurrencyError extends Error{
    constructor(){
        super("Currencies can not be empty.")
    }
}