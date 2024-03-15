import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
// import Chatbot from "react-chatbot-kit";
// import ActionProvider from "./ActionProvider";
// import MessageParser from "./MessageParser";
// import config from "./config";
import ChatBot from "./Chatbot";
import { TbMessageChatbot } from "react-icons/Tb";

import "./layout.scss";
// import Footer from "./footer/Footer";
const Footer = React.lazy(() => import("./footer/Footer"));
import { Outlet } from "react-router-dom";

// import Navbar from "./navbar/Navbar";
const Navbar = React.lazy(() => import("./navbar/Navbar"));

function Layout() {
  // const ref = React.useRef();
  const [showBot, setShowBot] = React.useState(false);
  const home = React.useRef(null);
  const categories = React.useRef(null);
  const featured = React.useRef(null);
  const whyUs = React.useRef(null);
  // const [total, setTotal] = React.useState(0);

  //CART ADD,ELEMENTS
  const [cartElts, setCartElts] = React.useState([]);
  const [product, setProduct] = React.useState({});

  console.log(cartElts);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //C:\Users\LENOVO\.vscode\extensions
  return (
    <div style={{ position: "relative" }}>
      <React.Suspense>
        <Navbar
          // ref={ref}
          scrollToSection={scrollToSection}
          cartElts={cartElts}
          setCartElts={setCartElts}
          product={product}
          setProduct={setProduct}
          sections={{
            home,
            categories,
            featured,
            whyUs,
            cartElts,
            setCartElts,
          }}
          scrollTop={scrollTop}
          // total={total}
          // setTotal={setTotal}
        />
      </React.Suspense>

      <Outlet
        context={[
          home,
          categories,
          featured,
          whyUs,
          cartElts,
          setCartElts,
          product,
          setProduct,
        ]}
      />
      {/* <div className="App-header">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div> */}

      <div className="chatbot-container">
        <button
          onClick={() => {
            setShowBot((prevState) => !prevState);
            AOS.init({ duration: 600 });
          }}
          className="show-chat-btn"
        >
          <TbMessageChatbot />
        </button>
        {showBot && (
          <div data-aos="fade-right" className="bot">
            <ChatBot />
          </div>
        )}

        {/* {showBot && <ChatBot className="bot" />} */}
      </div>

      <React.Suspense>
        <Footer />
      </React.Suspense>
    </div>
  );
}

export default Layout;
