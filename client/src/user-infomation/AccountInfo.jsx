import { Button, Form, Radio } from "antd";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../util/http";
import "./userPage.css";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "./userPage.css";

const AccountInfo = () => {
  const [getUser, setUser] = useState();
  const [value, setValue] = useState(null);
  const [isSubmit,setIsSubmit]=useState(false)
  const updateUserInfo = () => {
    console.log("vao userInfo");
    http
      .get("/user/detailUser")
      .then((getUser) => {
        setUser(getUser.data);
        setValue(getUser.data.sex)
        console.log("user", getUser);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateUserInfo();
  }, [isSubmit]);
  
  const [form] = Form.useForm();

  const [inputStates, setInputStates] = useState({
    fullName: false,
    email: false,
    phone: false,
  });
  const onFinish = async (values) => {
    console.log("form", values);
    try {
      await form.validateFields(); 
      let newChangedFieldsCount = 0;
      if (form.getFieldValue("fullName") !== getUser.fullName) {
        console.log("fullname");
        newChangedFieldsCount++
            }
      if (form.getFieldValue("phone") !== getUser.phone) {
        console.log("phone");
        newChangedFieldsCount++
            }
      if (value !== getUser.sex && value !== null){
        
        newChangedFieldsCount++
            }
      if (form.getFieldValue("birthday").format("L") !== (getUser.birthday)) {
        console.log("date");
        console.log(form.getFieldValue("birthday").format("L"),"=",new Date(getUser.birthday).toLocaleDateString());
        newChangedFieldsCount++
            }
            console.log("newChange",newChangedFieldsCount);
      if (newChangedFieldsCount === 0) {

        toast.info("Không có thông tin nào được thay đổi");
        return;
      }
      const changedInfo = {
        ...values,
        birthday: form.getFieldValue("birthday").format("L"),
      };
      console.log("thông tin sau thay đổi", changedInfo);
     
      http
        .put("/user/changeInfo", {
          fullName: changedInfo.fullName,
          phone: changedInfo.phone,
          sex: changedInfo.sex,
          birthday: changedInfo.birthday,
        })
        .then((res) => {
        console.log("res",res);
        setIsSubmit(!isSubmit)
        
        console.log("Cập nhật thành công");
        // form.resetFields()
        
         toast.success("Cập nhật thông tin thành công")
        
        })
        .catch((error) => console.log(error));
        
      
      // setTimeout(() => (window.location.href = "/"), 2000);
    } catch (error) {
      // Xử lý lỗi nếu biểu mẫu không hợp lệ
      console.log("Validation error:", error);
    }
  };

  if (!getUser) {
    return <div>Loading...</div>;
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    
  };
 
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      md: { span: 12 },
      lg: { span: 14 },
    },
  };
  const handleInputClick = (fieldName) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [fieldName]: true,
    }));
  };

  const handleInputBlur = (fieldName) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [fieldName]: false,
    }));
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
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
        stacked
      />
      <div className="page-title">
        <h1>THÔNG TIN TÀI KHOẢN</h1>
      </div>
      <div className="line"></div>
      <br />
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        variant="filled"
        initialValues={{
          email: getUser.email,
          fullName: getUser.fullName,
          phone: getUser.phone,
          sex: getUser.sex,
          birthday: moment(getUser.birthday) || "",
        }}
      >
        <Form.Item label="Email" name="email">
          <input disabled className="input-disable" maxLength={60}></input>
        </Form.Item>

        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Thông tin này không được để trống",
            },
          ]}
        >
          <input
            className={inputStates.fullName ? "input-clicked" : "input-blur"}
            onClick={() => handleInputClick("fullName")}
            onBlur={() => handleInputBlur("fullName")}
            value={getUser.fullName}
            maxLength={60}
          ></input>
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: true,
              message: "Thông tin này không được để trống",
            },
          ]}
        >
          <input
            className={inputStates.phone ? "input-clicked" : "input-blur"}
            onClick={() => handleInputClick("phone")}
            onBlur={() => handleInputBlur("phone")}
            value={getUser.phone}
            maxLength={10}
            minLength={8}
          ></input>
        </Form.Item>

        <Form.Item
          label="Giới Tính"
          name="sex"
          rules={[
            {
              required: true,
              message: "Thông tin này không được để trống",
            },
          ]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={"Nam"}>Nam</Radio>
            <Radio value={"Nữ"}>Nữ</Radio>
            <Radio value={"Khác"}>Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Thông tin này không được để trống",
            },
          ]}
          
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button className="save-changed-info" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AccountInfo;
