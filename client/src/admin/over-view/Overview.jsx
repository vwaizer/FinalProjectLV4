import { Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import Chart from "./Chart";
import OverviewCustom from "./OverviewCustom";
import Statify from "./Statify";
import "./overview.css";
import { http } from "../../util/http";
import LayoutAdmin from "../layout-admin/LayoutAdmin";

const Overview = () => {
  const [bill, setBill] = useState([]);
  const [user, setUser] = useState(0);
  const [book, setBook] = useState(0);

  useEffect(() => {
    http
      .get("/staff/overall")
      .then((bill) => setBill(bill.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(bill);
  }, []);

  useEffect(() => {
    http
      .get("/staff/overall")
      .then((user) => setUser(user.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(user);
  }, []);

  useEffect(() => {
    http
      .get("/staff/overall")
      .then((book) => setBook(book.data))
      .catch((err) => {
        console.log(err);
      });
    console.log(book);
  }, []);
  return (
    <>
      <Space size={25} direction="vertical">
        <Typography.Title level={4}>Tổng Quan</Typography.Title>
        <Space direction="horizontal">
          <OverviewCustom
            icon={
              <CiMoneyBill
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,225,0.25)",
                  borderRadius: 80,
                  fontSize: 70,
                  padding: 8,
                }}
              />
            }
            title="Hóa Đơn"
            value={bill.receiptNumber}
              
          />
          <OverviewCustom
            icon={
              <FaUserGroup
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,100,100,0.25)",
                  borderRadius: 80,
                  fontSize: 70,
                  padding: 8,
                }}
              />
            }
            title="Người Dùng"
            value={user.userNumber}
          />
          <OverviewCustom
            icon={
              <PiBooksBold
                style={{
                  color: "red",
                  backgroundColor: "rgba(249, 239, 128, 0.758)",
                  borderRadius: 80,
                  fontSize: 70,
                  padding: 8,
                }}
              />
            }
            title="Số Lượng Sách"
            value={book.bookNumber}
          />
        </Space>
        <Space size={40}>
          <Statify/>
          <Chart />
        </Space>
      </Space>
   </>
  );
};



export default Overview;
