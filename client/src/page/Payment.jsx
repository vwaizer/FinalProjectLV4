import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./payment.css";
import { Input, Radio, ConfigProvider, Checkbox } from "antd";
import { useState } from "react";
import { http } from "../util/http";
import { ToastContainer, toast } from "react-toastify";
const Form = ({ title, value, onInputChange }) => {
  return (
    <>
      <div className="form-container" key={title}>
        <div style={{ flexBasis: "35%" }}>{title} </div>
        <Input
          placeholder={`Nhập ${title} `}
          value={value}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

function Payment() {
  const initialForm = {
    userName: "",
    email: "",
    phoneNumber: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  };
  // console.log("init", initialForm);
  const [getProduct, setGetProduct] = useState([]);
  const [fillForm, setFillForm] = useState(initialForm);
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

  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));

  const calculateTotalPrice = () => {
    let totalPrice = 0;
  
    for (const item of listCheck) {
      const { price, amount } = item;
      totalPrice += price * amount;
    }
  
    return parseFloat(totalPrice + 19.00);
  };

  const onChange = (e) => {
    setShowNoteInput(e.target.checked);
  };
  const handleChange = (key, event) => {
    const value = event.target.value;
    setFillForm({ ...fillForm, [key]: value });
  };

  const addClick = () => {
    if (
      !fillForm.userName ||
      !fillForm.email ||
      !fillForm.phoneNumber ||
      !fillForm.city ||
      !fillForm.district ||
      !fillForm.ward ||
      !fillForm.address
    ) {
      alert("Vui long dien day du thong tin ");
    }else if(isNaN(fillForm.phoneNumber) || fillForm.phoneNumber.length < 10){
      alert("Số điện thoại không hợp lệ");
    }
    else{
      let newCart;
      newCart = listCheck.map((product) => {
        const { amount, discount, bookID } = product;
        return { amount: amount, discount: discount, bookID: bookID };
      });
      http
        .post("/receipt/setHistory", { cart: newCart })
        .catch((error) => console.log(error));
      localStorage.removeItem('BoughtList')
      toast.success("Mua hàng thành công")
      setTimeout(()=>window.location.href="/",2000)
    }
  };

  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ width: "80%", margin: "auto" }}>
        <div className="box-container">
          <div style={{ padding: "10px 20px" }}>
            <div className="check-out-title"> ĐỊA CHỈ GIAO HÀNG </div>
            <Form
              title="Họ và tên người nhận"
              value={fillForm.userName}
              onInputChange={(e) => handleChange("userName", e)}
            />
            <Form
              title="Email"
              value={fillForm.email}
              onInputChange={(e) => handleChange("email", e)}
            />
            <Form
              title="Số điện thoại"
              value={fillForm.phoneNumber}
              onInputChange={(e) => handleChange("phoneNumber", e)}
            />
            <Form
              title="Thành phố"
              value={fillForm.city}
              onInputChange={(e) => handleChange("city", e)}
            />
            <Form
              title="Quận/huyện"
              value={fillForm.district}
              onInputChange={(e) => handleChange("district", e)}
            />
            <Form
              title="Phường/xã"
              value={fillForm.ward}
              onInputChange={(e) => handleChange("ward", e)}
            />
            <Form
              title="Địa chỉ"
              value={fillForm.address}
              onInputChange={(e) => handleChange("address", e)}
            />
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
                  <img
                    className="payment-methods"
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
            <div className="check-out-title"> KIỂM TRA LẠI ĐƠN HÀNG </div>;
            <div>
            {listCheck.map((item, index) => {
  const { name, price, amount, img } = item;
  return (
    <div
      key={name} 
      style={{
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
                    <div style={{ display: "flex" }}>
                      <img className="product-image" src={img} alt=""></img>
                      <div style={{ padding: "0px 15px" }}>{name}</div>
                    </div>

                    <div className="total-amount-box">
                      <div>{price} đ</div>
                      <div>{amount}</div>
                      <div style={{ color: "#F39801", fontWeight: "bold" }}>
                        {parseFloat(price * amount)}.000 đ
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{borderBottom: '1px solid #ced4da',margin:'0px 20px' }}></div>
          <div style={{display:'flex',margin:'0px 50px', justifyContent:'space-between',marginTop:'15px'}} >
          <h2 style={{color:'brown'}}>Tổng cộng: </h2>
          <h2 style={{color: "#F39801",marginBottom:'0px',flexBasis:'19%'}}>{calculateTotalPrice()}.000 đ </h2>
          </div>
  
          <div style={{display:'flex',margin:'0px 50px', justifyContent:'space-between', paddingBottom:'20px', alignItems:'center'}}>
            <u>Nhấn "Xác nhận thanh toán" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản</u>
            <button className="confirm-button-pay" onClick={addClick}>Xác nhận thanh toán</button>
          </div>
        </div>
       
      </div>
    </Layout>
  );
}

export default Payment;
