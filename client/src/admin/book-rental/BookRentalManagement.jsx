import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./brm.css";
import { http } from "../../util/http";

const BookRentalManagement = () => {
  const [getHireBook, setGetHireBook] = useState([]);

  useEffect(() => {
    http
      .get("/staff/hireBook")
      .then((getHireBook) => setGetHireBook(getHireBook.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(getHireBook);
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Thông Tin Thuê Sách</Typography.Title>
      <Table
        columns={[
          {
            title: "STT",
            dataIndex: "_id",
          },
          {
            title: "Tên KH",
            dataIndex: "userID",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "",
          },
          {
            title: "Tên Sách",
            dataIndex: "bookID",
          },
          {
            title: "Số Lượng",
            dataIndex: "",
          },
          {
            title: "Ngày Thuê",
            dataIndex: "dateIn",
          },
          {
            title: "Ngày Trả",
            dataIndex: "dateOut",
          },
        ]}
        dataSource={getHireBook}
      ></Table>
    </Space>
  );
};

export default BookRentalManagement;
