import React from "react";
import "./card.scss";
import { Link, useParams } from "react-router-dom";

function Card({ product }) {
  return (
    <div className="card-product" style={{ backgroundColor: "white" }}>
      <Link to={`/product/${product._id}`}>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(http://localhost:3000/products/${product.image}
          )`,
          }}
        >
          <div>
            {product.featured && <p className="sale">Sale!</p>}
            {product.quantity === 0 && <p className="stock">Out of stock!</p>}
          </div>
        </div>
        <div className="card-desc">
          <h1>{product.name}</h1>
          <p>
            <span style={{ textDecoration: "line-through", color: "orange" }}>
              {product.oldPrice !== null && `$${product.oldPrice}`}
            </span>
            <span className="price">${product.price}</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
