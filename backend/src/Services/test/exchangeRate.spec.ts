import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryExchangeRateRepository } from "../../repositories/in-memory/in-memory-exchangeRate";
import { ExchangeRateUseCase } from "../useCases/exchangeRateUseCase";
import { EmptyCurrencyError } from "../Error/EmptyCurrencyError";
import { InvalidRate } from "../Error/invalid-rate";



describe("Exchange Rate", () => {
    let exchangeRateRepository: InMemoryExchangeRateRepository
    let sut:ExchangeRateUseCase

    beforeEach(() => {
        exchangeRateRepository = new InMemoryExchangeRateRepository();
        sut = new ExchangeRateUseCase(exchangeRateRepository);
    })

    it("should create an exchange rate", async () => {
        
        const rate = {
            fromCurrencyId: "1",
            toCurrencyId: "2",
            rate: 5,
            updatedAt: new Date()
        }

        const result = await sut.execute(rate)

        // verifying if there's no error
        expect(result).toBeTruthy()

        //verifying array has 1 item
        expect(exchangeRateRepository.items).toHaveLength(1)

        // verifying if 1st item is rate = 5
        expect(exchangeRateRepository.items[0]?.rate).toBe(5)
    })

    it("should throw error when rate is negative", async () => {
        const rate = {
            fromCurrencyId: "1",
            toCurrencyId: "2",
            rate: -5,
            updatedAt: new Date()
        }

        try{
            await sut.execute(rate)
            expect.fail("Should thorwn an error")
        } catch(error){
            expect(error).toBeInstanceOf(InvalidRate)
        }
    })

    it("should throw error when currencies are empty", async () => {
        const rate = {
            fromCurrencyId: "",
            toCurrencyId: "",
            rate: 5,
            updatedAt: new Date()
        }

        try{
            await sut.execute(rate)
            expect.fail("Should thorow an error")
        } catch(error){
            expect(error).toBeInstanceOf(EmptyCurrencyError)
        }
    })
})