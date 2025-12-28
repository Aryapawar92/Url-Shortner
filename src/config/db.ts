import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

pool.on("connect", () => {
    console.log("Postgres Database Connected Successfully");
})

pool.on("error",(error)=>{
    console.log("Postgres Database Connection Error", error);
    process.exit(-1);
})

export default pool;