const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongoose.connect()-> returns a promise which is handled using .then()
const connectDatabase = () => {
  console.log(process.env.DB_URI)
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = { connectDatabase };