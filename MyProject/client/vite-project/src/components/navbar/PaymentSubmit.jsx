import React from "react";

function PaymentSubmit({
  handleSubmitPayment,
  subtitle,
  closeModal,
  handleChange,
  loading,
  modalCarts = { modalCarts },
  total = { total },
  uuid = { uuid },
}) {
  return (
    <form onSubmit={handleSubmitPayment} className="modal-container">
      <div className="modal-header">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Payement details:</h2>
        <button className="close" onClick={closeModal}>
          x
        </button>
      </div>
      <p>TransactionID:{uuid}</p>
      <table>
        <thead>
          <tr>
            <th>Product image</th>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{modalCarts}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td
              style={{
                fontWeight: "bold",
                color: "blue",
                fontSize: "20px",
                padding: "10px 0",
              }}
            >
              ${total}
            </td>
          </tr>
        </tfoot>
      </table>
      <h2>Your details:</h2>
      <label htmlFor="name">
        Name<sup style={{ color: "red" }}>*</sup>:
      </label>
      <br />
      <input
        onChange={handleChange}
        name="name"
        required
        type="text"
        id="name"
      />
      <br />
      <label htmlFor="phone">
        Phone number<sup style={{ color: "red" }}>*</sup>:
      </label>
      <br />
      <input
        onChange={handleChange}
        name="phone"
        required
        type="text"
        id="phone"
      />
      <br />
      <label htmlFor="address">
        Address
        <span style={{ fontSize: "10px", color: "gray" }}>
          (You can pick from our google map and copy the exact address or type
          manually)
        </span>
        <sup style={{ color: "red" }}>*</sup>:
      </label>
      <br />
      <input
        onChange={handleChange}
        name="address"
        required
        type="text"
        id="address"
      />
      <br />
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            width="100%"
            // height="400"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            id="gmap_canvas"
            src="https://maps.google.com/maps/?width=523.4&amp;height=400&amp;hl=en&amp;q=KampalaUniversity&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
      <br />
      <button className={`confirm ${loading && "loading"}`}>
        {loading ? "Please wait" : "Confirm payment"}
      </button>
    </form>
  );
}

export default PaymentSubmit;
