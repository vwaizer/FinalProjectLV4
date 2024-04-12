import React from "react";
import "./style.product.css";
const SetProduct = ({ name, image, rating, price, author }) => {
  return (
    <div className="setproduct">
      <div className="setproduct_custom">
        <div className="product_image">
          <img src={image} alt="imgbook" />
        </div>
        <div className="product_title">
          <h2>{name}</h2>
          <p>Tác Giả: {author}</p>
          <h6>Giá: {price}đ</h6>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default SetProduct;
