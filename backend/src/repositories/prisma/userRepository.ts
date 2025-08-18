import { prisma } from "../../lib/prisma";
import {Prisma, type User} from "../../generated/prisma";
import type { UserInterface } from "../interfaces/userInterface";
import bycrypt from "bcryptjs"

export class userRepository implements UserInterface{
    async createUser(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
        })

        return user;
    }

    async findUserByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: { email },
        })

        return user;
    }

    async findUserById(id: string){
        const user = await prisma.user.findFirst({
            where:{ id },
        })

        return user;
    }

    async changePassword(id: string, newPassword: string){
        const hashedPassword = await bycrypt.hash(newPassword, 12);
        const changedPassword = await prisma.user.update({
            where: {id},
            data: {password_hash: hashedPassword}
        })

        return changedPassword;
    }

    async deleteUser(id: string){
        const user = await prisma.user.delete({
            where: { id }
        })

        return user;
    }
    
}
