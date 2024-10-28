const express = require("express");
const routes = require("./routes");

const app = express();

require('dotenv').config();

app.use(routes)


app.listen(process.env.PORT, () => {
    console.log("Listening on port 3001 ............");
})