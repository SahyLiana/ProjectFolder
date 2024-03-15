const CustomError = require("../errors/custom-error");
const { compareAsc, format } = require("date-fns");

const { Products, Earning } = require("../models/products");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const getAllProducts = async (req, res) => {
  const { featured, sort, category } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (category) {
    queryObject.category = category;
  }
  let result = Products.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }
  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

const getSingleProduct = async (req, res) => {
  // res.status(200).json({ msg: "Get Single Product" });
  const { id: productID } = req.params;
  const product = await Products.findOne({ _id: productID });
  if (!product) {
    throw new CustomError("Product not found", 401);
  }
  res.status(200).json({ product });
};

const makePayment = async (req, res) => {
  const myRequest = req.body;
  const date = new Date();
  let total = 0;
  //console.log(myRequest);
  console.log(`The number of element is ${myRequest.myCarts.length}`);
  console.log("The element are:");
  console.log(myRequest.myCarts);
  console.log("My details are:");
  console.log(myRequest.myDetails);
  console.log(`My transaction id is:${myRequest.transactionID}`);

  let myProduct = {
    name: "",
    price: 0,
    oldPrice: 0,
    category: "",
    image: "",
    nb: 0,
    indTotal: 0,
  };

  const myEarnings = [];

  for (let i = 0; i < myRequest.myCarts.length; i++) {
    // const myFormat = `${
    //   date.getMonth() + 1
    // }-${date.getDate()}-${date.getFullYear()}`;
    console.log(myRequest.myCarts[i].nb);
    console.log("Product request");
    console.log(myRequest.myCarts[i]);

    const myProductData = await Products.findOne({
      _id: myRequest.myCarts[i]._id,
    });
    console.log(`The product that i want is ${myProductData}`);
    if (Number(myProductData.quantity) < Number(myRequest.myCarts[i].nb)) {
      return res.status(401).json({ msg: "Products out of stock..." });
    }
    // console.log(myRequest.myCarts[i].indTotal);
    const {
      _id: productID,
      name,
      price,
      oldPrice,
      category,
      image,
      nb,
      indTotal,
    } = myRequest.myCarts[i];

    myProduct = {
      productID,
      name,
      price,
      //  date: myFormat,
      oldPrice,
      category,
      image,
      nb,
      indTotal,
      status: "Pending",
    };
    console.log("My product is:");
    console.log(myProduct);
    try {
      const updateQuantity = await Products.findOneAndUpdate(
        {
          _id: myProduct.productID,
        },
        {
          quantity: myProductData.quantity - myRequest.myCarts[i].nb,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log(`Updated product ${updateQuantity}`);
      myEarnings.push(myProduct);
    } catch (error) {
      throw new CustomError("An error occur", 401);
    }

    total = total + myRequest.myCarts[i].indTotal;
    // console.log(total);
  }
  myRequest.total = total;
  console.log(myRequest);

  try {
    // await Earning.deleteMany();
    let transactions = myEarnings;
    // const myFormat = `${
    //   date.getMonth() + 1
    // }-${date.getDate()}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // const insertEarnings = await Earning.create(myEarnings);
    const myFormat = format(new Date(date), "yyy-MM-dd 'at' h:mm:a");

    console.log("My transactions are");
    console.log(transactions);
    // const insertEarnings = await Earning.insertMany(transactions);

    let sum = 0;
    transactions.map((transaction) => {
      sum += transaction.indTotal;
    });
    const doc = new Earning({
      // transactions: [{ productID: transactions[0].productID }],
      date: myFormat,
      transactionID: myRequest.transactionID,
      total: sum,
      name: myRequest.myDetails.name,
      phone: myRequest.myDetails.phone,
      address: myRequest.myDetails.address,
      transactions: transactions.map((transaction) => {
        return { ...transaction, _id: transaction.productID };
      }),
    });
    const insertEarnings = await doc.save();
    console.log(insertEarnings);
    console.log("Success");
  } catch (error) {
    return res.status(500).json({ msg: error });
  }

  res.status(200).json({ msg: myRequest, total: total });
};

//Get data
//get quantity,
//set quantity,
//get product object

const Earnings = async (req, res) => {
  const { status, sorting } = req.query;
  const queryObject = {};

  if (status) {
    queryObject.status = status;
  }

  let result = Earning.find(queryObject);
  if (sorting) {
    result = result.sort(sorting);
  } else {
    result = result.sort("-date");
  }

  // result = Earning.find(queryObject).sort("-date");
  // const result = Earning.find(queryObject);
  // const myEarnings = await Earning.find({});
  const myEarnings = await result;

  const myTotalEarnings = await Earning.find({});
  console.log(myEarnings);
  res
    .status(200)
    .json({ nbHits: myTotalEarnings.length, myEarnings, myTotalEarnings });
};

const SingleOrder = async (req, res) => {
  const { id: orderID } = req.params;

  const findOrder = await Earning.findOne({ _id: orderID });
  if (!findOrder) {
    throw new CustomError("Order not Found...", 401);
  }
  res.status(200).json({ nbOrders: findOrder.transactions.length, findOrder });
};

const UpdateOrder = async (req, res) => {
  const { id: orderID } = req.params;
  const { status } = req.body;
  console.log(orderID);
  console.log(status);
  if (status === "Cancelled") {
    try {
      const cancelOrder = await Earning.findOne({ _id: orderID });
      console.log("Order cancel is");
      console.log(cancelOrder.transactions);
      const transactions = cancelOrder.transactions;
      for (let i = 0; i < transactions.length; i++) {
        const getProduct = await Products.findOne({ _id: transactions[i]._id });
        const updateProduct = await Products.findOneAndUpdate(
          { _id: transactions[i]._id },
          { quantity: getProduct.quantity + transactions[i].nb },
          { runValidators: true, new: true }
        );
        console.log(updateProduct);
      }
      await Earning.findOneAndUpdate(
        { _id: orderID },
        { status: status },
        { runValidators: true, new: true }
      );
      return res.status(200).json(cancelOrder.transactions);
    } catch (error) {
      throw new CustomError("Orderss not Found", 401);
    }
  } else {
    try {
      const updateOrder = await Earning.findOneAndUpdate(
        { _id: orderID },
        { status: status },
        {
          runValidators: true,
          new: true,
        }
      );
      console.log(updateOrder);
    } catch (error) {
      throw new CustomError("Order not Found", 401);
    }
  }

  // res.status(200).json("Update Order");
};

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimeType)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage: myStorage });

