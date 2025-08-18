import {Prisma, type User} from "../../generated/prisma";
import { userRepository } from "../prisma/userRepository";
import bycrypt from "bcryptjs"



export class InMemoryUsersRepository implements userRepository{
    public items:User[] = [];

    async findUserByEmail(email: string){
        const user = this.items.find((item) => item.email === email);
        return user ?? null;
    }

    async findUserById(id: string){
        const user = this.items.find((item) => item.id === id);
        return user ?? null;
    }

    async changePassword(id: string, newPassword: string){
        const user = this.items.find((item => item.id === id));

        if(!user){
            throw new Error("User not found");
        }

        const hashPassword = await bycrypt.hash(newPassword,12)
        user.password_hash = hashPassword

        return user;
    }

    async deleteUser(id: string){
        const index = this.items.findIndex((item) => item.id === id);
        
        if(!index){
            throw new Error("User not found")
        }

        const [deletedUser] = this.items.splice(index,1);

        if(!deletedUser){
            throw new Error("User not found after splice")
        }

        return deletedUser;
    }

    async createUser(data: Prisma.UserCreateInput){
        const user = {
            id: "user-1",
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            createdAt: data.createdAt instanceof Date
             ? data.createdAt
             : data.createdAt
                ? new Date(data.createdAt)
                : new Date()
        }

        this.items.push(user);

        return user;
    }


} 