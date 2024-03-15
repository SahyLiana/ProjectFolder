import React from "react";
import "./subnav.scss";
import { BiLogOutCircle } from "react-icons/Bi";
import { useParams, useLocation } from "react-router-dom";

function Subnav({ logout }) {
  let { category } = useParams();
  let pathname = useLocation();

  console.log(`Path is ${pathname.pathname}`);

  if (!category) {
    if (pathname.pathname === "/") {
      category = "Dashboard";
    } else if (pathname.pathname === "/orders") {
      category = "Orders";
    } else if (pathname.pathname === "/settings") {
      category = "Settings";
    }
  }
  return (
    <div className="subnav">
      <h1>{category}</h1>
      <button onClick={() => logout()}>
        <BiLogOutCircle />
      </button>
    </div>
  );
}

export default Subnav;
