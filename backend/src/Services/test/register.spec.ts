import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { compare } from "bcryptjs";
import { UserRegisterUseCase } from "../useCases/registerUseCase";
import { UserAlreadyExist } from "../Error/user-already-exists";



describe("Register user", () => {
    let userRepository: InMemoryUsersRepository
    let sut:UserRegisterUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new UserRegisterUseCase(userRepository);
    })

    it("should compare the password", async () => {
        
        const { user } = await sut.register({
            name: "John",
            email: "john@gmail.com",
            password: '123456'
        })

        const isPasswordValid = await compare('123456', user.password_hash)

        expect(isPasswordValid).toBe(true)
    })


    it("should nor register twice with same e-mail", async () => {
        const email = "john@gmail.com";
        
        await sut.register({
            name: "John",
            email: email,
            password: '123456'
        })

        await expect(
            sut.register({
                name: "John",
                email: email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExist)
    })


    it("should not register twice with same e-mail", async () => {
        const email = "john@gmail.com";
        
        await sut.register({
            name: "John",
            email: email,
            password: '123456'
        })

        await expect(
            sut.register({
                name: "John",
                email: email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExist)
    })

    it("should be able to register", async () => {
        const email = "john@gmail.com";
        
        const {user} = await sut.register({
            name: "John",
            email: email,
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

})