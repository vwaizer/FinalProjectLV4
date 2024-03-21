import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./cart.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { http } from "../util/http";
function Cart() {
  const books = [
    {
      bookImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShc1Hd9nzZbrP_1N07MrjGbekp8Pz6J4HRHtw-FGB33Q&s",
      name: "book",
      price: 100000,
      amount: 1,
    },
    {
      bookImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShc1Hd9nzZbrP_1N07MrjGbekp8Pz6J4HRHtw-FGB33Q&s",
      name: "books",
      price: 100000,
      amount: 1,
    },
  ];
  const [getAddToCart, setGetAddToCart] = useState([]);

  useEffect(() => {
    http
      .get("/receipt/")
      .then((getAddToCart) => {console.log(getAddToCart);setGetAddToCart(getAddToCart.data);})
      .catch((err) => console.log(err));
  }, []);
  console.log(getAddToCart);
  const [inputValue, setInputValue] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(books.map(() => false));
  const [updateBooks, setUpdateBooks] = useState(books);
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

      const newAmount = updateBooks.map((book) => {
        if (book.name === name) {
          return {
            ...book,
            amount: value,
          };
        }
        return book;
      });
      setUpdateBooks(newAmount);
    }
  };
  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
    const newCheckboxStates = checkboxStates.map(() => !selectAllChecked);
    setCheckboxStates(newCheckboxStates);
  };
  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
    const allChecked = newCheckboxStates.every((checked) => checked);
    setSelectAllChecked(allChecked);
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    books.forEach((item, index) => {
      if (checkboxStates[index]) {
        const { price } = item;
        totalPrice += price * (inputValue[item.name] || 0);
      }
    });
    return totalPrice;
  };
  const finalTotal = () => {
    let hasCheckedProduct = false;
    let totalPrice = 0;

    books.forEach((item, index) => {
      if (checkboxStates[index]) {
        hasCheckedProduct = true;
        totalPrice = calculateTotalPrice() + 19000;
      }
    });
    if (hasCheckedProduct) {
      return totalPrice;
    } else {
      return 0;
    }
  };
  const handlePayment = () => {
    const BoughtList = books.filter((item, index) => checkboxStates[index]);
    if (BoughtList.length > 0) {
      localStorage.setItem("BoughtList", JSON.stringify(BoughtList));
      window.location.href = "/payment";
    }
  };
  return (
    <Layout>
      <div className="cart-container">
        <div className="header-cart-item">
          <h1>GIỎ HÀNG ({books.length} sản phẩm)</h1>
          <div className="checked-all-products">
            <div style={{ flex: "2", display: "flex" }}>
              
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
                <span style={{marginTop:'-4px', marginLeft:'5px'}}>Chọn tất cả ({books.length} sản phẩm)</span>
              
            </div>
            <div style={{ flex: ".5" }}>Số lượng</div>
            <div style={{ flex: ".55", textAlign: "center" }}>Thành tiền</div>
          </div>

          <div>
            {books.map((item, index) => {
              const { bookImage, name, price } = item;
              return (
                <div>
                  <div className="product-container">
                    <div className="check-product">
                      <input
                        type="checkbox"
                        checked={checkboxStates[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                    <div>
                      <img className="books-image" src={bookImage} alt=""></img>
                    </div>
                    <div className="products-info">
                      <div>{name}</div>
                      <div>{price}</div>
                    </div>
                    {/* nút tăng giảm số lượng */}
                    <div style={{ flex: ".5" }}>
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
                            <img
                              src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                              alt=""
                            ></img>
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
                              newInputValue[name] =
                                (newInputValue[name] || 0) + 1;
                              setInputValue(newInputValue);
                            }}
                          >
                            <img
                              src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="product-price">
                      {price * inputValue[name] || 0} đ
                    </div>
                    <div className="trashIcon">
                      <FaRegTrashCan size={17} />
                    </div>
                  </div>
                  <hr style={{ border: "1px solid #C0C0C0" }}></hr>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cart-total">
          <div style={{ padding: "10px" }}>
            <div className="cart-total-header">
              <div>Thành tiền</div>
              <div>{calculateTotalPrice()} đ</div>
            </div>
            <div>
              {checkboxStates.includes(true) ? (
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flexBasis: "65%" }}>
                    Phí vận chuyển (Giao hàng tiêu chuẩn)
                  </div>
                  <div>19000 đ</div>
                </div>
              ) : null}
              <hr
                style={{
                  width: "100%",
                  margin: "3px 0px",
                  border: "1px solid #C0C0C0",
                }}
              ></hr>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div class="title-cart-page-left">Tổng Số Tiền (gồm VAT)</div>
                <div class="number-cart-page-right">{finalTotal()} đ</div>
              </div>
            </div>
            <button
              onClick={() => handlePayment()}
              className={` ${
                !checkboxStates.includes(true) ? "disabled" : "cart-button-pay"
              }`}
              disabled={!checkboxStates.includes(true)}
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
