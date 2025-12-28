import express , {Request, Response} from 'express';
import dotenv from 'dotenv';
import redisClient, { connectRedis } from './config/redis';
import pool from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health',(req:Request,res:Response)=>{
    res.status(200).send('Server is healthy');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const startServer = async() => {
    try {
        await connectRedis();
        await pool.query("SELECT NOW()");
        app.listen(PORT, () => {
            console.log(`Server is live at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("Error starting server:", error); 
        process.exit(1);
    }
}

startServer();
