import { Badge, Image, Space, Typography } from "antd";
import React from "react";
import { FaRegBell } from "react-icons/fa6";
import "./admin-page.css";
const AdminPage = () => {
  return (
    <div className="adminpage">
      <div className="header">
        <Image
          width={100}
          src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
        ></Image>
        <Typography.Title>ADMIN PAGE</Typography.Title>
        <Space>
          <Badge count={0} dot>
            <FaRegBell style={{ fontSize: 30}} />
          </Badge>
        </Space>
      </div>
    </div>
  );
};

export default AdminPage;
