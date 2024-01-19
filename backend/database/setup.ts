// import { Client } from 'pg';
// import * as dotenv from "dotenv";
// dotenv.config({});
// require('dotenv').config();
const pg = require("pg");

let DB_NAME = process.env.DB_NAME || "postgres";
let DB_USER = process.env.DB_USER || "postgres";
let DB_HOST = process.env.DB_HOST || "localhost";
let DB_PASSWORD = process.env.DB_PASSWORD || "postgres";

console.log("DB_NAME", DB_NAME)
console.log("DB_USER", DB_USER)
console.log("DB_HOST", DB_HOST)
console.log("DB_PASSWORD", DB_PASSWORD)

async function setupDatabase() {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev)
    return console.log(
      "in production environment - skipping database creation."
    );

  const client = new pg.Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: 5432,
  });

  console.log("client", client)
  await client.connect();

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`
  );


  if (res.rowCount === 0) {
    console.log(`${DB_NAME} database not found, creating it.`);
    await client.query(`CREATE DATABASE "${DB_NAME}";`);
    console.log(`created database ${DB_NAME}.`);
  } else {
    console.log(`${DB_NAME} database already exists.`);
  }

  await client.end();
}

setupDatabase();
