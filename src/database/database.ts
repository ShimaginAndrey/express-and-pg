import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "password",
  database: "Task",
  port: 5432,
});
