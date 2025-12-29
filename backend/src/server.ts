import { app } from './app'
import { env } from './env';

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Server running on port ${env.PORT}`);  
}).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
})