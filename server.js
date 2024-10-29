const express = require("express");
const routes = require("./routes");
//PORT
const PORT = process.env.PORT;
require('dotenv').config();

const app = express();

app.use(routes)

app.listen(PORT,'0.0.0.0', () => {
    console.log("Listening on port 3001 ............");
})