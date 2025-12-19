import { UserRepository } from "@/repositories/prisma/userRepository";
import { userProfile } from "../useCases/userProfileUseCase";

export function makeGetUserProfileUseCase(){
    const userRepo = new UserRepository()
    const useCase = new userProfile(userRepo)

    return useCase;
}