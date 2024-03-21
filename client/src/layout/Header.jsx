import React, { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ModalCart from "../cart/ModalCart";
import UserInfo from "../user-infomation/UserInfo";
import "./layout.css";
let navbar = [
  {
    title: "Trang Chủ",
    href: "/",
  },
  {
    title: "Nhà Sách",
    href: "/product",
  },
  {
    title: "Giỏ Hàng",
    href: "/cart/:ID",
  },
  {
    title: "Thanh Toán",
    href: "/payment",
  },
  {
    title: "Giới Thiệu",
    href: "/about-us",
  },
  {
    title: "Liên Hệ",
    href: "/contact",
  },
];

let authors = [
  {
    title: "Đăng ký",
    href: "/sign-up",
  },
  {
    title: "Đăng nhập",
    href: "/sign-in",
  },
];
function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [signin, setSignin] = useState(false);
  const [signout, setSignout] = useState(false);
  const navigate = useNavigate();

  setInterval(() => {
    const token = localStorage.getItem("accessToken");
    if (token == "undefined" || token == "null" || !token) {
      setSignin(false);
    } else {
      setSignin(true);
    }
  }, 1000);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token == "undefined" || token == "null" || !token) {
      setSignin(false);
    } else {
      setSignin(true);
    }
  }, [signout]);

  const backToHome = () => {
    window.location.href = "/";
  };
  return (
    <>
      {signin ? (
        <div className="bookstore_header">
          <div className="navbar-links">
            <div className="logo_header">
              <img
                onClick={backToHome}
                src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
              />
            </div>
            <div className="navbar_container">
              {navbar.map((item, index) => {
                return (
                  <Link
                    className="navbar_container-link"
                    to={item.href}
                    key={index}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="auth_container">
            <UserInfo />
            <ModalCart />
          </div>
        </div>
      ) : (
        <div className="bookstore_header">
          <div className="navbar-links">
            <div className="logo_header">
              <img
                onClick={backToHome}
                src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
              />
            </div>
            <div className="navbar_container">
              {navbar.map((item, index) => {
                return (
                  <Link
                    className="navbar_container-link"
                    to={item.href}
                    key={index}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="auth_container">
            {authors.map((item, index) => {
              return (
                <Link to={item.href} key={index}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <div className="navbar_menu">
        {toggleMenu ? (
          <RiCloseLine
            color="black"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="black"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar_menu-link">
            {navbar.map((item, index) => {
              return (
                <Link to={item.href} key={index}>
                  {item.title}
                </Link>
              );
            })}
            {signin ? (
              <div className="user-login">
                <UserInfo />
                <ModalCart />
              </div>
            ) : (
              <div className="auth_menu">
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
        )}
      </div>
    </>
  );
}

export default Header;
