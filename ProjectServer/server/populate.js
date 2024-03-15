require("dotenv").config();

const connectDB = require("./db/dbConnect");
const Product = require("./models/products");

const jsonProducts = require("./jsProducts.json");

const start = async () => {
  try {
    await connectDB(process.env.CONNECT_DB);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
