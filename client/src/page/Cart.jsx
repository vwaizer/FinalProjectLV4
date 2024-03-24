import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./cart.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { http } from "../util/http";
function Cart() {
  const [getAddToCart, setGetAddToCart] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [selectedProducts,setSelectedProducts] = useState([])
  useEffect(() => {
    http
      .get("/receipt/")
      .then((getAddToCart) => {
        console.log(getAddToCart);
        setGetAddToCart(getAddToCart.data);
        setCheckboxStates(Array(getAddToCart.data.length).fill(false));
      })
      .catch((err) => console.log(err));
  }, []);
  const [inputValue, setInputValue] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [updateBooks, setUpdateBooks] = useState(getAddToCart);
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
  const handleInputChange = (event, bookID) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const newInputValue = { ...inputValue };
      newInputValue[bookID] = value;
      setInputValue(newInputValue);

      const newAmount = updateBooks.map((book) => {
        if (book.bookID === bookID) {
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
  // console.log('updateBooks',updateBooks)

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

    const selectedProducts = getAddToCart.filter((item, i) => newCheckboxStates[i]);
    // console.log('Selected Products:', selectedProducts);
    setSelectedProducts(selectedProducts);

  };
  const decreaseQuantity = (bookID, amount) => {
    if (inputValue[bookID] > 1) {
      const newInputValue = { ...inputValue };
      newInputValue[bookID] = (newInputValue[bookID] || amount) - 1;
      setInputValue(newInputValue);
      const newGetAddToCart = getAddToCart.map((item) => {
        if (item.bookID === bookID) {
          return {
            ...item,
            amount: newInputValue[bookID],
          };
        }
        return item;
      });
      setGetAddToCart(newGetAddToCart);
    }
  };
  const increaseQuantity = (bookID, amount) => {
    const newInputValue = { ...inputValue };
    newInputValue[bookID] = (newInputValue[bookID] || amount) + 1;
    setInputValue(newInputValue);
    const newGetAddToCart = getAddToCart.map((item) => {
      if (item.bookID === bookID) {
        return {
          ...item,
          amount: newInputValue[bookID],
        };
      }
      return item;
    });
    setGetAddToCart(newGetAddToCart);
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    getAddToCart.forEach((item, index) => {
      const { price, bookID, amount } = item;
      if (checkboxStates[index]) {
        totalPrice += price * (inputValue[bookID] || amount);
      }
    });
    // console.log('total',totalPrice)
    return totalPrice;
  };
  const finalTotal = () => {
    let hasCheckedProduct = false;
    let totalPrice = 0;

    getAddToCart.forEach((item, index) => {
      if (checkboxStates[index]) {
        hasCheckedProduct = true;
        totalPrice = calculateTotalPrice() + 19.0;
      }
    });
    if (hasCheckedProduct) {
      return totalPrice;
    } else {
      return 0;
    }
  };
  console.log('select',selectedProducts)
  const handlePayment = () => {
    
    if (selectedProducts.length > 0) {
      selectedProducts.map((product)=>{
        const {amount,discount,bookID} = product
        console.log('info',amount,discount,bookID)
        http.post("/receipt/setHistory", { cart: [amount,discount,bookID] })
        .then((response) => {
          window.location.href = "/payment";
        })
        .catch((error) => console.log(error));
      })
      
    }
  };
  return (
    <Layout>
      <div className="cart-container">
        <div className="header-cart-item">
          <h1>GIỎ HÀNG ({getAddToCart.length} sản phẩm)</h1>
          <div className="checked-all-products">
            <div style={{ flex: "2", display: "flex" }}>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
              <span style={{ marginTop: "-4px", marginLeft: "5px" }}>
                Chọn tất cả ({getAddToCart.length} sản phẩm)
              </span>
            </div>
            <div style={{ flex: ".5" }}>Số lượng</div>
            <div style={{ flex: ".65", textAlign: "center" }}>Thành tiền</div>
          </div>

          <div style={{ backgroundColor: "#fff", borderRadius: "7px" }}>
            <div style={{ paddingTop: "10px", paddingRight: "10px" }}>
              {getAddToCart.map((item, index) => {
                const { img, name, price, bookID, amount } = item;
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
                        <img className="books-image" src={img} alt=""></img>
                      </div>
                      <div className="products-info">
                        <div>{name}</div>
                        <div style={{ fontSize: "1.1em", fontWeight: "600" }}>
                          {price} đ
                        </div>
                      </div>
                      {/* nút tăng giảm số lượng */}
                      <div style={{ flex: ".5" }}>
                        <div className="amount-button">
                          <div>
                            <button
                              onClick={() => decreaseQuantity(bookID, amount)}
                            >
                              <img
                                style={{ height: "3px" }}
                                src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/ico_minus2x.png"
                                alt=""
                              ></img>
                            </button>
                            <input
                              type="text"
                              value={inputValue[bookID] || amount}
                              onInput={handleKeyPress}
                              onChange={(event) =>
                                handleInputChange(event, bookID)
                              }
                            />
                            <button
                              onClick={() => increaseQuantity(bookID, amount)}
                            >
                              <img
                                style={{ height: "12px" }}
                                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/ico_plus2x.png"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="product-price">
                        {price * inputValue[bookID] || amount} đ
                      </div>
                      <div className="trashIcon">
                        <FaRegTrashCan size={17} />
                      </div>
                    </div>
                    <div className="border-space-product"></div>
                  </div>
                );
              })}
            </div>
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
                  <div>19.00 đ</div>
                </div>
              ) : null}
              <div
                className="border-space-product"
                style={{ marginBottom: "10px" }}
              ></div>
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
