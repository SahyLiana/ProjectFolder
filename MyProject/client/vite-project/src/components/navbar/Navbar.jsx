import React, { Fragment } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  NavLink,
  useNavigate,
} from "react-router-dom";
// import { BiSearch } from "react-icons/bi";
import "./navbar.scss";
import { AiOutlineBars } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/Md";
import Cart from "./Cart";
import Axios from "axios";
import Modal from "react-modal";
import { useSnackbar, enqueueSnackbar } from "notistack";
import PaymentSubmit from "./PaymentSubmit";
import { v4 as uuidv4 } from "uuid";
const PaymentMenu = React.lazy(() => import("./PaymentMenu"));

// function useHookWithRefCallback() {
//   const ref = React.useRef(null);
//   const setRef = React.useCallback(() => {
//     if (ref.current) {
//       console.log(ref.current.width);
//     }

//     // ref.current = node;
//     return ref.current;
//   }, []);

//   return [setRef];
// }

function Navbar({
  scrollToSection,
  sections,
  scrollTop,
  cartElts,
  setCartElts,
}) {
  console.log(`There are ${cartElts.length} elements(Navbar) `);

  // const [ref] = useHookWithRefCallback();
  // console.log([ref]);
  // const ref = React.useRef(null);
  const [showHiddenMenu, setShowHiddenMenu] = React.useState(false);

  const [sticky, setSticky] = React.useState(false);
  //const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = React.useState(false);
  const location = useLocation();
  const menuEl = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [uuid, setUuid] = React.useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [myDetails, setMyDetails] = React.useState({});
  // const [mywidth, setWidth] = React.useState(window.innerWidth);
  const Navigate = useNavigate();

  // React.useLayoutEffect(() => {
  //   console.log("Layout effect");
  //   console.log("Width is");
  //   console.log(mywidth);
  //   console.log(ref.current);
  //   // console.log(ref.current);
  //   console.log("Width ref.current");
  //   console.log(ref.current.width);
  //   setWidth(ref.current.width);
  // }, []);

  // console.log("From window");
  // console.log(mywidth);

  function openModal() {
    setUuid(`transaction-${uuidv4()}`);
    setIsOpen(true);
  }

  function afterOpenModal() {
    document.body.style.overflow = "hidden";
    // subtitle.style.color = "blue";
  }

  function closeModal() {
    document.body.style.overflow = "scroll";
    setIsOpen(false);
  }

  // const [total, setTotal] = React.useState();

  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
      width: window.innerWidth > 600 ? "60%" : "80%",
      height: "75vh",
      // overflowY: "scroll",
    },
  };

  let myTotal = () => {
    let getTotal = 0;
    for (let i = 0; i < cartElts.length; i++) {
      getTotal += cartElts[i].indTotal;
    }
    return getTotal;
  };

  let total = myTotal();
  // console.log(location.pathname);

  // React.useEffect(() => {
  //   console.log("Width inside useEffect is");
  //   console.log(mywidth);
  //   function handleWindowResize() {
  //     // if(ref.current?)
  //     // console.log(ref.current);
  //     // console.log(ref.current.width);
  //     // setWidth(ref.current.width);
  //     // setWidth(ref.current ? ref.current.width : 0);
  //     setWidth(window.innerWidth);
  //   }
  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);
  // setRef();

  React.useEffect(() => {
    const isSticky = () => {
      // if (mywidth > 600) {
      //   console.log("Width");
      //   console.log(mywidth);
      //   console.log("Height is");
      //   console.log(window.scrollY);
      // window.scrollY > 95 ? setSticky(true) : setSticky(false);
      if (window.innerWidth > 600) {
        if (window.scrollY > 95) {
          // console.log("Set it to true");
          setSticky(true);
        } else {
          setSticky(false);
        }
      } else {
        setSticky(true);
      }
    };
    //};
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const myStyle = {
    textDecoration: "underline",
  };

  const functionMenu = (e) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
  };

  if (showMenu) {
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = "40%";
    document.body.style.transition = "0.8s";
  } else {
    document.body.style.overflowY = "scroll";
    document.body.style.marginRight = "0%";
    document.body.style.transition = "0.8s";
  }

  const removeElt = (id) => {
    setCartElts(
      cartElts.filter((cart) => {
        if (cart._id !== id) {
          return cart;
        }
      })
    );
  };

  const displayedCartElts = cartElts.map((cart) => {
    // let myTotal = cart.price * cart.nb + total;
    // setTotal(myTotal);

    return (
      <Cart
        // total={total}
        // setTotal={setTotal}
        key={cart._id}
        cart={cart}
        removeElt={removeElt}
      />
    );
  });
  console.log("In nav");
  console.log(cartElts.length);

  const handlePayment = async (e) => {
    e.preventDefault();

    // setLoading(true);

    console.log(cartElts);

    if (cartElts.length > 0) {
      setShowMenu(false);
      openModal();
    } else {
      enqueueSnackbar("Your cart is empty", {
        variant: "error",
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
      setLoading(false);
    }
  };

  Modal.setAppElement("#root");

  // console.log(`The sticky is ${sticky}`);

  const modalCarts = cartElts.map((cart, key) => {
    return (
      <tr key={key}>
        <td>
          <img src={`http://localhost:3000/products/${cart.image}`} />
        </td>
        <td>{cart.name}</td>
        <td>{cart.nb}</td>
        <td>{cart.price}</td>
        <td style={{ fontWeight: "bold" }}>{cart.indTotal}</td>
      </tr>
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    console.log("My details are");
    console.log(myDetails);
    setLoading(true);
    try {
      const buyProduct = await Axios.patch(
        "http://localhost:3000/api/products/payments",
        {
          myCarts: cartElts,
          myDetails: myDetails,
          transactionID: uuid,
        }
      );
      enqueueSnackbar("Payment success", {
        variant: "success",
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
      Navigate(`/transaction/${uuid}`);
    } catch (error) {
      enqueueSnackbar("Payment failed", {
        variant: "error",
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
    } finally {
      setCartElts([]);
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={sticky ? "navbar active" : "navbar"}>
        <div
          className="logo"
          style={location.pathname !== "/" ? { flex: 1 } : { flex: 2 }}
        >
          <Link style={{ display: "block" }} to="/">
            <span
              style={{
                fontFamily: "'Brush Script MT', cursive",
                fontSize: "50px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              FindI
            </span>{" "}
            <br />
            <span style={{ fontSize: "17px", color: "gray" }}>Store</span>
          </Link>
        </div>

        <div className="middle">
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/All`}
          >
            SHOP ALL
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Phones")}`}>
          PHONES
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Phones`}
          >
            PHONES
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Computers")}`}>
          COMPUTERS
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Computers`}
          >
            COMPUTERS
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Others")}`}>
          OTHERS
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Others`}
          >
            OTHERS
          </NavLink>

          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={"mytransaction"}
          >
            MY TRANSACTION
          </NavLink>
        </div>

        <div className="left-nav">
          {location.pathname === "/" && (
            <div className="scrolls">
              <p onClick={() => scrollTop()}>Home</p>
              <p onClick={() => scrollToSection(sections.categories)}>
                Categories
              </p>
              <p onClick={() => scrollToSection(sections.featured)}>
                Featured products
              </p>
              <p onClick={() => scrollToSection(sections.whyUs)}>Why Us</p>
            </div>
          )}

          {!showMenu && (
            <button className="cart-button" onClick={(e) => functionMenu(e)}>
              My Cart ({cartElts.length})
            </button>
          )}

          <button
            onClick={(e) => setShowHiddenMenu((prev) => !prev)}
            className="cart-button-hidden"
          >
            <AiOutlineBars />
          </button>
        </div>
      </div>
      {showHiddenMenu && (
        <div className="hidden-nav">
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/All`}
          >
            SHOP ALL
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Phones")}`}>
          PHONES
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Phones`}
          >
            PHONES
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Computers")}`}>
          COMPUTERS
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Computers`}
          >
            COMPUTERS
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Others`}
          >
            OTHERS
          </NavLink>
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={"mytransaction"}
          >
            MY TRANSACTION
          </NavLink>
        </div>
      )}

      <div
        ref={menuEl}
        className="cart-menu"
        style={
          showMenu
            ? window.innerWidth > 600
              ? { width: "40%" }
              : { width: "100%" }
            : { width: "0px" }
        }
      >
        <React.Suspense>
          <PaymentMenu
            handlePayment={handlePayment}
            functionMenu={functionMenu}
            total={total}
            cartElts={cartElts}
            displayedCartElts={displayedCartElts}
          />
        </React.Suspense>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example"
        // className="modal-container"
        overlayClassName="overlay"
      >
        <PaymentSubmit
          uuid={uuid}
          handleSubmitPayment={handleSubmitPayment}
          subtitle={subtitle}
          closeModal={closeModal}
          handleChange={handleChange}
          loading={loading}
          modalCarts={modalCarts}
          total={total}
        />
      </Modal>
      {!showMenu && (
        <button className="stick-cart" onClick={(e) => functionMenu(e)}>
          <span style={{ zIndex: "1" }}>
            <MdProductionQuantityLimits />
          </span>
          <span className="cart-num">{cartElts.length}</span>
        </button>
      )}
    </>
  );
}

export default Navbar;
