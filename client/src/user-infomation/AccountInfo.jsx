import { Button, DatePicker, Form, Radio } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { http } from "../util/http";
import "./userPage.css";

import { toast } from "react-toastify";
import "./userPage.css";

const AccountInfo = ({ getUser }) => {
  const onFinishRef = useRef(null);
  const [form] = Form.useForm();
  const [value, setValue] = useState(null);
  const [getUserInfo, setUserInfo] = useState([]);

  const [inputStates, setInputStates] = useState({
    fullName: false,
    email: false,
    phone: false,
  });
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUserInfo) => {
        setUserInfo(getUserInfo.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log("thong tin user", getUserInfo);
  const onFinish = (values) => {
    // console.log("form", values);
    onFinishRef.current = values;
  };
  useEffect(() => {
    form.setFieldsValue({
      fullName: getUserInfo.fullName || " ",
      phone: getUserInfo.phone || " ",
      sex: getUserInfo.sex || " ",
      birthday: moment(getUserInfo.birthday) || " ",
    });
  }, [getUserInfo, form]);
  if (!getUser) {
    return <div>Loading...</div>;
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onClick = async () => {
    try {
      await form.validateFields(); // Kiểm tra tính hợp lệ của biểu mẫu

      const result = onFinishRef.current;
      const formattedBirthday = moment(result.birthday).format("YYYY-MM-DD");
      const changedInfo = { ...result, birthday: formattedBirthday };
      // cập nhật thông tin user
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

  const disabledDate = (current) => {
    const today = moment().startOf("day");
    // So sánh ngày được chọn với ngày hiện tại
    return current && current > today;
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
      >
        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[
            ({ getFieldValue }) => ({
              required: !!getFieldValue("fullName") || !!getUserInfo.fullName,
              message: "Thông tin này không được để trống",
            }),
          ]}
        >
          <input
            defaultValue={getUserInfo.fullName || " "}
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
            ({ getFieldValue }) => ({
              required: !!getFieldValue("phone") || !!getUserInfo.phone,
              message: "Thông tin này không được để trống",
            }),
          ]}
        >
          <input
            defaultValue={getUserInfo.phone || " "}
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
            ({ getFieldValue }) => ({
              required: !!getFieldValue("sex") || !!getUserInfo.sex,
              message: "Thông tin này không được để trống",
            }),
          ]}
        >
          <Radio.Group onChange={onChange} defaultValue={getUserInfo.sex}>
            <Radio value={"Nam"}>Nam</Radio>
            <Radio value={"Nữ"}>Nữ</Radio>
            <Radio value={"Khác"}>Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            ({ getFieldValue }) => ({
              required: !!getFieldValue("birthday") || !!getUserInfo.birthday,
              message: "Thông tin này không được để trống",
            }),
          ]}
          valuePropName="selected"
          getValueFromEvent={(date) =>
            date ? moment(date).format("YYYY-MM-DD") : date
          }
        >
          <DatePicker
            defaultValue={moment(getUserInfo.birthday)}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
          />
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
            onClick={onClick}
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AccountInfo;
