import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./Auth";
import Layout from "./Layout";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import Settings from "./pages/Settings/Settings";
import Product from "./pages/Product/Product";
import Order from "./pages/Order/Order";
import Create from "./pages/Create/Create";
import ViewProduct from "./pages/ViewProduct/ViewProduct";

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Login />} path="/login" />
        {/* <Route element={<Layout />}> */}
        {/* <Route element={<Auth />} path="/">
            <Route element={<Dashboard />} path="/" />
            <Route element={<Products />} path="products" />
          </Route> */}
        <Route element={<Auth />} path="/">
          <Route element={<Dashboard />} path="/">
            <Route element={<Home />} index />
            <Route element={<Products />} path="products/:category" />
            <Route element={<ViewProduct />} path="viewproduct/:id" />

            {/* </Route> */}
            <Route element={<Orders />} path="orders" />
            <Route element={<Settings />} path="settings" />
            <Route element={<Product />} path="product/:id" />
            <Route element={<Order />} path="order/:id" />
            <Route element={<Create />} path="create" />
            {/* </Route> */}
          </Route>
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
