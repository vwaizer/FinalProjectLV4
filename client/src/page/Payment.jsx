import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./payment.css";
import { Input, Radio, ConfigProvider, Checkbox, Form } from "antd";
import { useState } from "react";
import { http } from "../util/http";
import { ToastContainer, toast } from "react-toastify";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CustomizedForm = ({ onChange, fields }) => (
  <Form
    style={{ marginLeft: "33px" }}
    {...formItemLayout}
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          required: true,
          message: "Thông tin này không được để trống!",
        },
      ]}
    >
      <Input placeholder="Nhập email" />
    </Form.Item>
  </Form>
);
function Payment() {
  const [getProduct, setGetProduct] = useState([]);
  const [getAddress, setAddress] = useState([])
  const [getUser, setUser] = useState([]);
  const [fields, setFields] = useState([
    {
      name: ["email"],
      value: "",
    },
  ]);
  useEffect(() => {
    http
      .get("/receipt/")
      .then((getProduct) => {
        console.log("pay", getProduct);
        setGetProduct(getProduct.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    http
      .get("/user/address")
      .then((getAddress) => {
        setAddress(getAddress.data);
        console.log("địa chỉ", getAddress.data  );
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => {
        setUser(getUser.data);
        setFields([{ name: ["email"], value: getUser.data.email }]);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log("get user", getUser);

  const [showNoteInput, setShowNoteInput] = useState(false);

  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));
  const [form] = Form.useForm();
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of listCheck) {
      const { price, amount } = item;
      totalPrice += price * amount;
    }

    return parseFloat(totalPrice + 19.0);
  };

  const onChange = (e) => {
    setShowNoteInput(e.target.checked);
  };
  const validateAndSubmitForm = async () => {
    try {
      await form.validateFields(); 
      onFinish(form.getFieldsValue());
    } catch (error) {
      console.log(error)
    }
  };

  const onFinish = (values) => {
    let newCart;
    newCart = listCheck.map((product) => {
      const { amount, discount, bookID } = product;
      return { amount: amount, discount: discount, bookID: bookID };
    });
    http
      .post("/receipt/setHistory", { cart: newCart })
      .catch((error) => console.log(error));

    toast.success("Mua hàng thành công");
    setTimeout(() => (window.location.href = "/"), 2000);
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
            <div className="form-container">
              <Form form={form} {...formItemLayout}>
                <Form.Item
                  name="userName"
                  label={
                    <div className="style-lable">Họ và tên người nhận</div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập Họ và tên người nhận" />
                </Form.Item>
                <Form.Item>
                  <CustomizedForm
                    fields={fields}
                    onChange={(newFields) => {
                      setFields(newFields);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="Thành phố"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="district"
                  label="Quận/huyện"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="ward"
                  label="Phường/xã"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </div>
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
            <div className="check-out-title"> KIỂM TRA LẠI ĐƠN HÀNG </div>
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
          <div
            style={{ borderBottom: "1px solid #ced4da", margin: "0px 20px" }}
          ></div>
          <div
            style={{
              display: "flex",
              margin: "0px 50px",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
          >
            <h2 style={{ color: "brown" }}>Tổng cộng: </h2>
            <h2
              style={{
                color: "#F39801",
                marginBottom: "0px",
                flexBasis: "19%",
              }}
            >
              {calculateTotalPrice()}.000 đ{" "}
            </h2>
          </div>

          <div
            style={{
              display: "flex",
              margin: "0px 50px",
              justifyContent: "space-between",
              paddingBottom: "20px",
              alignItems: "center",
            }}
          >
            <u>
              Nhấn "Xác nhận thanh toán" đồng nghĩa với việc bạn đồng ý tuân
              theo Điều khoản
            </u>
            <button
              className="confirm-button-pay"
              onClick={validateAndSubmitForm}
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;
