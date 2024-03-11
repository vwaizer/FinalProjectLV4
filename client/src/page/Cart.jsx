import React from "react";
import Layout from "../layout/Layout";
import "./cart.css";
import { useState } from "react";

function Cart() {
  const books = [
    {
      bookImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShc1Hd9nzZbrP_1N07MrjGbekp8Pz6J4HRHtw-FGB33Q&s",
      name: "book",
      price: 100000,
    },
    {
      bookImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShc1Hd9nzZbrP_1N07MrjGbekp8Pz6J4HRHtw-FGB33Q&s",
      name: "books",
      price: 100000,
    },
  ];

  const [inputValue, setInputValue] = useState({});

  const handleKeyPress = (event, name) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = parseInt(event.target.value);
      if (!isNaN(value)) {
        const newInputValue = { ...inputValue };
        newInputValue[name] = value;
        setInputValue(newInputValue);
      }
    }
  };

  const handleInputChange = (event, name) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const newInputValue = { ...inputValue };
      newInputValue[name] = value;
      setInputValue(newInputValue);
    }
  };
  return (
    <Layout>
      <div className="cart-container">
        <div className="header-cart-item">
          <h2>GIỎ HÀNG ({books.length} sản phẩm)</h2>
          <div className="checked-all-products">
            <div style={{ flex: "2" }}>
              <label>
                <input type="checkbox" />
                <span style={{ margin: "0px 5px" }}>
                  Chọn tất cả ({books.length} sản phẩm)
                </span>
              </label>
            </div>
            <div style={{ flex: ".5" }}>Số lượng</div>
            <div style={{ flex: ".5", textAlign: "center" }}>Thành tiền</div>
          </div>

          <div >
            {books.map((item) => {
              const { bookImage, name, price } = item;
              return (
                <div>
                <div className="product-container">
                  <div className="amount-container">
                    <input type="checkbox" />
                  </div>
                  <div >
                    <img className="books-image" src={bookImage} alt=""></img>
                  </div>
                  <div className="products-info">
                    <div>{name}</div>
                    <div>{price}</div>
                  </div>
                  {/* nút tăng giảm số lượng */}
                  <div style={{  flex: ".5" }}>
                    <div className="amount-button">
                     <div>
                     
                      <button
                        onClick={() => {
                          if (inputValue[name] > 1) {
                            const newInputValue = { ...inputValue };
                            newInputValue[name] =
                              (newInputValue[name] || 0) - 1;
                            setInputValue(newInputValue);
                          }
                        }}
                      >
                        <img  src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/ico_minus2x.png" alt=""></img>
                      </button>
                      <input
                        type="text"
                        value={inputValue[name] || ""}
                        onInput={handleKeyPress}
                        onChange={(event) => handleInputChange(event, name)}
                      />
                      <button
                        onClick={() => {
                          const newInputValue = { ...inputValue };
                          newInputValue[name] = (newInputValue[name] || 0) + 1;
                          setInputValue(newInputValue);
                        }}
                      >
                        <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png" alt="" />
                      </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-price">
                    {price * inputValue[name] || 0}
                  </div>
                
                </div>
                <hr style={{border:'1px solid #C0C0C0'}}></hr> 
                </div>
              );
            })}
            
          </div>
         
        </div>
            
        <div style={{ flex: "1", border: "1px solid violet" }}>
          <h2 >Tổng số tiền</h2>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
