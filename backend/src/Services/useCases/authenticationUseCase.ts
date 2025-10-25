import type { User } from "@/generated/prisma";
import type { UserInterface } from "@/repositories/interfaces/userInterface";
// Do not reveal whether email exists — use InvalidCredentialsError for both cases
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../Error/invalid-credential-error";

interface AuthenticateUseCaseRequest{
    email:string,
    password: string
}

interface AuthenticateUseCaseResponse{
    user: User,
}


export class AuthenticateUseCase{
    constructor(
        private userRepository: UserInterface
    ) {}

    async execute({email, password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{

        // finding email in db
        const user = await this.userRepository.findUserByEmail(email);
        
        // do not disclose whether the email exists — always return invalid credentials
        if(!user) throw new InvalidCredentialsError();

        // verifying password
        const passwordExist = await compare(password, user.password_hash)

        if(!passwordExist) throw new InvalidCredentialsError()

        return {
            user
        }
    }
}