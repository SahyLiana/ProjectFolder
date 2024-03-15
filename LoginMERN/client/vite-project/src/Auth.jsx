import React from "react";
import Axios from "axios";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();
  //const Test = { username: "test" };
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState({ id: "", name: "" });

  //const isLoggedIn = false;
  const token = localStorage.getItem("token");
  React.useEffect(() => {
    const submitToken = async () => {
      try {
        const verifyToken = await Axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: { Authorization: token },
          }
        );
        //console.log(verifyToken.data.msg.id);
        setUserData((prevData) => ({
          ...prevData,
          id: verifyToken.data.msg.id,
          name: verifyToken.data.msg.name,
        }));

        // console.log(userData);
      } catch (error) {
        // console.log(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    submitToken();
  }, []);

  // console.log(userData);

  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  return loading === false && <Outlet context={[userData]} />;
}

export default Auth;
