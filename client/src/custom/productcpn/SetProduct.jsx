import React from "react";
import { Card } from "antd";
import "./style.product.css";

const { Meta } = Card;
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
        <img src={image} alt="imgbook" />
        <h3>{name}</h3>
        <p>Type: {type}</p>
        <p>Author: {author}</p>
        <p>Filed: {field}</p>
        <p>Amount: {amount} pcs</p>
      </div>
    </div>
  );
};

export default SetProduct;
