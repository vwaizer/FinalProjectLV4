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
      <Space size={"large"} style={{display:"flex",flexDirection:"row",justifyContent:"start",alignItems:"start"}}>
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </Space>
    </div>
  );
};

export default LayoutAdmin;
