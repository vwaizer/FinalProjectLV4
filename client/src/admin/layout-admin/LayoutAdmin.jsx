import { Space } from "antd";
import React from "react";
import PageContent from "../PageContent";
import SideMenu from "../SideMenu";
import AdminPage from "../admin-page/AdminPage";
import FooterPage from "../footer/FooterPage";
import "./layoutadmin.css";

const LayoutAdmin = () => {
  return (
    <div className="layout">
      <AdminPage />
      <Space size={"large"} className="side_pagecontent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
      <FooterPage/>
    </div>
  );
};

export default LayoutAdmin;
