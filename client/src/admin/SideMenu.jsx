import { Menu } from "antd";
import {useNavigate} from "react-router-dom"
import React from "react";
import { GrOverview } from "react-icons/gr";
import { CiImport, CiMoneyBill } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { PiBooksBold } from "react-icons/pi";
const SideMenu = () => {
    const navigate = useNavigate();
  return (
    <div className="side_menu">
      <Menu
        onClick={(item) => {
          navigate(item.key)
        }}
        items={[
          {
            label: "Tổng quan",
            icon: <GrOverview />,
            key: "/admin/overview",
          },
          {
            label: "Hóa Đơn",
            icon: <CiMoneyBill />,
            key: "/admin/bill",
          },
          {
            label: "Nhập Sách",
            icon: <CiImport />,
            key: "/admin/IaB",
          },
          {
            label: "Người Dùng",
            icon: <FaUserGroup />,
            key: "/admin/SaU",
          },
          {
            label: "Nhân Viên",
            icon: <FaUserGroup />,
            key: "/admin/staff",
          },
          {
            label: "Thuê Sách",
            icon: <PiBooksBold />,
            key: "/admin/BRM",
          },
        ]}
      ></Menu>
    </div>
  );
};

export default SideMenu;
