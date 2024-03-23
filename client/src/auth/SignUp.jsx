import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import Layout from "../layout/Layout";
import "./auth.css";
import axios from "axios";
import AuthContext from "../context/AuthProvide";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { http } from "../util/http";

function SignUp() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkConfirmPassword, setCheckConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage("");
    try {
      const resultSignUp = await axios.post("http://localhost:4000/register", {
        email: user,
        password: pwd,
        confirmPassword: checkConfirmPassword,
      });
      console.log(JSON.stringify(resultSignUp?.data));
      if (!resultSignUp.data.error) {
        toast.success("Register successfully,Please verify email!!!", {
          position: "top-right",
        });
        await http.post("http://localhost:4000/verify",{email:user})
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else if (resultSignUp.data.error) {
        if (resultSignUp.data.error.email) {
          toast.error(`${resultSignUp.data.error.email.msg}`, {
            position: "top-right",
          });
        } else {
          toast.error(`${resultSignUp.data.error.password.msg}`, {
            position: "top-right",
          });
        }
      }
      setAuth({ user, pwd, checkConfirmPassword });
      setUser("");
      setPwd("");
      setCheckConfirmPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.resultSignUp) {
        setErrMessage("No Server Response");
      } else if (err.resultSignUp?.status === 400) {
        setErrMessage("Missing Username or Password");
      } else if (err.resultSignUp?.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="body">
        <div className="wrap">
          <form onSubmit={handleSubmit}>
            <h1>Đăng Ký</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                required
                ref={userRef}
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                ref={userRef}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                ref={userRef}
                value={checkConfirmPassword}
                required
                onChange={(e) => setCheckConfirmPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Đồng ý với điều khoản
              </label>
            </div>
            <button type="submit">Đăng Ký</button>
            <div className="login_link">
              <p>
                Bạn đã có tài khoản? <a href="/sign-in">Đăng Nhập</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
