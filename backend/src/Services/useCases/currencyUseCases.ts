import type { InMemoryCurrencyRepository } from "@/repositories/in-memory/in-memory-currency-repository";
import { CodeAlreadyExist } from "../Error/code-exist";
import { SymbolAlreadyExist } from "../Error/symbol-exist";
import { NameCurrencyAlreadyExist } from "../Error/name-currency-exist";


export class CurrencyUseCase{

    constructor(private currencyRepository: InMemoryCurrencyRepository){}

    async execute(data:{code:string, name: string, symbol?: string}){
        const code = data.code.trim();
        const name = data.name.trim();
        const symbol = data.symbol;

        const currencyCode = await this.currencyRepository.findCurrencyByCode(code);
        const currencyName = await this.currencyRepository.findCurrencyByName(name);
        
        let currencySymbol = null;
        if (typeof symbol === "string") {
            currencySymbol = await this.currencyRepository.findCurrencySymbol(symbol);
        }

        if(currencyCode) throw new CodeAlreadyExist();

        if(currencyName) throw new NameCurrencyAlreadyExist()

        if(currencySymbol) throw new SymbolAlreadyExist();

        const currency = await this.currencyRepository.createCurrency({
            code: code,
            name: name,
            symbol: symbol ?? null
        })

        return {currency}

    }
}