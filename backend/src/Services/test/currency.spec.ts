import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryCurrencyRepository } from "../../repositories/in-memory/in-memory-currency-repository";
import { CurrencyUseCase } from "../useCases/currencyUseCases";
import { CodeAlreadyExist } from "../Error/code-exist";
import { NameCurrencyAlreadyExist } from "../Error/name-currency-exist";
import { SymbolAlreadyExist } from "../Error/symbol-exist";



describe("Register user", () => {
    let userRepository: InMemoryCurrencyRepository
    let sut:CurrencyUseCase

    beforeEach(() => {
        userRepository = new InMemoryCurrencyRepository();
        sut = new CurrencyUseCase(userRepository);
    })

    it("should create currency", async () => {
        
        const currency = {
            name: "Euro",
            code: "EUR",
            symbol: "€"
        }

        const result = await sut.execute(currency)

        expect(result.currency).toMatchObject({
            name: currency.name,
            code: currency.code,
            symbol: currency.symbol
        })
    })


    it("should create verify if code already exist", async () => {
        
        const currency1 = {
            name: "Euro",
            code: "EUR",
            symbol: "€"
        }

        const currency2 = {
            name: "Euro",
            code: "EUR",
            symbol: "€"
        }

        await sut.execute(currency1);
        await expect(sut.execute(currency2)).rejects.toBeInstanceOf(CodeAlreadyExist);
        
    })


    it("should create verify if name already exist", async () => {
        
        const currency1 = {
            name: "Real",
            code: "BRL",
            symbol: "R$"
        }

        const currency2 = {
            name: "Real",
            code: "USD",
            symbol: "$"
        }


        await sut.execute(currency1);
        await expect(sut.execute(currency2)).rejects.toBeInstanceOf(NameCurrencyAlreadyExist);
        
    })


    it("should create verify if name already exist", async () => {
        
        const currency1 = {
            name: "Real",
            code: "BRL",
            symbol: "R$"
        }

        const currency2 = {
            name: "Dolar",
            code: "EUR",
            symbol: "R$"
        }


        await sut.execute(currency1);
        await expect(sut.execute(currency2)).rejects.toBeInstanceOf(SymbolAlreadyExist);
        
    })
})