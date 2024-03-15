import React from "react";
import Card from "./Card";
import "./productList.scss";

function ProductList({ productsData, setProducts, products }) {
  const displayedCard =
    productsData.length > 0 ? (
      productsData.map((product, index) => {
        return (
          <Card
            products={products}
            product={product}
            setProducts={setProducts}
            key={index}
          />
        );
      })
    ) : (
      <h1>No items</h1>
    );
  return <div className="productList-container">{displayedCard}</div>;
}

export default ProductList;
