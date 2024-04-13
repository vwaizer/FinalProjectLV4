import React, { useEffect, useState } from "react";
import "./userPage.css";
import { http } from "../util/http";

const OrderHistory = () => {
  const [getHistory, setHistory] = useState([]);

  useEffect(() => {
    http
      .get("/receipt/history")
      .then((response) => {
        setHistory(response.data);
        console.log("history", response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("lịch sử mua", getHistory);

  if (!getHistory) {
    return <div>Loading...</div>;
  }

  const getTotalPrice = (order) => {
    const totalPrice = order.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
    return totalPrice + 19; 
  };

  return (
    <div style={{ width: "100%", height: "fit-content" }}>
      <div style={{ backgroundColor: "#fff", paddingBottom: "10px",marginBottom:"11px" }}>
        <div className="page-title">
          <h1>LỊCH SỬ ĐƠN HÀNG</h1>
        </div>
        <div className="line"></div>
      </div>
      <div>
        {getHistory.length > 0 ? (getHistory.map((order, index) => {
          const totalPrice = getTotalPrice(order);
          console.log(order);
          return (
            <div
              key={index}
              style={{
                marginBottom: "10px"
              }}
            >
               <div className="history-book-container">Ngày mua : {new Date(order[0].date).toLocaleDateString()}</div> 
              {order.map((item, itemIndex) => {
                const { amount, img, name, price } = item;
                return (
                  <React.Fragment key={itemIndex}>
                    {itemIndex > 0 && <div className="line"></div>}
                    <div className="history-book-container">
                      
                      <div>
                        <img className="history-book-image" src={img} alt="" />
                      </div>
                      <div className="history-info-container">
                        <div className="history-name-price-container">
                          <div style={{ fontSize: "17px" }}>{name} </div>
                          <div>{price} đ</div>
                        </div>
                        <div className="history-amount-total-container">
                          <div style={{color:'#C92127',fontWeight:'600'}}>{price * amount}.000 đ</div>
                          <div className="history-amount">x{amount}</div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div className="history-total-container">
                <div className="line-history-total-price"></div>
                <div className="total-title">
                  <div className="title">Thành tiền: </div>
                  <div className="price">{totalPrice}.000 đ</div>
                </div>
              </div>
            </div>
          );
        }))
        : <div>Bạn chưa có đơn hàng nào</div>}
        
      </div>
    </div>
  );
};

export default OrderHistory;