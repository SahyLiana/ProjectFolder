import React from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import "./dashboard.scss";
import Subnav from "../../components/Navbar/Subnav/Subnav";
import Navbar from "../../components/Navbar/Navbar";

function Protected() {
  const myCategory = [
    {
      myLink: "All products",
      category: "All",
    },
    {
      myLink: "Phones",
      category: "Phones",
    },
    {
      myLink: "Computers",
      category: "Computers",
    },
    {
      myLink: "Others",
      category: "Others",
    },
  ];
  const [userData] = useOutletContext();
  //console.log(userData);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className="container">
        <div className="nav">
          <Navbar myCategory={myCategory} />
        </div>

        {/* <h1>
        Welcome {userData.name} with id :{userData.id}
      </h1>
      Protected page<button onClick={() => logout()}>Logout</button> */}
        <div className="outlet">
          <Subnav logout={logout} />
          <Outlet context={[userData]} />
        </div>
      </div>
    </>
  );
}

export default Protected;
