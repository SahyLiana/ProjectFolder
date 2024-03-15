import React, { Fragment } from "react";
import "./product.scss";
import Axios from "axios";
import {
  useParams,
  useLocation,
  Link,
  useOutletContext,
} from "react-router-dom";
import { useSnackbar, enqueueSnackbar } from "notistack";

function Product() {
  const [
    home,
    categories,
    featured,
    whyUs,
    cartElts,
    setCartElts,
    product,
    setProduct,
    // total,
    // setTotal,
  ] = useOutletContext();
  const { id } = useParams();
  const [error, setError] = React.useState(null);
  // const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState({ quantity: 0 });
  const [displayQty, setDisplayQty] = React.useState(0);
  // const [newCart, setNewCart] = React.useState({});
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // console.log(location);
  // console.log(`There are ${cartElts.length} elements(Product)`);
  // console.log(product);

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const product = await Axios.get(
          `http://localhost:3000/api/products/product/${id}`
        );
        // console.log(product.data.product);
        setError(null);
        setProduct((prevProduct) => ({ ...product.data.product }));
      } catch (error) {
        // console.log(error.response.data.msg);
        setError(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuantity((prevQty) => ({ ...prevQty, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quantity.quantity);
    if (quantity.quantity > 0) {
      console.log(`Quantity is ${quantity.quantity}`);
      console.log(product);
      product.nb = Number(quantity.quantity);
      // setProduct((prevProduct) => ({ ...prevProduct, nb: quantity.quantity }));
      setProduct(product);
      console.log("After:");
      console.log(product.nb);
      product.indTotal = product.price * product.nb;

      let productArray = [];
      productArray.push(product);
      // console.log("Carts elts");
      // console.log(cartElts[0]);ouput was an object

      function addCart(cartElts, product) {
        let myArray = cartElts;
        for (let i = 0; i < cartElts.length; i++) {
          if (cartElts[i]._id === product._id && cartElts[i].nb) {
            // console.log("equal");
            cartElts[i].nb = product.nb;
            cartElts[i].indTotal = cartElts[i].nb * cartElts[i].price;
            // myArray.push(cartElts[i]);
            console.log(
              "CartElts quantity inside function is " + cartElts[i].nb
            );
            myArray[i] = cartElts[i];
            // console.log(myArray[i]);
            // setTotal(
            //   (prevTotal) => prevTotal + myArray[i].price * myArray[i].nb
            // );
            return myArray;
          } else {
            // console.log("Not equal");
            let myBool = 0;
            for (let j = 0; j < cartElts.length; j++) {
              if (cartElts[j]._id === product._id) {
                myBool = 1;
                break;
              }
            }
            if (myBool === 1) {
              continue;
            }
            if (myBool === 0) {
              myArray.push(product);
            }

            // console.log(myArray);
            // setTotal(
            //   (prevTotal) => prevTotal + myArray[j].price * myArray[i].nb
            // );
            return myArray;
          }
        }

        // console.log(myArray);
        // return myArray;
      }

      //  const testAr = addCart(cartElts, product);
      //console.log(`Test is :${testAr}`);
      // console.log(`The array elements is ${cartElts.length}`);

      const myCarts =
        cartElts.length === 0 ? productArray : addCart(cartElts, product);
      console.log(myCarts);

      setCartElts((prevCarts) => [...myCarts]);
      console.log(`My cart is:`);
      console.log(myCarts);

      // setCartElts((prevCart) => myCarts);
      console.log(myCarts[myCarts.length - 1]);
      enqueueSnackbar("Product added to cart", {
        variant: "success",
        action: (key) => (
          <Fragment>
            <button
              style={{
                color: "white",
                border: "0.5px white solid",
                backgroundColor: "transparent",
              }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              x
            </button>
          </Fragment>
        ),
      });
    } else {
      enqueueSnackbar("Please input the number of product", {
        variant: "error",
        action: (key) => (
          <Fragment>
            <button
              style={{
                color: "white",
                border: "0.5px white solid",
                backgroundColor: "transparent",
              }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              x
            </button>
          </Fragment>
        ),
      });
      // const key = enqueueSnackbar("Please input the number of product", {
      //   // onClick: () => {
      //   //   closeSnackbar(key);
      //   // },
      //   variant: "error",
      // });
      //   enqueueSnackbar("Please input the number of product", {
      //     variant: "error",
      //     action: (key) => (
      //       <Fragment>
      //         <Button
      //           size="small"
      //           onClick={() =>
      //             alert(`Clicked on action of snackbar with id: ${key}`)
      //           }
      //         >
      //           Detail
      //         </Button>
      //         <Button size="small" onClick={() => closeSnackbar(key)}>
      //           Dismiss
      //         </Button>
      //       </Fragment>
      //     ),
      //   });
    }

    setDisplayQty(quantity.quantity);
    // console.log(product);
  };

  // const addCart = () => {
  //   if (quantity.quantity > 0) {
  //     setProduct((prevProduct) => ({ ...prevProduct, quantity }));
  //   }

  //   // setCartElts((prevCart) => [...prevCart, product]);
  // };

  //console.log(quantity.quantity);

  return loading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1 style={{ textAlign: "center", fontSize: "50px" }}>{error}...</h1>
  ) : (
    <div className="container">
      <div className="product-image">
        <img
          className="img"
          src={`http://localhost:3000/products/${product.image}`}
        />
      </div>

      <form onSubmit={handleSubmit} method="POST" className="product-content">
        <p className="product-header">
          Home / {product.category} / {product.name}
        </p>
        <p className="product-category">{product.category}</p>
        <h1 className="product-name">{product.name}</h1>
        <h2 className="product-price">
          <span className="price">${product.price}</span> +Free Shipping
        </h2>
        <p className="product-desc">{product.description}</p>
        <div className="myForm">
          <input
            value={quantity.quantity}
            onChange={handleChange}
            type="number"
            name="quantity"
            disabled={product.quantity === 0}
            min={0}
          />
          <button
            disabled={product.quantity === 0}
            className={`button ${product.quantity === 0 && "disabled"}`}
          >
            {product.quantity === 0 ? "OUT OF STOCK..." : "ADD TO CART"}
          </button>
        </div>
        <Link
          to=".."
          style={{
            marginTop: "10px",
            display: "block",
            width: "fit-Content",
            color: "gray",
          }}
        >
          &larr;Back
        </Link>
        <p style={{ marginTop: "40px" }}>Category:{product.category}</p>
        <p>{displayQty}</p>
      </form>
    </div>
  );
}

export default Product;
