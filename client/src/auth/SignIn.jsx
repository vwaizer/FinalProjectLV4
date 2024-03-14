import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from "../context/AuthProvide";
import Layout from "../layout/Layout";
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

  const data = access_token.get("accessToken");

  useEffect(() => {
    if (data) {
      console.log("vao");
      localStorage.setItem("accessToken", data);

      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:4000/login",
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
        localStorage.setItem("remember", user);
        localStorage.setItem("accessToken", result.data.accessToken);
        toast.success("Login successfull", {
          position: "top-right",
      });
        setTimeout(() => {
          navigate("/");

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
      errRef.current.focus();
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
            <p
              ref={errRef}
              className={errMessage ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMessage}
            </p>
            <h1>Login</h1>
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
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                id="password"
                placeholder="Password"
                ref={userRef}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>
                Don't have an account? <a href="/sign-up">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
