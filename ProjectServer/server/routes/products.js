const express = require("express");
const authentications = require("../middleware/auth");
//const { Products } = require("../models/products");

const {
  getAllProducts,
  getSingleProduct,
  makePayment,
  Earnings,
  SingleOrder,
  UpdateProduct,
  UpdateOrder,
  createProduct,
  deleteProduct,
  getSingleTransaction,
  upload,
} = require("../controllers/products");
const routes = express.Router();

// const upload = multer({ dest: "images/" });

routes.route("/").get(getAllProducts);
routes.route("/earnings").get(authentications, Earnings);
routes.route("/payments").patch(makePayment);
routes.route("/product/:id").get(getSingleProduct);
routes.route("/order/:id").get(authentications, SingleOrder);
routes.route("/order/:id").patch(authentications, UpdateOrder);
routes.route("/delete/:id").delete(authentications, deleteProduct);
routes.route("/transaction").post(getSingleTransaction);
routes
  .route("/create")
  .post(authentications, upload.single("image"), createProduct);
// routes
//   .route("/update/:id")
//   .patch(authentications, (upload.single("photo"), UpdateProduct));
routes
  .route("/update/:id")
  .post(authentications, upload.single("image"), UpdateProduct);

module.exports = routes;
