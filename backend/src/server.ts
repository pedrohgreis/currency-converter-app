import { app } from './app'
import { env } from './env';

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running on port ${env.PORT}`);  
}).catch(() => {
    throw new Error("Server is not running");
})