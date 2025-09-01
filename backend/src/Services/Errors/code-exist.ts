export class CodeAlreadyExist extends Error{
    constructor(){
        super("Code already exist");
    }
}