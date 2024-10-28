
const mysql2 = require("mysql2");

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}).promise();

// const db = mysql2.createConnection({
//     host: "66.102.133.175",
//     user: "radoy812_blog",
//     password: "Radojko12345",
//     database: "radoy812_blog",
// }).promise();

module.exports = db;