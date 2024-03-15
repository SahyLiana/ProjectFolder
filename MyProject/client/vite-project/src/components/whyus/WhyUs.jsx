import React from "react";
import "./whyus.scss";
import { FaTruck } from "react-icons/fa";
import { GoContainer } from "react-icons/go";
import { BsShieldShaded } from "react-icons/bs";
import { BiCartDownload } from "react-icons/bi";
// import Card from "./Card";
const Card = React.lazy(() => import("./Card"));
import AOS from "aos";
import "aos/dist/aos.css";

function WhyUs({ myRef }) {
  const whyArray = [
    {
      id: 1,
      title: "Fast Delivery",
      logo: <FaTruck />,
      text: "Our e-commerce platform is committed to providing swift and efficient delivery services, ensuring your products reach you in record time.",
    },
    {
      id: 2,
      title: "Free Shipping",
      logo: <GoContainer />,
      text: "Enjoy the convenience of free delivery on all orders, because at FindI, we believe in making your shopping experience hassle-free.",
    },
    {
      id: 3,
      title: "Secure Checkout",
      logo: <BsShieldShaded />,
      text: "Our e-commerce platform employs industry-leading encryption technology to ensure a secure checkout process, safeguarding your personal and payment information from unauthorized access.",
    },
    {
      id: 4,
      title: "Easy Returns",
      logo: <BiCartDownload />,
      text: "With just a few clicks, you can request a return for your online purchases, making the return experience simple and convenient",
    },
  ];

  React.useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const CardElts = whyArray.map((card) => (
    <React.Suspense key={card.id}>
      <Card title={card.title} logo={card.logo} text={card.text} />
    </React.Suspense>
  ));

  return (
    <div className="whyus" data-aos="slide-up" ref={myRef}>
      <div className="header">
        <p>Best Products</p>
        <h1>WHY CHOOSE US</h1>
        <div className="line"></div>
      </div>
      <div className="whycontent">{CardElts}</div>
    </div>
  );
}

export default WhyUs;
