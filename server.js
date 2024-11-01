const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require('dotenv').config();
//PORT
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(PORT,'0.0.0.0', () => {
    console.log("Listening on port 3001 ............");
})