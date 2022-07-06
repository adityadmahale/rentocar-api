const express = require("express");

const app = express();

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.use(express.json());

// Use routes here

const port = process.env.PORT || 3000;

app.listen(port, console.log("App Started"));
