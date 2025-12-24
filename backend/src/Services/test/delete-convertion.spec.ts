import {describe, it, expect, beforeEach} from "vitest";
import { DeleteConvertionUseCase } from "../useCases/deleteConvertionUseCase";
import { InMemoryConversionRepository } from "../../repositories/in-memory/in-memory-convertion-repository";
import { connect } from "http2";
import { isBefore, subDays } from "date-fns";


describe("Delete Convertion", () => {
    let convertionRepository: InMemoryConversionRepository
    let sut:DeleteConvertionUseCase

    beforeEach(() => {
        convertionRepository = new InMemoryConversionRepository();
        sut = new DeleteConvertionUseCase(convertionRepository)
    })

    it("delete a convertion by id", async () => {

        const date = new Date()
        
        const convertionCreated = await convertionRepository.createConversion({
            amount: 10000,
            convertedAmount: 500,
            createdAt: date.getDate().toString(),
            user: {connect:{id:"1"}},
            fromCurrency: {connect:{id: "2"}},
            toCurrency: {connect:{id: "3"}}
        })

        const deletedConvertion = await convertionRepository.deleteConvertionById(convertionCreated.id)

        expect(deletedConvertion.id).toBe(convertionCreated.id)

    })

    it("should throw error when trying to delete non-existent currency", async () => {
        await expect(
            sut.deletedById({convertionId: "non-existent-id"})
        ).rejects.toThrow("Convertions Not Found!")
    })

    it("should delete converstion after 15 days", async () => {
        const oldDate = subDays(new Date(), 16)
        
        await convertionRepository.createConversion({
            amount: 10000,
            convertedAmount: 500,
            createdAt: oldDate,
            user: {connect:{id:"1"}},
            fromCurrency: {connect:{id: "2"}},
            toCurrency: {connect:{id: "3"}}
        })

        const deletedConvertion = await convertionRepository.deleteConversion(subDays(new Date(), 15))
        expect(deletedConvertion).toBe(1)
    })

})