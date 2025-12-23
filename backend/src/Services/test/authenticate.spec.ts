import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs"
import { AuthenticateUseCase } from "../useCases/authenticationUseCase";
import { InvalidCredentialsError } from "../Error/invalid-credential-error";


describe("Register user", () => {
    let userRepository: InMemoryUsersRepository
    let sut:AuthenticateUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(userRepository);
    })

    it("should authenticase a user", async () => {
        
        await userRepository.createUser({
            name: "John",
            email: "john@gmail.com",
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: "john@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it("should not authenticase a user with wrong email", async () => {
            
        await userRepository.createUser({
            name: "John",
            email: "john@gmail.com",
            password_hash: await hash('123456', 6)
        })
    
        expect(sut.execute({
            email: "jon@gmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    })


    it("should not authenticase a user with wrong password", async () => {
            
        await userRepository.createUser({
            name: "John",
            email: "john@gmail.com",
            password_hash: await hash('123456', 6)
        })
    
        expect(sut.execute({
            email: "john@gmail.com",
            password: "123457"
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    })
    
})