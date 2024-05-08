const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const User = require("./models/User");
const dotenv = require("dotenv").config();
const app = express();
const {PORT, MONGO_URI} = require('./constants')
const cors = require("cors"); 

const timeLog = require('./utils/timeLog');

// Bodyparser middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: true })); // enable origin cors


mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use(timeLog);

// Sample GET endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Sample POST endpoint
app.post('/', (req, res) => {
  res.send('Received a POST request');
});

// Define Express routes
app.use("/api", require("./routes/api"));
app.use("/auth", require("./routes/auth"));



// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));