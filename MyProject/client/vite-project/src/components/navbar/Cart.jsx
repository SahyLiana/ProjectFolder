import React from "react";
// import "./cart.scss";

function Cart({ cart, removeElt, totalArray, setTotalArray }) {
  // const [total, setTotal] = React.useState(0);
  // setTotal(cart.price * cart.nb);

  let total = cart.price * cart.nb;
  // totalArray.push(total);
  // console.log(`My total array is ${totalArray.length}.${totalArray}`);

  return (
    <div className="cart">
      <img src={`http://localhost:3000/products/${cart.image}`} />
      <div className="content">
        <h2>
          {cart.name}:<span className="price">${cart.price}</span>
        </h2>
        <p>Quantity:x{cart.nb}</p>
      </div>
      <button id="remove" onClick={() => removeElt(cart._id)}>
        Remove
      </button>
    </div>
  );
}

export default Cart;
