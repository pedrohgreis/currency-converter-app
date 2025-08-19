import {describe, it, expect, beforeEach} from "vitest";
import { UserRegisterUseCase } from "../useCases/registerUseCase";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import bycrypt from "bcryptjs"
import { InvalidEmail } from "../Errors/invalid-email";
import { UserAlreadyExist } from "../Errors/user-already-exists";

describe("Register user", () => {
    let userRepository: InMemoryUsersRepository
    let sut:UserRegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new UserRegisterUseCase(userRepository);
    })

    it("should create a user", async () => {
        
        const user = {
            name: "Jhon",
            email: "jhon@gmail.com",
            password: "12345"
        }

        const result = await sut.register(user);

        const isValid = await bycrypt.compare(user.password, result.user.password_hash);

        expect(isValid).toBe(true);

        expect(result.user).toMatchObject({
            name: user.name,
            email: user.email,
        })
    })

    it("should verify if it's a valid email", async () => {
        const user = {
            name: "Jhon",
            email: "jhongmail.com",
            password: "12345"
        }

        // Verify if invalid email
        await expect(() => sut.register(user)).rejects.toThrow(InvalidEmail)
    })


    it("should verify if email already exist", async () => {
        const user1 = {
            name: "Jhon",
            email: "jhon@gmail.com",
            password: "12345"
        }

        const user2 = {
            name: "Jhon",
            email: "jhon@gmail.com",
            password: "12345"
        }

        expect(await sut.register(user1)).toMatchObject({
            user: {
                name: user1.name,
                email: user1.email,
            }
        })

        await expect(sut.register(user2)).rejects.toBeInstanceOf(UserAlreadyExist);

    })
})