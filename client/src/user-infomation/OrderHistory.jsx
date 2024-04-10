import React, { useEffect, useState } from "react";
import "./userPage.css";
import { http } from "../util/http";
const OrderHistory = () => {
    const [getHistory, setHistory] = useState([]);
  
    useEffect(() => {
      http
        .get("/receipt/history")
        .then((getHistory) => {
          setHistory(getHistory.data);
          console.log("history", getHistory.data);
        })
        .catch((err) => console.log(err));
    }, []);
    console.log("giỏ hàng", getHistory);
    if (!getHistory) {
      return <div>Loading...</div>;
    }
    return (
      <div style={{ width: "100%", height: "fit-content" }}>
        <div style={{ backgroundColor: "#fff", paddingBottom: "10px" }}>
          <div className="page-title">
            <h1>LỊCH SỬ ĐƠN HÀNG</h1>
          </div>
          <div className="line"></div>
        </div>
        <div>
          {getHistory.map((order) => {
            return (
              <div key={order.name}>
                {order.map((item) => {
                  const { amount, img, name, price } = item;
                  return (
                    <div className="history-book-container" key={name}>
                      <div>
                        <img className="history-book-image" src={img} alt="" />
                      </div>
                      <div className="history-info-container">
                        <div className="history-name-price-container">
                          <div style={{ fontSize: "17px" }}>{name} </div>
                          <div>{price} đ</div>
                        </div>
                        <div className="history-amount-total-container">
                          <div>{price * amount}.000 đ</div>
                          <div className="history-amount">x{amount}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
export default OrderHistory;