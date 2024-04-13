import { Spin } from "antd";
import React from "react";
import "./style.product.css";

const Loading = () => {
  return (
    <div className="example">
      <Spin size="large"  />
    </div>
  );
};

export default Loading;
