import React from "react";
import cancel from "../assets/cancel.png";
import { Link } from "react-router-dom";
import "./cancel.css";
const Cancel = () => {

  const backToShop = () => {
    window.location.href = '/thanh-toan'
  }
  return (
    <div className="cancel_page">
      <div className="cancel_title">
        <h1>Có Lỗi Xảy Ra</h1>
        <h3>Vui Lòng Kiểm Tra Lại Thông Tin</h3>
      </div>
      <div className="cancel_logo">
        <img src={cancel} alt="logo" />
      </div>
      <div className="cancel_back-to-home">
        <button onClick={backToShop} type="button">
          Quay Lại
        </button>
      </div>
    </div>
  );
};

export default Cancel;
