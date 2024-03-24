import { Space, Typography } from "antd";
import React from "react";
import { CiImport, CiMoneyBill } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { PiBooksBold } from "react-icons/pi";
import OverviewCustom from "./OverviewCustom";
import "./overview.css";
import Chart from "./Chart";
import Statify from "./Statify";

const Overview = () => {
  return (
    <>
      <Space size={20} direction="vertical">
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
            value="12345"
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
            value="12345"
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
            value="12345"
          />
        </Space>
        <Space size={20}>
          <Statify/>
          <Chart />
        </Space>
      </Space>
    </>
  );
};



export default Overview;
