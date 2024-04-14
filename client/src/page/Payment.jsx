import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import "./payment.css";
import {
  Input,
  Radio,
  ConfigProvider,
  Checkbox,
  Form,
  Button,
  Modal,
} from "antd";
import { useState } from "react";
import { http } from "../util/http";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 22,
    },
    sm: {
      span: 14,
    },
    lg: {
      span: 10,
    },
    xl: {
      span: 8,
    },
  },
};

function Payment() {
  const [getProduct, setGetProduct] = useState([]);
  const [getAddress, setAddress] = useState([]);
  const [getUser, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddress, setSellectedAddress] = useState(null);
  const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));
  const navigate = useNavigate()
  const handleAddAddress = () => {
    navigate("/user");
  };
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
        console.log("địa chỉ", getAddress.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [form] = Form.useForm();
  const [formNote] = Form.useForm();
  const [formPayment] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      userName: selectedAddress?.fullName || defaultAddress?.fullName || getUser?.fullName || "",
      email: getUser?.email || "",
      phoneNumber: selectedAddress?.phone || defaultAddress?.phone || getUser?.phone || "",
      city: selectedAddress?.city || defaultAddress?.city || "",
      district: selectedAddress?.district || defaultAddress?.district || "",
      ward: selectedAddress?.ward || defaultAddress?.ward || "",
      address: selectedAddress?.address || defaultAddress?.address || "",
    });
  }, [defaultAddress, getUser, form, selectedAddress]);
  // console.log("user", getUser);
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => {
        setUser(getUser.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log("get user", getUser);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSaveButtonDisabled = getUser.address?.length === 0;   
  
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);
  const changedAddress = (e) => {
    setTempSelectedAddress(e.target.value);
    console.log("chọn địa chỉ", tempSelectedAddress);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setSellectedAddress(tempSelectedAddress);
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of listCheck) {
      const { price, amount } = item;
      totalPrice += price * amount;
    }

    return parseFloat(totalPrice + 19.0);
  };

  const onChangeNote = (e) => {
    setShowNoteInput(e.target.checked);
    console.log(e.target.checked);
  };
  const onChangePayment = (e) => {
    // setShowNoteInput(e.target.value);
    console.log(e.target.value);
  };
  useEffect(() => {
    console.log(showNoteInput);
  }, [showNoteInput]);
  const validateAndSubmitForm = async () => {
    try {
      if (showNoteInput) {
        await Promise.all([
          form.validateFields(),
          formNote.validateFields(),
          formPayment.validateFields(),
        ]);

        onFinish(
          form.getFieldsValue(),
          formNote.getFieldValue(),
          formPayment.getFieldValue()
        );
      } else {
        await Promise.all([
          form.validateFields(),
          formPayment.validateFields(),
        ]);

        onFinish(form.getFieldsValue(), formPayment.getFieldValue());
      }
      // Additional logic if needed
    } catch (error) {
      // Handle error
    }
  };
  const onCartPayment = async (listItem) => {
    try {
      const result = await http.post("/receipt/payment", {
        items: [...listItem],
      });
      console.log("url", result.data.url);
      return result.data.url;
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async (formValues) => {
    console.log("thông tin từ form: ", formValues);
    const noteValues = formNote.getFieldsValue();
    console.log("thông tin từ note: ", noteValues);
    const paymentValues = formPayment.getFieldsValue();
    console.log("thông tin từ payment: ", paymentValues);
    let result;
    console.log("listCheck", listCheck);
    const listItem = listCheck.map((item, index) => {
      return {
        name: item.name,
        price: parseFloat(item.price),
        amount: parseInt(item.amount),
      };
    });
    if (paymentValues.paymentMethod === "visa") {
      const url = await onCartPayment(listItem);
      
      setTimeout(() => (window.location.href = `${url}`), 1000);
    } else {
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
            <div className="check-out-title">
              <div className="info-address">
                <div>ĐỊA CHỈ GIAO HÀNG</div>{" "}
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "200",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={showModal}
                >
                  Thay đổi địa chỉ
                </div>
                <Modal
                  title="Địa chỉ của bạn"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="cancel" onClick={handleCancel}>
                      Hủy
                    </Button>,
                    <Button key="saveAddress" type="primary" onClick={handleOk}  disabled={isSaveButtonDisabled}>
                      Lưu thông tin
                    </Button>,
                    <Button key='navToAddressEdit' onClick={handleAddAddress}>Thêm địa chỉ</Button>
                    ]}
                >
                  {" "}
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {getUser.address.length ? (
                        <Radio.Group onChange={(e) => changedAddress(e)}>
                          {getUser.address.map((userAddress, index) => {
                            const {
                              address,
                              district,
                              city,
                              phone,
                              fullName,
                              ward,
                            } = userAddress;
                            return (
                              <div
                                style={{ display: "flex" }}
                                key={userAddress.id}
                              >
                                <Radio
                                  style={{ marginBottom: "10px" }}
                                  value={userAddress}
                                >
                                  <div style={{ display: "flex" }}>
                                    <div style={{ marginRight: "3px" }}>
                                      {fullName}
                                    </div>{" "}
                                    |
                                    <div style={{ paddingLeft: "3px" }}>
                                      {phone}
                                    </div>
                                  </div>
                                  <div style={{ display: "flex" }}>
                                    <div>{address}</div>
                                    <div style={{ marginLeft: "3px" }}>
                                      {ward}
                                    </div>
                                    <div style={{ marginLeft: "3px" }}>
                                      {district}
                                    </div>
                                    <div style={{ marginLeft: "3px" }}>
                                      {city}
                                    </div>
                                  </div>
                                </Radio>
                              </div>
                            );
                          })}
                        </Radio.Group>
                      ) : (
                        <div>Bạn chưa có địa chỉ</div>
                      )}
                    </>
                  )}
                </Modal>
              </div>
            </div>

            <div className="form-container">
              <Form
                style={{ width: "60%", marginLeft: "5%" }}
                form={form}
                {...formItemLayout}
              >
                <Form.Item
                  name="userName"
                  label="Họ và tên người nhận "
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống!",
                    },
                  ]}
                >
                  <input className="input-payment" maxLength={60}></input>
                </Form.Item>

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
                  <input className="input-payment" maxLength={60}></input>
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
                  <input
                    className="input-payment"
                    maxLength={10}
                    minLength={8}
                  ></input>
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
                  {/* <Input /> */}
                  <input className="input-payment" maxLength={60}></input>
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
                  {/* <Input /> */}
                  <input className="input-payment" maxLength={60}></input>
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
                  {/* <Input /> */}
                  <input className="input-payment" maxLength={60}></input>
                  {/* {console.log("user", getUser)} */}
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
                  <input className="input-payment" maxLength={100}></input>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="box-container">
          <div className="space-item">
            <div className="check-out-title"> PHƯƠNG THỨC THANH TOÁN </div>
            <div>
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
                <Form form={formPayment}>
                  <Form.Item
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin này không được để trống",
                      },
                    ]}
                  >
                    <Radio.Group onChange={onChangePayment}>
                      <Radio style={{ padding: "15px 0" }} value={"tiền mặt"}>
                        <img
                          className="payment-methods"
                          src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_cashondelivery.svg?q=105522"
                          alt=""
                        ></img>
                        <span style={{ fontSize: "16px" }}>
                          Thanh toán bằng tiền mặt khi nhận hàng
                        </span>
                      </Radio>
                      <br></br>
                      <br></br>
                      <Radio value={"visa"}>
                        <img
                          className="payment-methods"
                          src="https://cdn0.fahasa.com/skin/frontend/base/default/images/payment_icon/ico_zalopaycc.svg?q=105577"
                          alt=""
                        ></img>
                        <span style={{ fontSize: "16px" }}>
                          Visa / Master / JCB
                        </span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="box-container">
          <div className="space-item">
            <div className="check-out-title"> THÔNG TIN KHÁC </div>
            <div style={{ marginTop: "10px" }}>
              <Checkbox onChange={(e) => onChangeNote(e)}>
                <span style={{ fontSize: "16px" }}>Ghi chú</span>
              </Checkbox>

              {showNoteInput && (
                <Form form={formNote}>
                  <Form.Item
                    name="note"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin này không được bỏ trống",
                      },
                    ]}
                  >
                    <div style={{ width: "550px", marginTop: "10px" }}>
                      <Input placeholder="Nhập ghi chú" maxLength={100} />
                    </div>
                  </Form.Item>
                </Form>
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
            <div className="title-total-ship">
              <div style={{ color: "black", fontWeight: "400" }}>
                Phí ship:{" "}
              </div>
              <div>Tổng cộng: </div>
            </div>
            <div className="price-total-ship">
              <div
                style={{ color: "black", fontWeight: "400", fontSize: "18px" }}
              >
                19.000 đ
              </div>
              <div>{calculateTotalPrice()}.000 đ </div>
            </div>
          </div>

          <div className="confirm-form">
            <div>
              <u>
                Nhấn "Xác nhận thanh toán" đồng nghĩa với việc bạn đồng ý tuân
                theo Điều khoản
              </u>
            </div>
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
