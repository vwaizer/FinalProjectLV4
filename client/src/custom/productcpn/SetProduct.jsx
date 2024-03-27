import React from "react";
import "./style.product.css";
const SetProduct = ({
  _id,
  name,
  type,
  author,
  publisher,
  image,
  field,
  amount,
  price,
}) => {
  return (
    <div className="setproduct">
      <div className="setproduct_custom">
        <div className="product_image">
          <img src={image} alt="imgbook" />
        </div>
        <div className="product_title">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default SetProduct;
