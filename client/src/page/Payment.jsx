import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./payment.css";
import { Input, Radio, ConfigProvider, Checkbox } from "antd";
import { useState } from "react";
import { http } from "../util/http";

function Payment() {
  const [getProduct, setGetProduct] = useState([])
  useEffect(() => {
    http
      .get("/receipt/")
      .then((getProduct) => {
        console.log("pay", getProduct);
        setGetProduct(getProduct.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const boxFillInfo = [
    "Họ và tên người nhận",
    "Email",
    "Số điện thoại",
    "Tỉnh/Thành phố",
    "Quận/Huyện",
    "Phường/Xã",
    "Địa chỉ nhận hàng",
  ];
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [inputValues, setInputValue] = useState({});

  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));

  const onChange = (e) => {
    setShowNoteInput(e.target.checked);
  };
  const handleChange = () => {
    const isAnyInputEmpty = Object.values(inputValues).some((value) => !value);
    if (isAnyInputEmpty) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }  }
  const handleInputChange = (e,inputName) => {
    setInputValue((prevValues)=> ({
      ...prevValues, 
      [inputName]: e.target.value
    })
    )
  }
  return (
    <Layout>
      <div style={{ width: "80%", margin: "auto" }}>
        <div className="box-container">
          <div style={{padding:'10px 20px'}}>
          <div className="check-out-title"> ĐỊA CHỈ GIAO HÀNG </div>
          {boxFillInfo.map((item) => {
            return (
              <div
                style={{
                  width: "65%",
                  display: "flex",
                  padding: "10px 0px",
                }}
                key={item}
              >
                <div style={{ flexBasis: "35%" }}>{item} </div>
                <Input placeholder={`Nhập ${item} `} 
                value={inputValues[item] || ""}
                onChange={(e) => handleInputChange(e, item)}
                onBlur={handleChange()}/>
              </div>
            );
          })}
          </div>
        </div>

        <div className="box-container">
          <div className="space-item">
          <div className="check-out-title"> PHƯƠNG THỨC THANH TOÁN </div>
          <div style={{ marginTop: "10px" }}>
            <ConfigProvider
              theme={{
                components: {
                  Radio: {
                    radioSize: 18,
                    dotSize: 7.5,
                  },
                },
              }}
            >
              <Radio>
                <img className="payment-methods"
                  src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=105522"
                  alt=""
                ></img>
                <span style={{ fontSize: "16px" }}>
                  Thanh toán bằng tiền mặt khi nhận hàng
                </span>
              </Radio>
            </ConfigProvider>
          </div>
        </div>
        </div>

        <div className="box-container">
          <div className="space-item">
          <div className="check-out-title"> THÔNG TIN KHÁC </div>
          <div style={{ marginTop: "10px" }}>
            <Checkbox onChange={onChange}>
              <span style={{ fontSize: "16px" }}>Ghi chú</span>
            </Checkbox>

            {showNoteInput && (
              <div style={{ width: "550px", margin: "10px 0px" }}>
                <Input placeholder="Nhập ghi chú" />
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="box-container">
          <div className="space-item">
          <div className="check-out-title"> KIỂM TRA LẠI ĐƠN HÀNG </div>
          <div>
            {listCheck.map((item) => {
              const { bookImage, name, price,amount } = item;
              return (
                <div
                  style={{
                    margin: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      style={{ width: "120px", height: "130px" }}
                      src={bookImage}
                      alt=""
                    ></img>
                    <div style={{ padding: "0px 15px" }}>{name}</div>
                  </div>

                  <div style={{display:'flex', flexBasis:'30%', border:'1px solid black', justifyContent:'space-between'}}>
                    <div>{price} đ</div>
                    <div>{amount}</div>
                    <div style={{color:'#F39801',fontWeight:'600'}}>{price} đ</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
