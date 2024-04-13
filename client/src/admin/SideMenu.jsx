import { Menu } from "antd";
import React from "react";
import { CiImport, CiMoneyBill } from "react-icons/ci";
import { FaUserGroup } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { PiBooksBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./admin.css";
const SideMenu = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {
      localStorage.removeItem("staff")
      window.location.href = "/staff"
    }
  return (
    <div className="side_menu">
      <Menu className="side_menu-custom"
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
      <div className="button">
        <button onClick={handleLogOut} type="button" className="log-out">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
