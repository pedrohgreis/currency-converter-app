import { beforeEach, describe, expect, it } from "vitest";
import { DeleteCurrencyUseCase } from "../useCases/deleteCurrencyUseCase";
import { InMemoryCurrencyRepository } from "../../repositories/in-memory/in-memory-currency-repository";
import { CurrencyNotFound } from "../Error/currency-not-found";

describe("Delete currency", () => {
    let currencyRepository: InMemoryCurrencyRepository
    let sut: DeleteCurrencyUseCase

    beforeEach(() => {
        currencyRepository = new InMemoryCurrencyRepository()
        sut = new DeleteCurrencyUseCase(currencyRepository)
    })

    it("Should delete currency", async () => {
        // creating currency
        const registerCurrency = await currencyRepository.createCurrency({
            id: "1",
            name: "Dolar",
            code: "USD",
            symbol: "$"
        })

        const {currency} = await sut.delete({currencyId: registerCurrency.id})

        expect(currency.id).toBe(registerCurrency.id)
        
        const deletedCurrency = await currencyRepository.findCurrencyById(registerCurrency.id)

        expect(deletedCurrency).toBeNull()
    })

    it("should throw error when trying to delete non-existent currency", async () => {
        await expect(
            sut.delete({ currencyId: "non-existent-id" })
        ).rejects.toBeInstanceOf(CurrencyNotFound)
    })
})