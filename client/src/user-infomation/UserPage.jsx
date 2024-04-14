import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./userPage.css";
import { http } from "../util/http";
import AccountInfo from "./AccountInfo.jsx";
import AddressEdit from "./AddressEdit.jsx";
import OrderHistory from "./OrderHistory.jsx";

const UserPage = () => {
  
  const [selectedItem, setSelectedItem] = useState("account-info");
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
      <div className="wrap_user">
        <div
          style={{
            flex: "1",
            height: "fit-content",
            backgroundColor: "#fff",
            paddingBottom: "10px",
          }}
        >
          <div className="title-user-info">TÀI KHOẢN</div>
          <div className="space-title">
            <div
              className={
                selectedItem === "account-info"
                  ? "selected-item"
                  : "list-content"
              }
            >
              <ul>
                <li
                  value={"account-info"}
                  onClick={() => handleItemClick("account-info")}
                >
                  Thông tin toàn khoản
                </li>
              </ul>
            </div>
            <div className="line-title-user-info"></div>
            <div
              className={
                selectedItem === "address" ? "selected-item" : "list-content"
              }
            >
              <ul>
                <li
                  value={"address"}
                  onClick={() => handleItemClick("address")}
                >
                  Số địa chỉ
                </li>
              </ul>
            </div>
            <div className="line-title-user-info"></div>
            <div
              className={
                selectedItem === "order-history"
                  ? "selected-item"
                  : "list-content"
              }
            >
              <ul>
                <li
                  value={"order-history"}
                  onClick={() => handleItemClick("order-history")}
                >
                  Lịch sử đơn hàng
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ flex: "3", height: "fit-content" }}>
          {renderSelectedComponent()}
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
