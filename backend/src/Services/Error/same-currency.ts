export class SameCurrency extends Error{
    constructor(){
        super("Can not convert same currency!")
    }
}