const app = require("./app");
const { connectDatabase } = require("./db/conn.js");
const cloudinary = require("cloudinary");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// connecting database
connectDatabase();
console.log(process.env.PORT);

// setting up cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 4004;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(
    `Shutting down the server due to Promise unhandled rejections...`
  );

  server.close(() => {
    process.exit(1);
  });
});
