import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import { deleteUserUseCase } from "../useCases/deleteUserUseCase";


describe("Delete user", () => {
    let userRepository: InMemoryUsersRepository
    let sut:deleteUserUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new deleteUserUseCase(userRepository)
    })

    it("should compare the password", async () => {
        
        const registerUser = await userRepository.createUser({
            id: "1",
            name: "John",
            email: "john@gmail.com",
            password_hash: "123456"
        })

        const {user} = await sut.delete({
            userId: registerUser.id
        })


        expect(user.id).toBe(registerUser.id)
        expect(user.email).toBe("john@gmail.com")

        const deletedUser = await userRepository.findUserById(registerUser.id)
        expect(deletedUser).toBeNull()

    })

    it("should throw error when trying to delete non-existent user", async () => {
        await expect(
            sut.delete({ userId: "non-existent-id" })
        ).rejects.toThrow("User not found")
    })
})