const UpdateProduct = async (req, res) => {
  const { id: productID } = req.params;
  console.log(productID);
  // res.status(200).json("Updated Product");
  // const { product } = req.body;

  // const {
  //   name,
  //   price,
  //   oldPrice,
  //   quantity,
  //   featured,
  //   category,
  //   image,
  //   description,
  // } = product;
  // console.log("The new product with image is:");
  // console.log(product);

  // console.log(req.file);
  // console.log(req.body);

  const product = { ...req.body };
  console.log("My product is");
  console.log(product);
  console.log(req.body);
  console.log(req.file);
  if (req.file?.filename) {
    product.image = `${req.file.filename}`;
  }
  //  product.image = `${req.file.filename}`;
  console.log(product);
  //  if (product.image) {
  // console.log("Image should be updated");
  let {
    name,
    price,
    oldPrice,
    quantity,
    featured,
    category,
    image,
    description,
  } = product;
  // } else {
  //   console.log("Image no need update");
  //   var { name, price, oldPrice, quantity, featured, category, description } =
  //     product;
  // }

  if (featured === "false") {
    featured = false;
  } else {
    featured = true;
  }

  if (oldPrice === "null") {
    oldPrice = null;
  } else {
    oldPrice = Number(oldPrice);
  }

  try {
    // console.log();
    let getProduct = {};
    if (image) {
      getProduct = await Products.findOneAndUpdate(
        { _id: productID },
        {
          name: name,
          price: Number(price),
          oldPrice: oldPrice,
          quantity: Number(quantity),
          featured: featured,
          category: category,
          image: image,
          description: description,
        },
        { new: true, runValidators: true }
      );
    }
    //In case the image is empty, that means no update or no file choosen
    else {
      getProduct = await Products.findOneAndUpdate(
        { _id: productID },
        {
          name: name,
          price: Number(price),
          oldPrice: oldPrice,
          quantity: Number(quantity),
          featured: featured,
          category: category,
          description: description,
        },
        { new: true, runValidators: true }
      );
    }
    const getProducts = await Products.findOneAndUpdate(
      { _id: productID },
      {
        name: name,
        price: Number(price),
        oldPrice: oldPrice,
        quantity: Number(quantity),
        featured: featured,
        category: category,
        image: image,
        description: description,
      },
      { new: true, runValidators: true }
    );
    console.log("The old product is");
    console.log(getProduct);
    console.log("The new product from the form is");
    console.log(getProducts);
  } catch (error) {
    throw new CustomError("Product not found...", 401);
  }

  res.status(200).json(`Update product of id ${productID}`);
};

const createProduct = async (req, res) => {
  const product = { ...req.body };
  console.log("My product is");
  product.image = `${req.file.filename}`;
  console.log(product);
  console.log(req.file);

  let { name, price, oldPrice, quantity, featured, category, description } =
    product;

  if (featured === "false" || featured === "undefined") {
    product.featured = false;
  } else {
    product.featured = true;
  }

  if (oldPrice === "null") {
    product.oldPrice = null;
  } else {
    product.oldPrice = Number(oldPrice);
  }

  product.price = Number(price);
  product.quantity = Number(quantity);

  console.log("My new product is:");
  console.log(product);

  try {
    const createProduct = await Products.create(product);
    return res.status(200).json(createProduct);
  } catch (error) {
    throw new CustomError("Bad request...", 401);
  }
  // res.status(200).json("Create a product");
};

const deleteProduct = async (req, res) => {
  // console.log("Deleted");
  const { id: productID } = req.params;

  try {
    const deleteProduct = await Products.findOneAndDelete({ _id: productID });
  } catch (error) {
    throw new CustomError("Product not found...", 401);
  }
  res.status(200).json("Delete product");
};

const getSingleTransaction = async (req, res) => {
  const { id: transactionID } = req.body;
  console.log(req.body);

  console.log(transactionID);

  const transaction = await Earning.find({ transactionID: transactionID });

  if (transaction.length === 0) {
    throw new CustomError("Oops!Transaction not Found...", 401);
  }

  res.status(200).json(transaction);
};

module.exports = {
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
};
