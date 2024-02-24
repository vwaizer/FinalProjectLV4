import React from "react";
import { FaLock, FaUser } from "react-icons/fa";
import Layout from "../layout/Layout";
import './auth.css';

function SignUp() {
  return (
    <Layout>
      <div className="body">
        <div className="wrap">
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" required />
            <FaLock className="icon" />
          </div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
