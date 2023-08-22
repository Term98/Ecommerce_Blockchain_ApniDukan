require("dotenv").config({ path: "../.env" });

module.exports = {
  DB_URI: process.env.DB_URI,
  user: process.env.user,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  refreshToken: process.env.refreshToken,
};
