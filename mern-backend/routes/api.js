const express = require("express");
const router = express.Router();

// Middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} request at ${req.originalUrl} from ${req.ip}`);
  next();
};
router.use(timeLog);

// Define the home route
router.get('/', (req, res) => {
  res.json({ message: 'API home route' });
});

// Define the about route
router.get('/about', (req, res) => {
  res.json({ message: 'API about route' });
});

module.exports = router;
