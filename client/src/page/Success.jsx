import React from "react";
import success from "../assets/success.png";
import { http } from "../util/http";
import './success.css'
const Success = () => {
  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));

  if(listCheck !== "undefined"){
    let newCart;
  newCart = listCheck.map((product) => {
    const { amount, discount, bookID } = product;
    return { amount: amount, discount: discount, bookID: bookID };
  });
  http
    .post("/receipt/setHistory", { cart: newCart })
    .catch((error) => console.log(error));
  }

  const backToHome = () => {
    window.location.href = '/'
  }
  return (
    <div className="success_page">
      <div className="success_title">
        <h1>Thanh Toán Thành Công</h1>
        <h3>Đơn hàng của bạn đã được lưu vào hệ thống</h3>
      </div>
      <div className="success_logo">
        <img src={success} alt="logo" />
      </div>
      <div className="success_back-to-home">
        <button onClick={backToHome} type="button">Trở về</button>
      </div>
    </div>
  );
};

export default Success;
