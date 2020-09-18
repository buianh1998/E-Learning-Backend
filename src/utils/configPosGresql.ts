import { Pool, Client } from "pg";
import dotenv from "dotenv";
dotenv.config();
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: Number(PGPORT),
});
export const connectPostGres = () => {
  pool.connect((err) => {
    if (err) return console.log(`connect to postgres error: ${err}`);
    console.log(`Connect to postgres successfully`);
  });
};

export default pool;
