import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./userinfo.css";

const UserInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigative = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUser = () => {
    navigative("/user");
  };

  const handleSignOut = () => {
    localStorage.removeItem("remember");
    localStorage.removeItem("accessToken");
    navigative("/sign-in");
  };
  return (
    <div>
      <button className="user_button" onClick={handleClick}>
        <FaUser className="icon"/>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUser}>Thông Tin Tài Khoản</MenuItem>
        <MenuItem onClick={handleSignOut}>Đăng Xuất</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
