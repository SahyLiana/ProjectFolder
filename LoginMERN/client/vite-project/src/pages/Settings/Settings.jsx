import React from "react";
import "./settings.scss";
import { useOutletContext } from "react-router-dom";
import Axios from "axios";
import { enqueueSnackbar, useSnackbar } from "notistack";

function Settings() {
  const { enqueueSnackbar, closeSnacbar } = useSnackbar();
  const [userData] = useOutletContext();
  const [passwordData, setPasswordData] = React.useState({});
  const token = localStorage.getItem("token");
  const [loading, setLoading] = React.useState(false);

  //console.log(token);
  const onChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Token is");
    console.log(token);
    setLoading(true);

    if (passwordData.confirmpassword !== passwordData.password) {
      enqueueSnackbar("Password mismatched...", { variant: "warning" });
      setLoading(false);
    } else {
      try {
        //localhost:5000/api/admin/update/password/1
        //  const findUserData=await Axios.get('http://localhost:5000/api/admin/dashboard')
        const updatePassword = await Axios.patch(
          `http://localhost:5000/api/admin/update/password/${userData.id}`,
          passwordData,
          {
            headers: {
              authorization: token,
            },
          }
        );

        enqueueSnackbar("Password updated successfully", {
          variant: "success",
        });
      } catch (error) {
        console.log(error.response.data.msg);
        enqueueSnackbar(error.response.data.msg, { variant: "error" });
      } finally {
        setLoading(false);
      }
    }

    console.log(passwordData);
  };

  //  console.log(userData);
  return (
    <div className="settings-container">
      <h1>Profile settings</h1>
      <form onSubmit={onSubmit} className="settings-form">
        <label htmlFor="username">Username:</label>
        <br />
        <input
          disabled
          value={userData.name}
          onChange={onChange}
          type="text"
          id="username"
          name="user"
        />
        <br />
        <label htmlFor="oldpassword">Old password:</label>

        <br />
        <input
          required
          onChange={onChange}
          type="password"
          id="oldpassword"
          name="oldpassword"
        />
        <br />
        <label htmlFor="newpassword">New password:</label>

        <br />
        <input
          required
          onChange={onChange}
          type="password"
          id="newpassword"
          name="password"
        />
        <br />

        <label htmlFor="confirmpassword">Confirm password:</label>
        <br />
        <input
          required
          onChange={onChange}
          type="password"
          id="confirmpassword"
          name="confirmpassword"
        />
        <br />
        <button className={`save ${loading ? "load" : null}`}>
          {loading ? "Updating..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
