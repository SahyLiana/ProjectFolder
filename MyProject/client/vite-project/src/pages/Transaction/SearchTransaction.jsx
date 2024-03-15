import React, { Fragment } from "react";
import "./searchTransaction.scss";
import { useSnackbar, enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function SearchTransaction() {
  const [transactionID, setTransactionID] = React.useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (transactionID.trim().length === 0) {
      console.log("White space");
      enqueueSnackbar("Invalid input", {
        variant: "warning",
        action: (key) => (
          <Fragment>
            <button
              style={{
                color: "white",
                border: "0.5px white solid",
                backgroundColor: "transparent",
              }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              x
            </button>
          </Fragment>
        ),
      });
    } else {
      navigate(`/transaction/${transactionID}`);
      console.log(transactionID);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search-container-page">
      <h1>Please input your TransactionID:</h1>
      <input
        placeholder="TransationID..."
        required
        onChange={(e) => setTransactionID(e.target.value)}
        type="text"
        name="transactionID"
      />
      <button className="submit">Submit</button>
    </form>
  );
}

export default SearchTransaction;
