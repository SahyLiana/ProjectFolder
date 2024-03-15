import React from "react";
import { Link } from "react-router-dom";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoWhatsapp } from "react-icons/bi";
import { BsWechat } from "react-icons/bs";
import "./footer.scss";
import { BiLogoTwitter } from "react-icons/bi";
import Axios from "axios";

function Footer() {
  const [nbPhones, setNbPhones] = React.useState(0);
  const [nbComputers, setNbComputers] = React.useState(0);
  const [nbOthers, setNbOthers] = React.useState(0);

  React.useEffect(() => {
    const getData = async () => {
      const phoneAPI = await Axios.get("http://localhost:3000/api/products", {
        params: {
          category: "Phones",
        },
      });

      setNbPhones(phoneAPI.data.nbHits);

      const computerAPI = await Axios.get(
        "http://localhost:3000/api/products",
        {
          params: {
            category: "Computers",
          },
        }
      );

      setNbComputers(computerAPI.data.nbHits);

      const otherAPI = await Axios.get("http://localhost:3000/api/products", {
        params: {
          category: "Others",
        },
      });

      setNbOthers(otherAPI.data.nbHits);
      // console.log(productsAPI.data.products);
    };
    getData();
  }, []);
  return (
    <div className="footer">
      <div className="container">
        <div className="logo">
          <Link style={{ display: "block" }} to="/">
            <span className="brand">FindI</span>
            <br />
            <span className="store">Store</span>
          </Link>
        </div>
        <div className="rigth-footer">
          <div className="category">
            <h2>CATEGORIES</h2>
            <Link to="products/Phones">
              Phones <span>({nbPhones})</span>
            </Link>
            <Link to="products/Computers">
              Computers <span>({nbComputers})</span>
            </Link>
            <Link to="products/Others">
              Others <span>({nbOthers})</span>
            </Link>
          </div>
          <div className="contacts">
            <h2>CONTACTS</h2>
            <Link>testabc@gmail.com</Link>
            <p>07501234567</p>
            <p>Abc,Atananarivo,Madagascar</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-down">
        <p>Copyright &copy; 2023 FindI Store | Powered by FindI Store</p>
        <div className="socialMedia">
          <Link>
            <BiLogoFacebook />
          </Link>
          <Link>
            <BiLogoWhatsapp />
          </Link>
          <Link>
            <BiLogoTwitter />
          </Link>
          <Link>
            <BsWechat />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
