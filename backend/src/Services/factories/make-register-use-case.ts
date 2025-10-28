import { userRepository } from "@/repositories/prisma/userRepository";
import { UserRegisterUseCase } from "../useCases/registerUseCase";

export function makeRegisterUseCase(){
    const repository = new userRepository()
    const useCase = new UserRegisterUseCase(repository)

    return useCase;
}