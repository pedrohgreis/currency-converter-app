import type { User } from "@/generated/prisma";
import type { UserRepository } from "@/repositories/prisma/userRepository";
import { UserNotFound } from "../Error/user-not-foud";

 interface GetUserProfileUseCaseRequest{
    userId: string;
 }
 
 interface GetUserProfileUseCaseResponse{
     user: User,
 }

 export class userProfile{
    constructor(
        private userRepository: UserRepository
    ){}

    async execute({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const user = await this.userRepository.findUserById(userId);

        if(!user) throw new UserNotFound()

        return{
            user,
        }
    }
 }