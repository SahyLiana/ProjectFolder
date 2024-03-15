import React from "react";
import "./category.scss";
import Axios from "axios";

function Category({ category }) {
  const [nbProducts, setNbProducts] = React.useState(0);

  React.useEffect(() => {
    const getData = async () => {
      const product = await Axios.get("http://localhost:3000/api/products", {
        params: {
          category: category.name,
        },
      });

      const nbHits = product.data.nbHits;
      const myCategory = product.data.products[0].category;
      console.log(`Category is ${myCategory}`);
      console.log(`Nb of hits is ${nbHits}`);
      if (myCategory === category.name) {
        setNbProducts((prev) => nbHits);
      }
    };
    getData();
  }, [category.name]);
  return (
    <div className="card">
      <div className="containImg">
        <div
          className="image"
          style={{ backgroundImage: `url(${category.photo})` }}
        ></div>
      </div>
      <div className="content">
        <h2>{category.name}</h2>
        <p>{nbProducts} Products</p>
      </div>
    </div>
  );
}

export default Category;
