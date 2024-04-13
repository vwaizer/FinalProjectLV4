import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http.js";
import "./overview.css";
const Statify = () => {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    http
      .get("/staff/chart")
      .then((database) => setDatabase(database.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(database);
  }, []);

  return (
    <div>
      <Space direction="vertical">
        <Table
          className="statisfy"
          columns={[
            {
              title: "Thể Loại Sách",
              dataIndex: "type",
            },
            {
              title: "Số Lượng ",
              dataIndex: "amount",
            },
          ]}
          dataSource={database}
          pagination={false}
        ></Table>
      </Space>
    </div>
  );
};

export default Statify;
