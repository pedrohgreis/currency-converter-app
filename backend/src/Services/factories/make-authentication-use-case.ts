import { UserRepository } from "@/repositories/prisma/userRepository";
import { AuthenticateUseCase } from "../useCases/authenticationUseCase";

export function makeAuthenticationUseCase(){
    const repository = new UserRepository()
    const useCase = new AuthenticateUseCase(repository)

    return useCase;
}