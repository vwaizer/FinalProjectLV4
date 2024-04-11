import React from "react";
import "./footer-page.css";
import { Typography } from "antd";
const FooterPage = () => {
  return (
    <div className="footerpage">
      <Typography.Link href="https://gmail.com">Nhóm_1_X22</Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Google
      </Typography.Link>
      <Typography.Link href="https://www.tiktok.com/vi-VN/" target={"_blank"}>
        Tiktok
      </Typography.Link>
    </div>
  );
};

export default FooterPage;
