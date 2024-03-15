import React from "react";
import Card from "../featured/Card";
import "./productList.scss";
// const Card = React.lazy(() => import("../featured/Card"));

function ProductList({ productsData }) {
  //   console.log(productsData);
  const displayedCard =
    productsData.length > 0 ? (
      productsData.map((product, index) => {
        return (
          // <React.Suspense>
          <Card key={index} product={product} />
          // {/* </React.Suspense> */}
        );
      })
    ) : (
      <h1>Not items...</h1>
    );
  return <div className="product-list">{displayedCard}</div>;
}

export default ProductList;
