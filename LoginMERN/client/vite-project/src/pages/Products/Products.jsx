import React from "react";
import "./products.scss";
import Axios from "axios";
// import {  } from "react-router-dom";
import { Link, useSearchParams, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
// import { BsSearch } from "react-icons/bs";

function Products() {
  let { category } = useParams();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = React.useState({ sorting: "" });
  const [searchFilter, setSearchFilter] = React.useState("");
  //const [displayedProduct,setDisplayedProduct]=React.useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedFilter((prev) => ({ ...prev, [name]: value }));
    setSearchParams((params) => {
      params.set(name, value);
      return params;
    });
  };

  const handleChangeFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  //  const displayedProduct=products.filter(product=>product._id)

  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const sorting = searchParams.get("sorting");
        const productsAPI = await Axios.get(
          "http://localhost:3000/api/products",
          {
            params: {
              category: category,
              sort: sorting,
            },
          }
        );
        // console.log("Products are :");
        console.log(productsAPI.data.products);
        setProducts(productsAPI.data.products);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [category, selectedFilter.sorting]);

  if (category === "All") {
    category = null;
  } else {
    category = category;
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // const currentPosts = products.slice(firstPostIndex, lastPostIndex);
  let currentPosts = [];

  if (searchFilter.length > 0) {
    currentPosts = products
      .filter((product) => {
        return product.name.toLowerCase().match(searchFilter.toLowerCase());
      })
      .slice(firstPostIndex, lastPostIndex);
  } else {
    currentPosts = products.slice(firstPostIndex, lastPostIndex);
  }

  return (
    <div className="products-container">
      <div className="container">
        <div className="header">
          <select onChange={handleChange} name="sorting" className="sorting">
            <option value="" defaultValue="">
              Default Sorting
            </option>
            <option value="price">Sort by price:low to high</option>
            <option value="-price">Sort by price:high to low</option>
            <option value="name">Sort by name:A to Z</option>
            <option value="-name">Sort by name:Z to A</option>
          </select>
          <div className="search-container">
            <input
              onChange={handleChangeFilter}
              placeholder="Search name..."
              type="text"
            />
            {/* <BsSearch /> */}
          </div>

          <Link className="create" to="/create">
            + Create New
          </Link>
        </div>
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : products.length === 0 ? (
            <h1>No products...</h1>
          ) : (
            <>
              <ProductList
                products={products}
                setProducts={setProducts}
                productsData={currentPosts}
              />
              {/* <Pagination
                totalPosts={products.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              /> */}
            </>
          )}
        </>
      </div>
      <div className="pagination">
        <Pagination
          totalPosts={
            searchFilter.length ? currentPosts.length : products.length
          }
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      {/* <div className="header">
          <select onChange={handleChange} name="sorting" className="sorting">
            <option value="" defaultValue="">
              Default Sorting
            </option>
            <option value="price">Sort by price:low to high</option>
            <option value="-price">Sort by price:high to low</option>
            <option value="name">Sort by name:A to Z</option>
            <option value="-name">Sort by name:Z to A</option>
          </select>
          <Link className="create">+ Create New</Link>
        </div> */}

      {/* <div>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <ProductList productsData={currentPosts} />
              {/* <Pagination
                totalPosts={products.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              /> */}
      {/* </> */}
      {/* )} */}
      {/* </> */}
      {/* </div> */}
      {/* <div style={{ padding: "0 20px" }}>
        <Pagination
          totalPosts={products.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div> */}
    </div>
  );
}

export default Products;
