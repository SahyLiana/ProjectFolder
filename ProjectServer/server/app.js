const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const NotFound = require("./middleware/notFound");
const ErrorHandler = require("./middleware/errorHandler");
const routes = require("./routes/products");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/products/", express.static("images"));

app.use("/api/products/", routes);

const connectDB = require("./db/dbConnect");

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_DB);
    app.listen(port, console.log(`App is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

app.use(NotFound);
app.use(ErrorHandler);

start();
