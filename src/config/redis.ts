import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Redis Client Connected Successfully");
});

redisClient.on("error", (error) => {
    console.log("Redis Client Connection Error", error);
    process.exit(-1);
});

export const connectRedis = async () => {
    await redisClient.connect();
    return redisClient;
};  

export default redisClient;