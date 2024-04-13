import React from "react";
import "./footer-page.css";
import { Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
const FooterPage = () => {
  return (
    <div className="footerpage">
      <img
        src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
        style={{ width: "90px", height: "40px", backgroundColor: "transparent", borderRadius: "10px" }}
        alt="logo"
      />
      <Typography.Link href="https://gmail.com" target={"_blank"}>
        Nhóm_1_X22
      </Typography.Link>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwOiANUMWY7ALOIHj5GAORYvoXkDm2IhLT04fKGKsrcFwzxeWiwkKf-zPFBS5dckMmFtI&usqp=CAU"
        style={{ width: "90px", height: "40px", backgroundColor: "transparent", borderRadius: "10px" }}
        alt="logo"
      />
      <Typography.Link href="https://www.google.com" target={"_blank"} >
        Google
      </Typography.Link>
      <img
        src="https://inrenhat.com/wp-content/uploads/2022/08/logo-Tiktok.jpg"
        style={{ width: "90px", height: "40px", backgroundColor: "transparent", borderRadius: "10px" }}
        alt="logo"
      />
      <Typography.Link href="https://www.tiktok.com/vi-VN/" target={"_blank"}>
        Tiktok
      </Typography.Link>
    </div>
  );
};

export default FooterPage;
