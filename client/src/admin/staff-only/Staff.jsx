import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http";

const Staff = () => {
    const [getStaff, setGetStaff] = useState([])
 
    useEffect(() => {
    http
      .get("/staff/getAllStaff")
      .then((getStaff) => setGetStaff(getStaff.data))
      .catch((err) => {
        console.log(err);
      });

  }, []);
  console.log(getStaff);
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
            title: "Tên ",
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
        dataSource={getStaff}
        pagination={{
          pageSize: 5
        }}
      ></Table>
    </Space>
  );
};

export default Staff;
