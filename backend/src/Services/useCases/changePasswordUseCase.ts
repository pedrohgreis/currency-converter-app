import type { UserInterface } from "@/repositories/interfaces/userInterface";
import bcrypt from "bcryptjs";
import { UserNotFound } from "../Errors/user-not-foud";

export class ChangePasswordUseCase{
    constructor(private userRepository: UserInterface){}

    async execute(id: string, newPassword: string){

        const user = await this.userRepository.findUserById(id)

        if(!user) throw new UserNotFound()

        //hash password
        const hashedPassword = await bcrypt.hash(newPassword,12)

        //Updating password
        const updatedPassword = await this.userRepository.changePassword(id,hashedPassword)

        return updatedPassword;
    }
}