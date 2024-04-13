import { Badge, Image, Space, Typography } from "antd";
import React from "react";
import { FaRegBell } from "react-icons/fa6";
import "./admin-page.css";
const AdminPage = () => {
  return (
    <div className="adminpage">
      <div className="header">
        <img
          src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
          alt="logo"
        ></img>
        <Typography.Title style={{textAlign: "center", marginTop: "10px"}}>ADMINISTRATION</Typography.Title >
        <Space>
          <Badge count={0}>
            <button type="button"><FaRegBell style={{ fontSize: 25, textAlign: "center" }} /></button>
          </Badge>
        </Space>
      </div>
    </div>
  );
};

export default AdminPage;
