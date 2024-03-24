import React from "react";
import "./layoutadmin.css";
import AdminPage from "../admin-page/AdminPage";
import { Space } from "antd";
import SideMenu from "../SideMenu";
import PageContent from "../PageContent";

const LayoutAdmin = () => {
  return (
    <div className="layout">
      <AdminPage />
      <Space className="side_pagecontent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
    </div>
  );
};

export default LayoutAdmin;
