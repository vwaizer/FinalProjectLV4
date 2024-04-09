import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./userPage.css";
import { http } from "../util/http";
import AccountInfo from "./AccountInfo.jsx";
import AddressEdit from "./AddressEdit.jsx";
const OrderHistory = () => {
  const [getHistory, setHistory] = useState([]);

  useEffect(() => {
    http
      .get("/receipt/history")
      .then((getHistory) => {
        
        setHistory(getHistory.data);
        console.log("history", getHistory);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{ width: "200px", height: "100%", border: "1px solid blue" }}
    ></div>
  );
};

const UserPage = () => {
  const [getUser, setUser] = useState();
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => {
        setUser(getUser.data);
        console.log("user", getUser);
      })
      .catch((err) => console.log(err));
  }, []);
  const [selectedItem, setSelectedItem] = useState("account-info");
  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "account-info":
        return <AccountInfo getUser={getUser} />;
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
        <div
          style={{
            border: "1px solid black",
            flex: "1",
            height: "65%",
            backgroundColor: "#fff",
          }}
        >
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
        <div
          style={{ border: "1px solid red", flex: "3", height: "fit-content" }}
        >
          {renderSelectedComponent()}
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
