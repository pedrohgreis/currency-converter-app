export class FutereDateError extends Error{
    constructor(){
        super("Date cannot be in the future.")
    }
}