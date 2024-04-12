import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import "./cart.css";

function Cart() {
  const [getAddToCart, setGetAddToCart] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    http
      .get("/receipt/")
      .then((getAddToCart) => {
        console.log("cart", getAddToCart);
        setGetAddToCart(getAddToCart.data);
        setCheckboxStates(Array(getAddToCart.data[0]?.cart?.length).fill(false));
      })
      .catch((err) => console.log(err));
  }, [isDeleted]);
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

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
    const newCheckboxStates = checkboxStates.map(() => !selectAllChecked);
    setCheckboxStates(newCheckboxStates);
    const selectedProduct = getAddToCart[0]?.cart?.filter(
      (item, i) => newCheckboxStates[i]
    );
    setSelectedProducts(selectedProduct);
    console.log("all", selectedProduct);
  };
  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
    const allChecked = newCheckboxStates.every((checked) => checked);
    setSelectAllChecked(allChecked);

    const selectedProducts = getAddToCart[0]?.cart?.filter(
      (item, i) => newCheckboxStates[i]
    );
    setSelectedProducts(selectedProducts);
  };
  const decreaseQuantity = (bookID, amount) => {
    if (inputValue[bookID] > 1) {
      const newInputValue = { ...inputValue };
      newInputValue[bookID] = (newInputValue[bookID] || amount) - 1;
      setInputValue(newInputValue);
      setGetAddToCart((prevState) => {
        const updatedCart = prevState[0]?.cart?.map((item) => {
          if (item.bookID === bookID) {
            return {
              ...item,
              amount: newInputValue[bookID],
            };
          }
          return item;
        });

        const newGetAddToCart = [...prevState];
        newGetAddToCart[0].cart = updatedCart;
        return newGetAddToCart;
      });
    }
  };
  const increaseQuantity = (bookID, amount) => {
    const newInputValue = { ...inputValue };
    newInputValue[bookID] = (newInputValue[bookID] || amount) + 1;
    setInputValue(newInputValue);
    setGetAddToCart((prevState) => {
      const updatedCart = prevState[0]?.cart?.map((item) => {
        if (item.bookID === bookID) {
          return {
            ...item,
            amount: newInputValue[bookID],
          };
        }
        return item;
      });

      const newGetAddToCart = [...prevState];
      newGetAddToCart[0].cart = updatedCart;
      return newGetAddToCart;
    });
  };
  const calculateTotalPrice = (selectedProducts) => {
    let totalPrice = 0;
    if (selectedProducts?.length > 0) {
      selectedProducts.forEach((item) => {
        const { price, bookID, amount } = item;
        totalPrice += price * (inputValue[bookID] || amount);
      });
    }
    const formattedNumber = (totalPrice * 1000).toLocaleString("vi-VN");
    const result = formattedNumber.replace(",", ".");
    return result;
  };
  const finalTotal = (selectedProducts) => {
    if (selectedProducts.length > 0) {
      const totalPrice = selectedProducts.reduce((total, item) => {
        const { price, bookID, amount } = item;
        const itemPrice = price * (inputValue[bookID] || amount);
        return total + itemPrice;
      }, 0);
      const totalPriceWithShipping = totalPrice + 19.0;
      const formattedNumber = (totalPriceWithShipping * 1000).toLocaleString(
        "vi-VN"
      );
      const result = formattedNumber.replace(",", ".");
      return result;
    }
    return "0";
  };
  const handlePayment = () => {
    if (selectedProducts.length > 0) {
      localStorage.setItem("BoughtList", JSON.stringify(selectedProducts));
      window.location.href = "/thanh-toan";
    }
  };
  const backToProduct = () => {
    window.location.href = "/nha-sach";
  };
  const deleteCartItem = async (bookID) => {
    console.log(bookID);
    try {
      const result = await http.post("/receipt/deleteItem", {
        deleteItem: [bookID],
      });
      console.log(result.data);
      setIsDeleted(!isDeleted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {getAddToCart[0]?.cart?.length ? (
        <>
          <div className="cart-container">
            <div className="header-cart-item">
              <h1>GIỎ HÀNG ({getAddToCart[0]?.cart?.length} sản phẩm)</h1>
              <div className="checked-all-products">
                <div style={{ flex: "2", display: "flex" }}>
                  <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChange}
                  />
                  <span style={{ marginTop: "-4px", marginLeft: "5px" }}>
                    Chọn tất cả ({getAddToCart[0]?.cart?.length} sản phẩm)
                  </span>
                </div>
                <div style={{ flex: ".5" }}>Số lượng</div>
                <div style={{ flex: ".65", textAlign: "center" }}>
                  Thành tiền
                </div>
              </div>

              <div style={{ backgroundColor: "#fff", borderRadius: "7px" }}>
                <div style={{ paddingTop: "10px", paddingRight: "10px" }}>
                  {getAddToCart[0]?.cart?.map((item, index) => {
                    const { price, bookID, amount, name, img } = item;
                    const formattedNumber = (price * 1000).toLocaleString(
                      "vi-VN"
                    );
                    const priceFormatted = formattedNumber.replace(",", ".");
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
                            <div
                              style={{ fontSize: "1.1em", fontWeight: "600" }}
                            >
                              {priceFormatted} đ
                            </div>
                          </div>
                          {/* nút tăng giảm số lượng */}
                          <div style={{ flex: ".5" }}>
                            <div className="amount-button">
                              <div>
                                <button
                                  onClick={() =>
                                    decreaseQuantity(bookID, amount)
                                  }
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
                                  maxLength={3}
                                />
                                <button
                                  onClick={() =>
                                    increaseQuantity(bookID, amount)
                                  }
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
                            {(
                              parseFloat(priceFormatted.replace(".", "")) *
                              (inputValue[bookID] || amount)
                            ).toLocaleString("vi-VN")}
                            đ
                          </div>
                          <div className="trashIcon">
                            <FaRegTrashCan
                              onClick={() => deleteCartItem(bookID)}
                              size={17}
                            />
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
                  <div>{calculateTotalPrice(selectedProducts)} đ</div>
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div class="title-cart-page-left">
                      Tổng Số Tiền (gồm VAT)
                    </div>
                    <div class="number-cart-page-right">
                      {finalTotal(selectedProducts)} đ
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePayment()}
                  className={` ${
                    !checkboxStates.includes(true)
                      ? "disabled"
                      : "cart-button-pay"
                  }`}
                  disabled={!checkboxStates.includes(true)}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
          <div className="rate"></div>
        </>
      ) : (
        <>
          <div className="cart-container">
            <div className="header-cart-item">
              <h1>GIỎ HÀNG (0 sản phẩm)</h1>
              <div className="empty-box">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "40px 0px",
                  }}
                >
                  <img
                    style={{ width: "160px", margin: "3px auto" }}
                    src="https://cdn0.fahasa.com/skin//frontend/ma_vanese/fahasa/images/checkout_cart/ico_emptycart.svg"
                    alt=""
                  ></img>
                  <span> Chưa có sản phẩm trong giỏ hàng của bạn.</span>
                  <button
                    onClick={backToProduct}
                    className="back-shopping-button"
                  >
                    MUA SẮM NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Cart;
