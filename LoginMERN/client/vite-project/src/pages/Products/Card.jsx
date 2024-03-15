import React from "react";
import { Link } from "react-router-dom";
import "./card.scss";
import { FiEdit2 } from "react-icons/Fi";
import { AiTwotoneDelete } from "react-icons/Ai";
import Axios from "axios";
import { useSnackbar, enqueueSnackbar } from "notistack";

function Card({ product, products, setProducts }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  const id = product._id;

  const deleteProduct = async () => {
    try {
      const deletedProduct = await Axios.delete(
        `http://localhost:3000/api/products/delete/${product._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (deletedProduct) {
        setProducts((prev) => [
          ...products.filter((myproduct) => myproduct._id !== id),
        ]);
      }
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Some error occur...", { variant: "error" });
    }
  };

  return (
    <div className="card">
      <Link to={`/viewproduct/${product._id}`}>
        <img
          src={`http://localhost:3000/products/${product.image}`}
          className="card-image"
        />
        {!product.quantity && <p className="stock">Out of stock!</p>}

        <p className="name">{product.name}</p>
        <p className="price">
          ${product.price}{" "}
          {product.oldPrice && (
            <span className="oldPrice">${product.oldPrice}</span>
          )}
        </p>
      </Link>
      <div className="product-footer">
        <Link to={`/product/${product._id}`} className="btn">
          <span className="icons">
            <FiEdit2 />
          </span>
          Edit
        </Link>
        <button onClick={() => deleteProduct()} className="btn delete">
          <span className="icons">
            <AiTwotoneDelete />
          </span>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
