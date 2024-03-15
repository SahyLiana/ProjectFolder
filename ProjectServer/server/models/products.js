const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
  },
  oldPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: {
      values: ["Phones", "Computers", "Others"],
      message: "{VALUE} is not supported",
    },
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
});

const myEarnings = new mongoose.Schema({
  // productID: {
  //   type: String,
  // },
  // name: {
  //   type: String,
  // },
  // price: {
  //   type: Number,
  // },
  // date: {
  //   type: String,
  // },
  // oldPrice: {
  //   type: Number,
  // },
  // category: {
  //   type: String,
  // },
  // image: {
  //   type: String,
  // },
  // nb: {
  //   type: Number,
  // },
  // indTotal: {
  //   type: Number,
  // },
  // status: {
  //   type: String,
  //   default: "Pending",
  // },
  transactions: [
    {
      // productID: {
      //   type: String,
      // },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },

      oldPrice: {
        type: Number,
      },
      category: {
        type: String,
      },
      image: {
        type: String,
      },
      nb: {
        type: Number,
      },
      indTotal: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: String,
  },
  total: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  transactionID: {
    type: String,
  },
});

const Products = mongoose.model("Products", productsSchema);
const Earning = mongoose.model("Earnings", myEarnings);

module.exports = { Products, Earning };
