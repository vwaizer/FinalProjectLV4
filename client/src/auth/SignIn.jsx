import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthProvide";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import "./auth.css";
const LOGIN_URL = "/auth";

const SignIn = () => {
  const { setAuth, signIn } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [remember, setRemember] = useState(false);

  const [access_token] = useSearchParams();

  const data = localStorage.getItem("accessToken");

  useEffect(() => {
    if (data) {
      console.log("vao");
      localStorage.setItem("accessToken", data);

      window.location.href="/";
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await http.post(
        "/login",
        { email: user, password: pwd }
      );
      setAuth({ user, pwd });
      setUser("");
      setPwd("");
      setSuccess(true);
      console.log(result);
      if (result.data.message) {
        console.log(result.data);
        signIn(user);
       
        localStorage.setItem("accessToken", result.data.accessToken);
        toast.success("Đăng nhập thành công", {
          position: "top-right",
      });
        setTimeout(() => {
          window.location.href = "/";

        },2000)
      }
      else{
        if(result.data.error.email){
          toast.error(`${result.data.error.email.msg}`,{
            position:"top-right"
          })
        }
        else{
          toast.error(`${result.data.error.password.msg}`,{
            position:"top-right"
          })
        }
      }
    } catch (err) {
      console.log(err);
      if (err?.result) {
        setErrMessage("No Server Response");
      } else if (err.result?.status === 400) {
        setErrMessage("Missing Username or Password");
      } else if (err.result?.status === 401) {
        setErrMessage("Unauthorized");
      } else {
        setErrMessage("Login Failed");
      }
      // errRef.current.focus();
      toast.error(errMessage)
    }
  };
  return (
    <Layout>
      <ToastContainer
        position="top-right" autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        />
      <div className="body">
        <div className="wrap">
          <form onSubmit={handleSubmit}>
            <h1>Đăng Nhập</h1>
            <div className="input-box">
              <input
                type="text"
                id="Email"
                placeholder="Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                maxLength={40}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                id="password"
                placeholder="Password"
                ref={userRef}
                onChange={(e) => {console.log(e.target.value);;setPwd(e.target.value)}}
                value={pwd}
                required
                maxLength={16}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />Ghi Nhớ
              </label>
              <a href="#">Quên mật khẩu?</a>
            </div>
            <button type="submit">Đăng Nhập</button>
            <div className="register-link">
              <p>
                Bạn chưa có tài khoản? <a href="/sign-up">Đăng ký</a>
              </p>
              <p>
                Quản Lý <IoMdArrowForward /> <a href="/staff">Chỉ dành cho nhân viên</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
