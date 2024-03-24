import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http";

const Staff = () => {
    const [getStaff, setGetStaff] = useState([])
 
    useEffect(() => {
    http
      .get("/staff/user")
      .then((getStaff) => setGetStaff(getStaff.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(getStaff);
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Thông Tin Nhân Viên</Typography.Title>
      <Table
        columns={[
          {
            title: "STT",
            dataIndex: "_id",
          },
          {
            title: "Tên KH",
            dataIndex: "",
          },
          {
            title: "Năm Sinh",
            dataIndex: "",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "",
          },
          {
            title: "Địa Chỉ",
            dataIndex: "",
          },
        ]}
        dataSource={getStaff}
      ></Table>
    </Space>
  );
};

export default Staff;
