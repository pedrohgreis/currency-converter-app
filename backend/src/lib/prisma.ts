import {env} from '../env';
import { PrismaClient } from '../generated/prisma';

/* Configura o Prisma para mostrar no console todas as queries SQL executadas, mas só se o ambiente for dev.
Assim, você pode usar Prisma para fazer consultas, inserções, atualizações e exclusões no banco de 
dados de forma segura e tipada.
*/
export const prisma = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query']: [],
})