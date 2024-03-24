import React, { useState } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import LayoutAdmin from "../admin/layout-admin/LayoutAdmin";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username === "admin" && password === "123456789") {
      window.location.href = "/admin"
    } else {
      setTimeout(() => {
        alert("Wrong Password");
      }, 1000);
    }
  };
  return (
    <Layout>
      <div className="admin">
        <div className="admin_wrap">
          <h1>Administration</h1>
          <div className="admin_input">
            <input
              type="text"
              placeholder="Admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="admin_input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
