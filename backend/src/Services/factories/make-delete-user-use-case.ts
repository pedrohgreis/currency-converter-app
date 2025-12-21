import { UserRepository } from "@/repositories/prisma/userRepository"
import { deleteUserUseCase } from "../useCases/deleteUserUseCase"

export function makeDeleteUserUseCase(){
    const repository = new UserRepository()
    const useCase = new deleteUserUseCase(repository)

    return useCase;
}