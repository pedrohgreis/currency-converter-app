import type { ConversionInterface } from "@/repositories/interfaces/conversionInterface";
import { InvalidAmount } from "../Error/invalid-amount";
import { UserNotFound } from "../Error/user-not-foud";
import { InvalidDate } from "../Error/invalid-date";
import { EmptyCurrencyError } from "../Error/EmptyCurrencyError";
import { SameCurrency } from "../Error/same-currency";

export class ConversionUseCase{
    constructor(private currencyRepository: ConversionInterface){}

    async execute(data: {
        amount: number, 
        convertedAmount: number, 
        createdAt: Date, 
        userId: string, 
        fromCurrencyId: string, 
        toCurrencyId:string
    }){
        // verifying amount
        const amount = data.amount
        if(typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) throw new InvalidAmount();

        //verifying converted amount
        const convertedAmount = data.convertedAmount
        if(typeof convertedAmount !== 'number' || !Number.isFinite(convertedAmount) || convertedAmount <= 0) throw new InvalidAmount();

        // verifying userId
        const userId = data.userId
        if(userId === "") throw new UserNotFound();

        // verifying date
        const date = data.createdAt
        if(!date || !(date instanceof Date) || date > new Date()) throw new InvalidDate();

        // verifying currencies
        const fromCurrencyId = data.fromCurrencyId
        const toCurrencyId = data.toCurrencyId
        if(fromCurrencyId === "" || toCurrencyId === "") throw new EmptyCurrencyError();
        if(fromCurrencyId === toCurrencyId) throw new SameCurrency();

         
        const conversion = await this.currencyRepository.createConversion({
            amount,
            convertedAmount,
            createdAt: date,
            user: { connect: { id: userId } },
            fromCurrency: { connect: { id: fromCurrencyId } },
            toCurrency: { connect: { id: toCurrencyId } },
        });

        return {conversion};
    }
}