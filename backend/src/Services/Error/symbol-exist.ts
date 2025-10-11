export class SymbolAlreadyExist extends Error{
    constructor(){
        super("Symbol already exist");
    }
}