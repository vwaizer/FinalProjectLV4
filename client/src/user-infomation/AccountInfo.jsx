import { Button, Form, Radio } from "antd";
import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../util/http";
import "./userPage.css";
import moment from "moment";
import { toast } from "react-toastify";
import "./userPage.css";

const AccountInfo = ({ getUser }) => {
  const [value, setValue] = useState(null);
  const [form] = Form.useForm();
  const [inputStates, setInputStates] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  const onFinish = async(values) => {
    console.log("form", values);
    try {
      await form.validateFields(); // Kiểm tra tính hợp lệ của biểu mẫu

      const changedInfo = { ...values, birthday: values.birthday.format("YYYY") };
      console.log("thông tin sau thay đổi", changedInfo);
      http
        .put("/user/changeInfo", {
          fullName: changedInfo.fullName,
          // email: changedInfo.email,
          phone: changedInfo.phone,
          sex: changedInfo.sex,
          birthday: changedInfo.birthday,
        })
        .catch((error) => console.log(error));
      console.log("Cập nhật thành công");
      toast.success("Cập nhật thông tin thành công");
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
          birthday: moment(getUser.birthday) || ""
        }}
      >
<Form.Item
          label="Email"
          name="email"
        >
          <input
          disabled
            className="input-disable"
            // onClick={() => handleInputClick("fullName")}
            // onBlur={() => handleInputBlur("fullName")}
            maxLength={60}
          ></input>
        </Form.Item>

        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Thông tin này không được để trống",
            }
          ]}
        >
          <input
            className={inputStates.fullName ? "input-clicked" : "input-blur"}
            onClick={() => handleInputClick("fullName")}
            onBlur={() => handleInputBlur("fullName")}
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
            }
          ]}
        >
          <input
            className={inputStates.phone ? "input-clicked" : "input-blur"}
            onClick={() => handleInputClick("phone")}
            onBlur={() => handleInputBlur("phone")}
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
            }
          ]}
        >
          <Radio.Group onChange={onChange}>
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
            }
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
          <Button
            className="save-changed-info"
            htmlType="submit"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AccountInfo;
