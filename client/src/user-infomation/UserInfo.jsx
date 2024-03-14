import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigative = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleUser = () => {
    navigative('/user')
  };
  
  const handleSignOut = () => {
    localStorage.removeItem("remember");
    localStorage.removeItem("accessToken")
    navigative('/sign-in')
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FaUser />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUser}>User account</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign-Out</MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;
