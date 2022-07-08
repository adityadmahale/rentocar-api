const offerRouter = require("./routers/offers");
const users = require("./routers/users");
const auth = require("./routers/auth");
const vehicles = require("./routers/vehicles");
const express = require("express");

const app = express();

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.use(express.json());

// Use routes here
app.use("/api/offers", offerRouter);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/vehicles", vehicles);

const port = process.env.PORT || 3000;

app.listen(port, console.log("App Started"));
