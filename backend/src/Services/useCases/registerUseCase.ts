import type { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExist } from "../Errors/user-already-exists";
import bycrypt from "bcryptjs"
import { InvalidEmail } from "../Errors/invalid-email";


export class UserRegisterUseCase{
    constructor(private userRepository: InMemoryUsersRepository){}


    async register(data: {name: string, email: string, password: string}){
        
        const name = data.name.trim();
        const email = data.email.trim().toLowerCase();

        if (!email.includes("@")) throw new InvalidEmail();

        // verify if email exists
        const userEmail = await this.userRepository.findUserByEmail(email)

        if(userEmail){
            throw new UserAlreadyExist();
        }
        // Hash Password
        const password = await bycrypt.hash(data.password, 12);

        // Save in database
        const user = await this.userRepository.createUser({
            name: name,
            email: email,
            password_hash: password
        })

        return {user};
        
    }

}