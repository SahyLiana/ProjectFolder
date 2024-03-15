import React from "react";
import "./product.scss";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useSnackbar, enqueueSnackbar } from "notistack";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const getProductFunction = async () => {
      setLoading(true);
      try {
        const getProduct = await Axios.get(
          `http://localhost:3000/api/products/product/${id}`
        );
        console.log(getProduct.data.product);
        setProduct((prev) => ({ ...prev, ...getProduct.data.product }));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getProductFunction();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleImage = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted");
    console.log(product);

    if (product.featured === true && product.oldPrice === 0) {
      enqueueSnackbar("A featured product should have an old price...", {
        variant: "error",
      });
    } else if (
      Number(product.quantity) < 0 ||
      Number(product.price) < 0 ||
      Number(product.oldPrice) < 0
    ) {
      enqueueSnackbar("Number should be positive", { variant: "warning" });
    } else {
      // console.log(product);
      setSubmitLoading(true);
      console.log("The product I want to submit is:");
      console.log(product);

      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("featured", product.featured);
      // if (product.image) {
      formData.append("image", product.image);
      // }

      formData.append("oldPrice", product.oldPrice);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      try {
        const updateProduct = await Axios.post(
          `http://localhost:3000/api/products/update/${id}`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        enqueueSnackbar("Product updated successfully", { variant: "success" });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("An error occur...", { variant: "error" });
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  // console.log("My product is");
  // console.log(product);
  return (
    <div className="single-product-container">
      <h1>Header</h1>
      {!loading ? (
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="content"
          encType="multipart/form-data"
        >
          <p>
            Product ID:
            <span style={{ color: "gray", fontWeight: "bold" }}>
              {product._id}
            </span>
          </p>
          <label htmlFor="name">Product name:</label>
          <input
            value={product.name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            onChange={handleChange}
            min={0}
            name="quantity"
            id="quantity"
            value={product.quantity}
          />
          <label htmlFor="category">Select category:</label>
          <select
            onChange={handleChange}
            name="category"
            id="category"
            defaultValue={product.category}
          >
            <option value="Phones">Phones</option>
            <option value="Computers">Computers</option>
            <option value="Others">Others</option>
          </select>
          <label htmlFor="image">Select image</label>
          <input
            type="file"
            name="image"
            // id="image"
            accept=".png,.jpg,.jpeg"
            onChange={handleImage}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            min={0}
            onChange={handleChange}
            name="price"
            id="price"
            value={product.price}
          />
          <label style={{ fontSize: "15px" }} htmlFor="featured">
            Is featured?
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={product.featured}
              onChange={handleChange}
            />
          </label>
          {product.featured === true ? (
            <>
              <label htmlFor="oldPrice">Old Price:</label>
              <input
                type="number"
                id="oldPrice"
                name="oldPrice"
                value={product.oldPrice === null ? 0 : product.oldPrice}
                onChange={handleChange}
              />
            </>
          ) : (
            (product.oldPrice = null)
          )}
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            placeholder="Description here"
            onChange={handleChange}
            rows={5}
          />
          <button className={`${submitLoading && "load"}`}>
            {submitLoading ? "Submitting..." : "Update"}
          </button>
        </form>
      ) : (
        <h1 style={{ color: "black" }}>Loading</h1>
      )}

      {/* <div className="content">
         <label htmlFor="name">Product name:</label>
         <input type="text" name="name" id="name" />
         <label htmlFor="quantity">Quantity:</label>
         <input type="number" name="quantity" id="quantity" />
         <label htmlFor="category">Select category:</label>
        
        <select name="category" id="category" defaultValue="">
           <option value="Phones">Phones</option>
           <option value="Computers">Computers</option>
           <option value="Others">Others</option>
          
        </select>
        
      </div> */}
    </div>
  );
}

export default Product;
