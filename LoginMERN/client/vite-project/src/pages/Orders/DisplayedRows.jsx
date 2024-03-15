import React from "react";
import { Link } from "react-router-dom";

function DisplayedRows({ ordersData }) {
  return (
    <>
      {ordersData.length > 0 ? (
        ordersData.map((order, index) => {
          return (
            <tr key={index}>
              <td style={{ color: "gray" }}>{order.transactionID}</td>
              <td>{order.name}</td>
              <td style={{ color: "gray" }}>{order.phone}</td>
              <td>{order.transactions.length}</td>
              <td>${order.total}</td>
              <td>
                <span className={order.status}>{order.status}</span>
              </td>
              <td style={{ color: "gray" }}>{order.date}</td>
              <td>
                <Link to={`/order/${order._id}`}>View</Link>
              </td>
            </tr>
          );
        })
      ) : (
        <tr style={{ border: "none" }}>
          <td>
            <span style={{ fontWeight: "bold", fontSize: "40px" }}>
              No Orders...
            </span>
          </td>
        </tr>
      )}
    </>
  );
}

export default DisplayedRows;
