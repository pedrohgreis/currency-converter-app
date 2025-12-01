import { UserRepository } from "@/repositories/prisma/userRepository";
import { UserRegisterUseCase } from "../useCases/registerUseCase";

export function makeRegisterUseCase(){
    const repository = new UserRepository()
    const useCase = new UserRegisterUseCase(repository)

    return useCase;
}