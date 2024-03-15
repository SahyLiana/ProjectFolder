import React from "react";
import "./product.scss";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

function ViewProduct() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { id: productID } = useParams();
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const product = await Axios.get(
          `http://localhost:3000/api/products/product/${productID}`
        );
        // console.log(product.data.product);
        setError(null);
        setProduct((prevProduct) => ({ ...product.data.product }));
      } catch (error) {
        // console.log(error.response.data.msg);
        setError(error.response.data.msg);
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productID]);

  return (
    <div className="view-product">
      {/* <h1>Product:{product._id}</h1> */}
      {loading ? (
        <h1 style={{ color: "black" }}>Loading...</h1>
      ) : (
        <>
          {" "}
          <h1>Single product details</h1>
          <div className="container-view">
            <img
              className="product-img"
              src={`http://localhost:3000/products/${product.image}`}
            />
            <div className="container-content">
              <h1>{product.name}</h1>
              <p className="price-details">
                {product.oldPrice && (
                  <span className="old-price">${product.oldPrice}</span>
                )}{" "}
                ${product.price}
              </p>
              <p className="stock-details">
                {!product.quantity ? (
                  <span className="stock-out">Out of stock</span>
                ) : (
                  `${product.quantity} in stock`
                )}
              </p>
              <h2>Descriptions:</h2>
              <p className="description">{product.description}</p>
              <p>
                <span style={{ fontWeight: "bold" }}>ID:</span>
                <span className="product-id">{product._id}</span>
              </p>
              <p className="category">
                Category:
                <Link to={`/products/${product.category}`}>
                  {product.category}
                </Link>
              </p>
            </div>
          </div>
          <Link to="/products/All" className="btn-back">
            Back
          </Link>
        </>
      )}
    </div>
  );
}

export default ViewProduct;
