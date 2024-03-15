import React from "react";
import "./order.scss";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useSnackbar, enqueueSnackbar } from "notistack";
import { FaSave } from "react-icons/Fa";
import BarCode from "react-barcode";
import QRCode from "react-qr-code";

function Order() {
  const { id } = useParams();
  const [singleOrder, setSingleOrder] = React.useState({});
  const [transactions, setTransactions] = React.useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnacbar } = useSnackbar();
  React.useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const order = await Axios.get(
          `http://localhost:3000/api/products/order/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // console.log(order.data.findOrder);
        setSingleOrder(order.data.findOrder);
        setStatus(order.data.findOrder.status);
        // console.log(order.data.findOrder.transactions);
        setTransactions(order.data.findOrder.transactions);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

  console.log("My order is");
  console.log(singleOrder);
  console.log("My transactions are ");
  console.log(transactions);

  const handleSubmit = async () => {
    if (status && status !== singleOrder.status) {
      console.log("The new status is");
      console.log(status);

      try {
        setUpdateLoading(true);
        const updateStatus = await Axios.patch(
          `http://localhost:3000/api/products/order/${id}`,
          {
            status: status,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // setStatus(order.data.findOrder.status);
        setStatus(status);
        setSingleOrder((prev) => ({ ...prev, status: status }));
        enqueueSnackbar("Order has been cancelled successfuly", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      } finally {
        setUpdateLoading(false);
      }
    } else {
      enqueueSnackbar("Please select the status", { variant: "warning" });
    }
  };

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order details",
  });

  return (
    <div className="order-container" ref={componentRef}>
      <div className="order-header">
        <h1>Order details</h1>
        <button className="save" onClick={() => handlePrint()}>
          <FaSave /> Save
        </button>
        {singleOrder.status !== "Cancelled" && (
          <>
            <div className="right-header">
              <button
                className={` ${updateLoading && "loading"}`}
                onClick={handleSubmit}
              >
                {updateLoading ? "Updating..." : "Update"}
              </button>
              <select onChange={(e) => setStatus(e.target.value)} name="status">
                <option defaultValue="" value="">
                  Change Status
                </option>
                <option value="Delivered">Deliver</option>
                <option value="Cancelled">Cancel</option>
              </select>
            </div>
          </>
        )}
      </div>
      <div className="details-container">
        <table className="details">
          <tbody>
            <tr>
              <td> Transaction ID:</td>
              <td>
                <span>{singleOrder.transactionID}</span>
              </td>
            </tr>
            <tr>
              <td> Date:</td>
              <td>
                <span>{singleOrder.date}</span>
              </td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <span>{singleOrder.status}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="right-header">
          <table>
            <tbody>
              <tr>
                <td>Client name:</td>
                <td>
                  <span>{singleOrder.name}</span>
                </td>
              </tr>
              <tr>
                <td>Contact:</td>
                <td>
                  <span>{singleOrder.phone}</span>
                </td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>
                  <span>{singleOrder.address}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {!loading ? (
        <>
          <table className="transactions">
            <thead>
              <tr>
                <td style={{ width: "50%" }}>Product</td>
                <td>Quantity</td>
                <td>Unit Price</td>
                <td style={{ textAlign: "right" }}>Total</td>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, key) => {
                  return (
                    <tr key={key}>
                      <td className="product">
                        <img
                          src={`http://localhost:3000/products/${transaction.image}`}
                        />
                        <span className="name">{transaction.name}</span>
                      </td>
                      <td>{transaction.nb}</td>
                      <td>${transaction.price}</td>
                      <td style={{ textAlign: "right" }}>
                        ${transaction.indTotal}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ border: "none" }}>
                  <td style={{ fontSize: "30px" }}>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="calculate-total">
            <div className="code">
              {singleOrder.transactionID && (
                <QRCode
                  style={{ height: "100px", width: "100px" }}
                  value={`ID:${singleOrder.transactionID}
                  NAME:${singleOrder.name} 
                  CONTACT:${singleOrder.phone}
                  ADDRESS:${singleOrder.address}
                  TOTAL:${singleOrder.total}
                  TIME:${singleOrder.date}`}
                />
              )}
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="left">Subtotal</td>
                  <td className="right">${singleOrder.total}</td>
                </tr>
                <tr>
                  <td className="left">Shipping Cost</td>
                  <td className="right">Free Shipping</td>
                </tr>
                <tr>
                  <td className="left">Total price</td>
                  <td className="right total">${singleOrder.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="payment">
            <h4>
              {singleOrder.status === "Cancelled"
                ? "Payment cancelled"
                : "Payment made"}
            </h4>
          </div>
          <div className="barcode">
            <BarCode
              width="1"
              background="white"
              height="30px"
              className="barcode"
              value={singleOrder.transactionID}
              fontSize="12px"
            />
            <Link to="/orders">Back</Link>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Order;
