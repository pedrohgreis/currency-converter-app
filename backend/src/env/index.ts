import { error } from 'console';
import 'dotenv/config'
import {z} from 'zod'

const schema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev')
})

const _env = schema.safeParse(process.env);

if(_env.success === false){
    console.error("Invalid");
    throw new Error("Invalid");
}

export const env = _env.data;