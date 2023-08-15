import pgPromise from "pg-promise"
import dotenv from 'dotenv';


dotenv.config();
const pgp = pgPromise()
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/my_products_tests";

const db = pgp(connectionString);
