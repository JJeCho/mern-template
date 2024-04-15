const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});