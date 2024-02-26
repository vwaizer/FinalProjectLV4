import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
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
    title: "Sign-In",
    href: "/sign-in",
  },
  {
    title: "Sign-Up",
    href: "/sign-up",
  },
];
function Header() {
  const [login, setLogin] = useState(false);
  return (
    <div className="bookstore_header">
      <div>
        <img
          src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
          width={50}
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
