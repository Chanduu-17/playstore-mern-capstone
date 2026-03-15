const app = require('../src/app');
const connectDB = require('../src/config/db');

let cachedDB = null;

module.exports = async (req, res) => {
  if (!cachedDB) {
    try {
      await connectDB();
      cachedDB = true;
    } catch (err) {
      console.error("Database connection failed:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return app(req, res);
};
