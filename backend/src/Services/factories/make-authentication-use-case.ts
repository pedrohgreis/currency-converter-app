import { userRepository } from "@/repositories/prisma/userRepository";
import { AuthenticateUseCase } from "../useCases/authenticationUseCase";

export function makeAuthenticationUseCase(){
    const repository = new userRepository()
    const useCase = new AuthenticateUseCase(repository)

    return useCase;
}