import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import { VscAccount } from "react-icons/vsc";
let navbar = [
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
  {
    title: "Cart",
    href: "/cart/:ID",
  },
  {
    title: "Payment",
    href: "/payment",
  },
];

let authors = [
  {
    title: "Register",
    href: "/sign-up",
  },
  {
    title: "Login",
    href: "/sign-in",
  },
];
function Header() {
  const [login, setLogin] = useState(false);
  return (
    <div className="bookstore_header">
      <div className="logo">
        <img
          src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
          width={80}
        />
      </div>
      {navbar.map((item, index) => {
        return (
          <Link to={item.href} key={index}>
            {item.title}
          </Link>
        );
      })}
      {login ? (
        <VscAccount />
      ) : (
        <div className="auth">
          {authors.map((item, index) => {
            return (
              <Link to={item.href} key={index}>
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Header;
