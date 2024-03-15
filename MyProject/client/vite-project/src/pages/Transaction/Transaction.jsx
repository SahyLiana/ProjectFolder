import React from "react";
import "./transaction.scss";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
import Axios from "axios";
import BarCode from "react-barcode";

function Transaction() {
  const { id } = useParams();

  const [transaction, setTransaction] = React.useState([]);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    const getTransaction = async () => {
      setLoading(true);
      try {
        const fetchTransaction = await Axios.post(
          "http://localhost:3000/api/products/transaction",
          {
            id: id,
          }
        );

        console.log(fetchTransaction);
        setTransaction({ ...fetchTransaction.data[0] });
        setError(null);
      } catch (e) {
        // console.log(e.response.data.msg);
        setError(e.response.data.msg);
        // throw <h1>Transaction not found</h1>;
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, [id]);

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order details",
  });

  if (error) {
    return <h1 style={{ textAlign: "center", fontSize: "40px" }}>{error}</h1>;
  }

  console.log("Transaction is:");
  console.log(transaction);

  return (
    <div className="order-container" ref={componentRef}>
      {!loading ? (
        <>
          <div className="order-header">
            <h1>Order details</h1>
            <h2>Please save your receipt</h2>
            <button className="save" onClick={() => handlePrint()}>
              Save
            </button>
          </div>
          <div className="details-container">
            <table className="details">
              <tbody>
                <tr>
                  <td> Transaction ID:</td>
                  <td>
                    <span>
                      {transaction.transactionID
                        ? (handlePrint(), transaction.transactionID)
                        : ""}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td> Date:</td>
                  <td>
                    <span>{transaction.date}</span>
                  </td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    <span style={{ color: "goldenrod", fontWeight: "bold" }}>
                      {transaction.status}
                    </span>
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
                      <span>{transaction.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>
                      <span>{transaction.phone}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      <span>{transaction.address}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                {transaction.transactions.length >= 0 ? (
                  transaction.transactions.map((transaction, key) => {
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
                <QRCode
                  style={{ height: "100px", width: "100px" }}
                  value={`ID:${transaction.transactionID}
                  NAME:${transaction.name} 
                  CONTACT:${transaction.phone}
                  ADDRESS:${transaction.address}
                  TOTAL:${transaction.total}
                  TIME:${transaction.date}
                  `}
                />
              </div>

              <table>
                <tbody>
                  <tr>
                    <td className="left">Subtotal</td>
                    <td className="right">${transaction.total}</td>
                  </tr>
                  <tr>
                    <td className="left">Shipping Cost</td>
                    <td className="right">Free Shipping</td>
                  </tr>
                  <tr>
                    <td className="left">Total price</td>
                    <td className="right total">${transaction.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="payment">
              <h4>
                {transaction.status === "Cancelled"
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
                value={transaction.transactionID}
                fontSize="12px"
              />
            </div>
          </>
        </>
      ) : (
        <h1 style={{ fontSize: "40px" }}>Loading</h1>
      )}
    </div>
    // <h1>Tests</h1>
  );
}

export default Transaction;
