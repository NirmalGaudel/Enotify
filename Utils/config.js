require("dotenv").config();
module.exports = {
  HOST:process.env.HOST || "http://localhost",
  PORT : process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URI:process.env.DB_URI,
  NODE_ENV:process.env.NODE_ENV||"development"
}