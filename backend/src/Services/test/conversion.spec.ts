import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryConversionRepository } from "../../repositories/in-memory/in-memory-convertion-repository";
import { ConversionUseCase } from "../useCases/convertionUseCase";
import { InMemoryExchangeRateRepository } from "@/repositories/in-memory/in-memory-exchangeRate";




describe("Conversion use case", () => {
    let conversionRepository: InMemoryConversionRepository
    let exchangeRateRepository: InMemoryExchangeRateRepository
    let sut:ConversionUseCase

    beforeEach(() => {
        conversionRepository = new InMemoryConversionRepository();
        exchangeRateRepository = new InMemoryExchangeRateRepository();
        exchangeRateRepository.items = [
            { id: "rate-1", fromCurrencyId: "1", toCurrencyId: "2", rate: 0.8, updatedAt: new Date() },
            { id: "rate-2", fromCurrencyId: "USD", toCurrencyId: "BRL", rate: 1.6, updatedAt: new Date() },
            { id: "rate-3", fromCurrencyId: "EUR", toCurrencyId: "BRL", rate: 2, updatedAt: new Date() }
        ]
        sut = new ConversionUseCase(conversionRepository, exchangeRateRepository);
    })

    it("should create conversion and compute amount", async () => {
        const conversion = {
            amount: 50,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "1",
            toCurrencyId: "2"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion).toMatchObject({
            amount: conversion.amount,
            createdAt: conversion.createdAt,
            userId: conversion.userId,
            fromCurrencyId: conversion.fromCurrencyId,
            toCurrencyId: conversion.toCurrencyId
        })
        expect(result.conversion.convertedAmount).toBeCloseTo(40)
    })

    it("should find conversion by id", async () => {
        const conversion = {
            id: "1",
            amount: 50,
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "1",
            toCurrencyId: "2"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion.id).toBeTruthy()
    })

    it("should delete conversion by currencyId", async () => {
        const conversion = {
            id: "1",
            amount: 50,
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
            createdAt: new Date(),
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const result = await sut.execute(conversion)

        expect(result.conversion.convertedAmount).toBeCloseTo(80)
        expect(Number.isFinite(result.conversion.convertedAmount)).toBe(true)
    })

    it("should find conversion by user", async () => {
        const conversion = {
            id: "1",
            amount: 50,
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
            createdAt: yesterday,
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const conversion2 = {
            amount: 50,
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
            createdAt: ontem, 
            userId: "user-1",
            fromCurrencyId: "USD",
            toCurrencyId: "BRL"
        }

        const conversion2 = {
            id: "2",
            amount: 200,
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