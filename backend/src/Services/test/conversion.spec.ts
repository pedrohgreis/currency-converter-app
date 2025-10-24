import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryConversionRepository } from "../../repositories/in-memory/in-memory-convertion-repository";
import { ConvertionUseCase } from "../useCases/convertionUseCase";




describe("Register user", () => {
    let conversionRepository: InMemoryConversionRepository
    let sut:ConvertionUseCase

    beforeEach(() => {
        conversionRepository = new InMemoryConversionRepository();
        sut = new ConvertionUseCase(conversionRepository);
    })

    it("should create convertion", async () => {
        
        const conversion = {
            amount: 50,
            convertedAmount: 40,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "1",
            toCurrencyId: "2"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion).toMatchObject({
            amount: conversion.amount,
            convertedAmount: conversion.convertedAmount,
            createdAt: conversion.createdAt,
            userId: conversion.userId,
            fromCurrencyId: conversion.fromCurrencyId,
            toCurrencyId: conversion.toCurrencyId
        })
    })

    it("should find conversion by id", async () => {
        const conversion = {
            id: "1",
            amount: 50,
            convertedAmount: 40,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "1",
            toCurrencyId: "2"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion.id).toBeTruthy()
    })

    it("should find conversion by currencyId", async () => {
        const conversion = {
            id: "1",
            amount: 50,
            convertedAmount: 40,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion).toMatchObject({
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        })
    })

    it("should find amount converted", async () => {
        const conversion = {
            id: "1",
            amount: 50,
            convertedAmount: 40,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion.convertedAmount).toBeTruthy()
        expect(Number.isFinite(result.conversion.convertedAmount)).toBe(true)
    })

    it("should find conversion by user", async () => {
        const conversion = {
            id: "1",
            amount: 50,
            convertedAmount: 40,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion.userId).toBe("user-1")
    })

    it("should find recent conversions", async () => {
        const now = new Date()
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        const conversion1 = {
            amount: 30,
            convertedAmount: 25,
            createdAt: yesterday,
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const conversion2 = {
            amount: 50,
            convertedAmount: 40,
            createdAt: now,
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        await sut.execute(conversion1)
        await sut.execute(conversion2)

        const result = await conversionRepository.findRecentConversions(1)

        expect(result).toHaveLength(1)
        expect(result[0]!.amount).toBe(50) 
    })

    it("should delete conversion", async () => {
        const ontem = new Date()
        ontem.setDate(ontem.getDate() - 1) 
        
        const hoje = new Date()

        const conversion1 = {
            id: "1",
            amount: 30,
            convertedAmount: 25,
            createdAt: ontem, 
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const conversion2 = {
            id: "2",
            amount: 200,
            convertedAmount: 100,
            createdAt: hoje, 
            userId: "user-2",
            fromCurrencyId: "EUR",
            toCurrencyId: "BRL"
        }

        const result1 = await sut.execute(conversion1)
        const result2 = await sut.execute(conversion2)

        // confirm if it was created
        expect(conversionRepository.items).toHaveLength(2);

        // delete 
        await conversionRepository.deleteConversion(hoje)

        expect(conversionRepository.items).toHaveLength(1)

        expect(conversionRepository.items[0]!.id).toBe(result2.conversion.id)
        expect(conversionRepository.items[0]!.amount).toBe(200)
    })
})