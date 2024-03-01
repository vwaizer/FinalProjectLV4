import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import "./layout.css";
const siteMap = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/product",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];

const bookTypes = [
  {
    title: "Literature",
    href: "#literature",
  },
  {
    title: "Children",
    href: "#children",
  },
  {
    title: "Psychology and Skills",
    href: "#psb",
  },
  {
    title: "Economic",
    href: "#economic",
  },
  {
    title: "Foreign Language Books",
    href: "#flb",
  },
];

function Footer() {
  return (
    <>
      <div className="bookstore_footer">
        <div className="logo">
          <img
            src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
            width={250}
            alt="logo"
          />
        </div>
        <div className="information">
          <div className="collection">
            <h3>Category</h3>
            {bookTypes.map((item, index) => {
              return (
                <div className="link">
                  <Link to={item.href} key={index}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="site">
            <h3>Site</h3>
            {siteMap.map((item, index) => {
              return (
                <div className="link">
                  <Link to={item.href} key={index}>
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="contact">
            <h3>Contact</h3>
            <div className="contact-info">
              <BsFillTelephoneFill className="icon" />
              Tel: 0909888999
            </div>
            <div className="contact-info">
              <IoMdMail className="icon" />
              Email: group1mindx@gmail.com
            </div>
            <div className="contact-info">
              <MdPlace className="icon" />
              Address: Ho Chi Minh City
            </div>
            <div className="another-contact">
              <Link to="http://facebook.com">
                <FaFacebookF />
              </Link>
              <Link to="https://twitter.com/i/flow/login">
                <FaTwitter />
              </Link>
              <Link to="https://www.tiktok.com/vi-VN/">
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="under-footer">
        <i>Copyright@Nhom_1_X22 2024</i>
      </p>
    </>
  );
}

export default Footer;
