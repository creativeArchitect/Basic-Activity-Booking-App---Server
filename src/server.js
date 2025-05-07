const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const activitiesRouter = require("./routes/activities");
const bookingsRouter = require("./routes/bookings");

app.use("/api/auth", authRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/bookings", bookingsRouter);
app.get('/', (req, res)=>{
  res.send("Welcome to Activity Booking APP");
})


app.get('/', (req, res)=>{
  res.send("Welcome to Activity Booking APP");
})

connectDB()
  .then(() => {
    console.log("Database connected successfully...");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is listening on PORT " + (process.env.PORT || 3000));
    });
  })
  .catch((err) => {
    console.error("ERROR: " + err);
  });

  module.exports = app;