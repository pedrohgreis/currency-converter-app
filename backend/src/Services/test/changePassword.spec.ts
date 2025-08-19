import {describe, it, expect, beforeEach} from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-user-repository";
import bycrypt from "bcryptjs"
import { ChangePasswordUseCase } from "../useCases/changePasswordUseCase";

describe("Register user", () => {
    let userRepository: InMemoryUsersRepository
    let sut:ChangePasswordUseCase

    beforeEach(() => {
        userRepository = new InMemoryUsersRepository();
        sut = new ChangePasswordUseCase(userRepository);
    })

    it("should change the password", async () => {
        
         const user = await userRepository.createUser({
            name: "Jhon",
            email: "jhon@gmail.com",
            password_hash: "12345",
            createdAt: new Date()
        });


        await sut.execute(user.id, "newpassword");

        const updatedUser = await userRepository.findUserById(user.id)

        expect(updatedUser).toBeDefined();
        expect(updatedUser?.password_hash).toBeDefined();

        if (!updatedUser) {
            throw new Error("User not found");
        }

        const isValid = await bycrypt.compare("newpassword", updatedUser.password_hash);
        expect(isValid).toBe(true);
        
    })
})