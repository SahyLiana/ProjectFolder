import React from "react";
import "./home.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Link, useOutletContext } from "react-router-dom";
// import Categories from "../categories/Categories";
const Categories = React.lazy(() => import("../categories/Categories"));
import Featured from "../featured/Featured";
// const Featured = React.lazy(() => import("../featured/Featured"));
// import WhyUs from "../whyus/WhyUs";
const WhyUs = React.lazy(() => import("../whyus/WhyUs"));

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

function Home() {
  // const [center, setCenter] = React.useState({
  //   lat: -3.745,
  //   lng: -38.523,
  // });
  // navigator.geolocation.getCurrentPosition((position) => {
  //   const { latitude, longitude } = position.coords;

  // console.log(latitude, longitude);

  // setCenter({ lat: latitude, lng: longitude });
  // });
  // const [userLocation, setUserLocation] = React.useState({
  //   latitude: 0.260556,
  //   longitude: 32.635556,
  // });

  const [home, categories, featured, whyUs] = useOutletContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA60BVZHs4OGA5E-ttm0WgsW2Gzl8hCPjE",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    AOS.init({ duration: 1900 });

    // const getUserLocation = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
    //         console.log(latitude, longitude);
    //         setUserLocation({ latitude, longitude });
    //       },

    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   } else {
    //     console.log("Geolocation is not supported by this browser");
    //   }
    // };

    // getUserLocation();
  }, []);
  // console.log("center");
  // console.log(center);

  // let [loc, setLoc] = React.useState(
  //   `"https://maps.google.com/maps/?width=523.4&amp;height=400&amp;hl=en&amp;q=${userLocation.latitude},${userLocation.longitude}&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"`
  // );

  // const loc = `https://maps.google.com/maps/?width=523.4&amp;height=400&amp;hl=en&amp;q=${userLocation.latitude},${userLocation.longitude}&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;
  // console.log(loc);
  return (
    <div className="home">
      <div className="banner">
        <div className="container">
          <div className="content" data-aos="fade-left">
            <p>Black Friday</p>
            <h1>Up to 50% off</h1>
            <h3>Hundreds of Electronic devices</h3>
            <Link to="products/All">SHOP NOW</Link>
          </div>
        </div>
      </div>

      {/* {isLoaded ? ( */}
      {/* // <GoogleMap */}
      {/* // mapContainerStyle={containerStyle} */}
      {/* // center={center} */}
      {/* // zoom={10} */}
      {/* // onLoad={onLoad} */}
      {/* // onUnmount={onUnmount} */}
      {/* // > */}
      {/* Child components, such as markers, info windows, etc. */}
      {/* <></> */}
      {/* </GoogleMap> */}
      {/* // ) : ( */}
      {/* // <></> */}
      {/* // )} */}

      {/* <h1> {center}</h1> */}
      <React.Suspense fallback={<>...</>}>
        <Categories myRef={categories} />
      </React.Suspense>
      {/* <React.Suspense fallback={<>...</>}> */}
      <Featured myRef={featured} />
      {/* </React.Suspense> */}

      <React.Suspense fallback={<>...</>}>
        <WhyUs myRef={whyUs} />
      </React.Suspense>
    </div>
  );
}

export default Home;
