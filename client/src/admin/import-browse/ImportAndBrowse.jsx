import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";

const ImportAndBrowse = () => {
  const [getImport, setGetImport] = useState([])

  useEffect(() => {
    http
      .get("/book")
      .then((getImport) => setGetImport(getImport.data))
      .catch((err) => {
        console.log(err);
      });
    console.table(getImport);
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Nhập Sách</Typography.Title>
      <Table
        columns={[
          {
            title: "Số Hóa Đơn",
            dataIndex: "",
          },
          {
            title: "Loại Sách",
            dataIndex: "",
          },
          {
            title: "Số Lượng",
            dataIndex: "",
          },
          {
            title: "Ngày Nhập",
            dataIndex: "",
          },
        ]}
        dataSource={getImport}
      ></Table>
    </Space>
  );
};

export default ImportAndBrowse;
