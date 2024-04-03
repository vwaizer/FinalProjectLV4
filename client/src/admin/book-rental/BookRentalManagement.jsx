import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./brm.css";
import { http } from "../../util/http";

const BookRentalManagement = () => {
  const [getHireBook, setGetHireBook] = useState([]);

  useEffect(() => {
    http
      .get("/staff/hireBook")
      .then((getHireBook) => {
        const formatData=getHireBook.data.map((item,index)=>{
          console.log(item);
          return {...item,bookName:item?.bookData[0]?.name,userEmail:item?.user[0]?.email,index}
        })
        setGetHireBook(formatData)
      })
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
            dataIndex: "index",
          },
          {
            title: "Mail KH",
            dataIndex: "userEmail",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "",
          },
          {
            title: "Tên Sách",
            dataIndex: "bookName",
          },
          {
            title: "Ngày Thuê",
            dataIndex: "dateIn",
          },
          {
            title: "Ngày Trả",
            dataIndex: "dateOut",
          },
          {
            title:"Tình trạng",
            dataIndex:"status"
          }
        ]}
        dataSource={getHireBook}
      ></Table>
    </Space>
  );
};

export default BookRentalManagement;
