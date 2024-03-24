import React, { useEffect, useState } from "react";
import AdminPage from "../admin-page/AdminPage";
import "./staffanduser.css";
import { Space, Table, Typography } from "antd";
import { http } from "../../util/http";

const StaffAndUser = () => {
  const [getUser, setGetUser] = useState([]);

  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => setGetUser(getUser.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(getUser);
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Thông Tin Khách Hàng</Typography.Title>
      <Table
        columns={[
          {
            title: "STT",
            dataIndex: "_id",
          },
          {
            title: "Tên KH",
            dataIndex: "fullName",
          },
          {
            title: "Năm Sinh",
            dataIndex: "birthday",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "phone",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
        ]}
        dataSource={getUser}
      ></Table>
    </Space>
  );
};

export default StaffAndUser;
