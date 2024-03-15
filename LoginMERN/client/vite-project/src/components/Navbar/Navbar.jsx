import React from "react";
import "./navbar.scss";
import { Link, NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/Bi";
import { MdProductionQuantityLimits } from "react-icons/Md";
import { BsCartFill } from "react-icons/Bs";
import { FcSettings } from "react-icons/Fc";
import { IoIosArrowDown } from "react-icons/Io";

function Navbar({ myCategory }) {
  // const myCategory = [
  //   {
  //     myLink: "All products",
  //     category: "All",
  //   },
  //   {
  //     myLink: "Phones",
  //     category: "Phones",
  //   },
  //   {
  //     myLink: "Computers",
  //     category: "Computers",
  //   },
  //   {
  //     myLink: "Others",
  //     category: "Others",
  //   },
  // ];
  const productAccordion = React.useRef(null);
  const [showAccordion, setShowAccordion] = React.useState(false);

  const Accordion = () => {
    setShowAccordion((prevState) => !prevState);
  };
  return (
    <div className="nav-container">
      <h1>
        FindI <span style={{ color: "gray", fontSize: "10px" }}>Store</span>
      </h1>
      <h3>Admin Dashboard</h3>
      <hr />
      <NavLink
        style={({ isActive }) =>
          isActive
            ? { color: "blue", backgroundColor: "rgba(9, 126, 251, 0.2)" }
            : null
        }
        to="/"
      >
        <BiSolidDashboard className="icons" />
        Dashboard
      </NavLink>

      <span className="product-container" onClick={() => Accordion()}>
        <MdProductionQuantityLimits />
        Products
        <IoIosArrowDown style={{ marginLeft: "auto" }} />
      </span>
      <div
        style={
          showAccordion
            ? { height: productAccordion.current.scrollHeight }
            : { height: "0px" }
        }
        ref={productAccordion}
        className="product-nav"
      >
        {/* <NavLink to="products">All products</NavLink>
        <NavLink>Phones</NavLink>
        <NavLink>Computers</NavLink>
        <NavLink>Others</NavLink> */}
        {myCategory.map((category) => {
          return (
            <NavLink
              key={category.category}
              style={({ isActive }) =>
                isActive
                  ? { color: "blue", backgroundColor: "rgba(9, 126, 251, 0.2)" }
                  : null
              }
              to={`products/${category.category}`}
            >
              {category.myLink}
            </NavLink>
          );
        })}
      </div>

      <NavLink
        style={({ isActive }) =>
          isActive
            ? { color: "blue", backgroundColor: "rgba(9, 126, 251, 0.2)" }
            : null
        }
        to="orders"
      >
        <BsCartFill className="icons" />
        Orders
      </NavLink>
      <NavLink
        style={({ isActive }) =>
          isActive
            ? { color: "blue", backgroundColor: "rgba(9, 126, 251, 0.2)" }
            : null
        }
        to="settings"
      >
        <FcSettings className="icons" />
        Settings
      </NavLink>
      {/* <button onClick={() => logout()}>Logout</button> */}
    </div>
  );
}

export default Navbar;
