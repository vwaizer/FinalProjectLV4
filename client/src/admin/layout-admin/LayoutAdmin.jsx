import React from "react";
import "./layoutadmin.css";
import AdminPage from "../admin-page/AdminPage";
import { Space } from "antd";
import SideMenu from "../SideMenu";
import PageContent from "../PageContent";
import AdminRoute from "../AdminRoute";
import { Link } from "react-router-dom";

const LayoutAdmin = () => {

  const handleLogOut = () => {
    localStorage.removeItem("staff")
    window.location.href = "/staff"
  }
  return (
    <div className="layout">
      <AdminPage />
      <Space className="side_pagecontent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <div className="button">
        <button onClick={handleLogOut} type="button" className="btn">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default LayoutAdmin;
