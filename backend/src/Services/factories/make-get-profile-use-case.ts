import { userRepository } from "@/repositories/prisma/userRepository";
import { userProfile } from "../useCases/userProfileUseCase";

export function makeGetUserProfileUseCase(){
    const userRepo = new userRepository()
    const useCase = new userProfile(userRepo)

    return useCase;
}