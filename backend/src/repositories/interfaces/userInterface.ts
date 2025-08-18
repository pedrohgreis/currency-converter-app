import {Prisma, type User} from '@/generated/prisma'

export interface UserInterface{
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findUserByEmail(email:string): Promise<User | null>;
    findUserById(id:string): Promise<User | null>;

    changePassword(id:string, newPassword:string): Promise<User>

    deleteUser(ide:string): Promise<User>
}