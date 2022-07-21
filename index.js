const offerRouter = require("./routers/offers");
const users = require("./routers/users");
const auth = require("./routers/auth");
const vehicles = require("./routers/vehicles");
const stations = require("./routers/stations");
const reviews = require("./routers/reviews");
const reservations = require("./routers/reservations")
const support = require("./routers/support")
const express = require("express");
const payment = require("./routers/payment");
const reservationSummary = require("./routers/reservationSummary");
const jobPosting = require("./routers/jobPostings")
const jobApplication = require("./routers/jobApplications")

const app = express();

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.use(express.json({ limit: '50mb' }));

// Use routes here
app.use("/api/offers", offerRouter);
app.use("/api/users", users);
app.use("/api/support", support);
app.use("/api/auth", auth);
app.use("/api/vehicles", vehicles);
app.use("/api/stations", stations);
app.use("/api/reviews", reviews);
app.use("/api/reservations", reservations)
app.use("/api/payment", payment);
app.use("/api/reservationSummary", reservationSummary);
app.use("/api/postings", jobPosting)
app.use("/api/applications", jobApplication)

const port = process.env.PORT || 5000;

app.listen(port, console.log(`App Started on ${port} PORT`));
