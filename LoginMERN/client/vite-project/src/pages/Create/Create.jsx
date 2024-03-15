import React from "react";
import "./create.scss";
import "../Product/product.scss";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useSnackbar, enqueueSnackbar } from "notistack";

function Create() {
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const token = localStorage.getItem("token");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [product, setProduct] = React.useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.featured && !Number(product.oldPrice)) {
      enqueueSnackbar("A featured product should have a price", {
        variant: "warning",
      });
    } else if (
      Number(product.oldPrice) < 0 ||
      Number(product.price) < 0 ||
      Number(product.quantity) < 0
    ) {
      enqueueSnackbar("Number should be positive", { variant: "warning" });
    } else {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("featured", product.featured);
      formData.append("image", product.image);
      formData.append("oldPrice", product.oldPrice);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);

      //   console.log(formData.get("image"));

      try {
        setSubmitLoading(true);
        await Axios.post(
          "http://localhost:3000/api/products/create",
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        enqueueSnackbar("Product added successfully", { variant: "success" });
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      } finally {
        setSubmitLoading(false);
      }
    }

    // console.log(Number("03"));
    // console.log(product);
  };
  return (
    <div className="single-product-container">
      <h1>Header</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
        className="content"
        encType="multipart/form-data"
      >
        <label htmlFor="name">Product name:</label>
        <input
          onChange={handleChange}
          type="text"
          required
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
          required
        />
        <label htmlFor="category">Select category:</label>
        <select
          onChange={handleChange}
          name="category"
          id="category"
          defaultValue=""
          required
        >
          <option value="">-Choose category-</option>
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
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          min={0}
          onChange={handleChange}
          name="price"
          id="price"
          required
        />
        <label style={{ fontSize: "15px" }} htmlFor="featured">
          Is featured?
          <input
            type="checkbox"
            name="featured"
            id="featured"
            //   checked={product.featured}
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
          placeholder="Description here"
          onChange={handleChange}
          required
          rows={5}
        />
        <div className="footer-button">
          <button className={`${submitLoading && "load"}`}>
            {submitLoading ? "Submitting..." : "Creating"}
          </button>
          <Link to="/products/All">
            <button className="cancel">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Create;
