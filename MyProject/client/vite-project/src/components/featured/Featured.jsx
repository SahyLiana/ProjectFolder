import React from "react";
import "./featured.scss";
// import Card from "./Card";
const Card = React.lazy(() => import("./Card"));
import Axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function Featured({ myRef }) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getFeaturedProducts = async () => {
      const featuredProducts = await Axios.get(
        "http://localhost:3000/api/products/",
        {
          params: {
            featured: true,
          },
        }
      );
      // console.log(featuredProducts.data.products);
      setProducts((prevProducts) => featuredProducts.data.products);
    };
    AOS.init({ duration: 500 });
    getFeaturedProducts();
  }, []);

  const displayedProducts =
    products.length > 0 &&
    products.map((product, index) => {
      return (
        <SwiperSlide key={index}>
          <React.Suspense>
            <Card key={index} product={product} />
          </React.Suspense>
          {/* <Link to={`/product/${product._id}`}> */}

          {/* </Link> */}
        </SwiperSlide>
      );
    });
  // console.log(displayedProducts);
  return (
    // <div className="featured" data-aos="slide-up" ref={myRef}>
    <div className="featured" data-aos="slide-up" ref={myRef}>
      <div className="featured-header">
        <p>Shop featured product</p>
        <h1>FEATURED PRODUCTS</h1>
        <div className="down-line"></div>
      </div>

      {/* <PaginatedItems itemsPerPage={4} /> */}
      <Swiper
        slidesPerView={3}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            // modules: [Autoplay],
            navigation: false,
          },
          "@0.75": {
            slidesPerView: 3,
            // modules: [Autoplay],

            navigation: false,
            spaceBetween: 20,
          },
        }}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          // stopOnLastSlide: false,
          // waitForTransition: true,
          disableOnInteraction: false,
          // reverseDirection: true,
        }}
        speed={1000}
        // slidesPerGroupSkip={3}
        slidesPerGroup={1}
        centeredSlides={true}
        navigation={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {displayedProducts}
      </Swiper>
    </div>
  );
}

//React apex chart
//RuChart

export default Featured;
