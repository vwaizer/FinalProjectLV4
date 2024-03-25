import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Input, Radio } from "antd";
import "./userPage.css"
const AccountInfo = () => {
  const boxFillInfo = ["Họ", "Tên", "Số điện thoại", "Email"];
  const [value, setValue] = useState(false)
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div style={{ border: "1px solid black", paddingLeft: "15px" }}>
      <h1 style={{ fontSize: "15px", fontWeight: "bolder" }}>
        THÔNG TIN TÀI KHOẢN
      </h1>
      {boxFillInfo.map((item) => {
        return (<div>
          <div style={{ display: "flex", margin:'20px 0px' }}>
            {" "}
            <div style={{ flexBasis: "20%" }}>{item}</div>
            <Input placeholder={`Nhập ${item} `}  style={{ width: "60%" }}></Input>
          </div>
          
          </div>
        );
        
      })}
      <div style={{display:'flex'}}>
          <div style={{ flexBasis: "20%" }}>Giới Tính</div>
          <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>Nam</Radio>
      <Radio value={2}>Nữ</Radio>
    </Radio.Group>
          </div>
          <div style={{display:'flex'}}>
          <div style={{flexBasis:'20%'}}>Ngày sinh</div>
          <div style={{display:'flex', gap:'10px'}}>
          
          <input className="birth-day-box" type="text" ></input>
          <input className="birth-day-box" type="text" ></input>
          <input className="birth-day-box" type="text" ></input>

          </div>
       
          </div>
      
    </div>
  );
};

const AddressEdit = () => {
  return (
    <div style={{ width: "200px", height: "100%", border: "1px solid red" }}>
      
    </div>
  );
};

const OrderHistory = () => {
  return (
    <div style={{ width: "200px", height: "100%", border: "1px solid blue" }}>
      
    </div>
  );
};

const UserPage = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "account-info":
        return <AccountInfo />;
      case "address":
        return <AddressEdit />;
      case "order-history":
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "800px",
          margin: "auto",
          gap: "0px 20px",
        }}
      >
        <div style={{ border: "1px solid black", flex: "1" }}>
          <div>
            <ul style={{ listStyleType: "none" }}>
              <li
                value={"account-info"}
                onClick={() => handleItemClick("account-info")}
              >
                Thông tin toàn khoản
              </li>
              <li value={"address"} onClick={() => handleItemClick("address")}>
                Số địa chỉ
              </li>
              <li
                value={"order-history"}
                onClick={() => handleItemClick("order-history")}
              >
                Lịch sử đơn hàng
              </li>
            </ul>
          </div>
        </div>
        <div style={{ border: "1px solid red", flex: "3" }}>
          {renderSelectedComponent()}
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
