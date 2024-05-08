const timeLog = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} request at ${req.originalUrl} from ${req.ip}`);
    next();
  };

module.exports = timeLog;