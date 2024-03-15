const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/dbConnect");
const login = require("./routes/login");
const update = require("./routes/users");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/admin/", login);
app.use("/api/admin/update", update);

const port = process.env.PORT_ADMIN || 5000;
const db = process.env.CONNECT_DB_ADMIN;

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(db);
    app.listen(port, console.log(`App is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
