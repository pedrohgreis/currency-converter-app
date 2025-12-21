import type { User } from "@/generated/prisma";
import type { UserRepository } from "@/repositories/prisma/userRepository";

interface GetUserProfileUseCaseRequest{
    userId: string;
}
 
interface GetUserProfileUseCaseResponse{
    user: User,
}


export class deleteUserUseCase{
    constructor(private userRepository: UserRepository){}

    async delete({userId}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        const user = await this.userRepository.deleteUser(userId)

        if(!userId){
            throw new Error("User not deleted")
        }
        return { user }
    }
}


