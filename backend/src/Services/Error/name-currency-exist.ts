export class NameCurrencyAlreadyExist extends Error{
    constructor(){
        super("Already exists a currency with this name");
    }
}