const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
// Route imports
const user = require("./routes/userRoutes");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");
// parsing the body to json format
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// route middlewares
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middlewares for errors
app.use(ErrorMiddleware);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

module.exports = app;
