import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";

const ImportAndBrowse = () => {
  const [getImport, setGetImport] = useState([]);

  useEffect(() => {
    http
      .get("/staff/getImportedBook")
      .then((getImport) => {
        const formatData = getImport.data.map((item, index) => {
          return { ...item, bookName: item.book.name };
        });
        setGetImport(formatData);
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
            title: "Mã Hóa Đơn",
            dataIndex: "_id",
          },
          {
            title: "Tên KH",
            dataIndex: "userID",
          },
          {
            title: "Tên sách",
            dataIndex: "bookName",
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
            title: "Tình Trạng",
            dataIndex: "status",
          },
          {
            title: "",
            dataIndex: "",
            render: (record) => {
              return (
                <>
                  <button
                    style={{
                      border: "1px solid #000",
                      borderRadius: "5px",
                      width: "100px",
                      height: "50px",
                    }}
                    type="button"
                  >
                    Check
                  </button>
                </>
              );
            },
          },
        ]}
        dataSource={getImport}
      ></Table>
    </Space>
  );
};

export default ImportAndBrowse;
