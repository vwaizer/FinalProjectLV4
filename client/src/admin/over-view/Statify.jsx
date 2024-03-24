import { Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http.js";

const Statify = () => {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    http
      .get("/staff/overall")
      .then((database) => setDatabase(database.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(database);
  }, []);

  return (
    <>
      <Typography.Text>Kiểm Tra</Typography.Text>
      <Table
        columns={[
          {
            title: "Hóa Đơn",
            dataIndex: "receiptNumber",
          },
          {
            title: "Người Dùng",
            dataIndex: "userNumber",
          },
          {
            title: "Số Lượng Sách",
            dataIndex: "bookNumber",
          },
        ]}
        dataSource={database}
      ></Table>
    </>
  );
};

export default Statify;
