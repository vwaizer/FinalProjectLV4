import React from 'react'
import { Input } from "antd";
const BoxInfo = ({ title, placeholder, value }) => {
  return (
  
        <div style={{ display: "flex", margin: "20px 0px" }}>
          {" "}
          <div style={{ flexBasis: "20%" }}>{title}</div>
          <Input
            value={value}
            placeholder={placeholder}
            style={{ width: "60%" }}
          ></Input>
        </div>
      );
  
}

export default BoxInfo