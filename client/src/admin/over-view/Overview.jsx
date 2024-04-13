import { Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { http } from "../../util/http";
import ChartBar from "./Chart";
import OverviewCustom from "./OverviewCustom";
import Statify from "./Statify";
import "./overview.css";

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
      <Space className="overview" direction="vertical">
        <h2>Tổng Quan</h2>
        <Space className="wrap-overview" direction="horizontal">
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
        <h3>Thống Kê Các Loại Sách</h3>
        <Space className="custom-chart">
          <Statify />
          <ChartBar />
        </Space>
      </Space>
    </>
  );
};

export default Overview;
