import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";

const ImportAndBrowse = () => {
  const [getImport, setGetImport] = useState([])

  useEffect(() => {
    http
      .get("/staff/getImportedBook")
      .then((getImport) => {
        const formatData=getImport.data.map((item,index)=>{
          return {...item,bookName:item.book.name,index}
        })
        setGetImport(formatData)
      })
      .catch((err) => {
        console.log(err);
      });
    console.table(getImport);
  }, []);
  console.log(getImport);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Nhập Sách</Typography.Title>
      <Table
        columns={[
          {
            title:"Stt",
            dataIndex:"index"
          },
          {
            title: "Mã Hóa Đơn",
            dataIndex: "_id",
          },
          {
            title: "Ngày Nhập",
            dataIndex: "dateIn",
          },
          {
            title: "Số lượng",
            dataIndex: "amount",
          },
          {
            title:"Tình Trạng",
            dataIndex:"status"
          },
          {
            title:"Tên sách",
            dataIndex:"bookName"
          }
        ]}
        dataSource={(getImport)}
      ></Table>
    </Space>
  );
};

export default ImportAndBrowse;
