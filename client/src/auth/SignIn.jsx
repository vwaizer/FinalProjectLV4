import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLock, FaUser, } from "react-icons/fa";
import AuthContext from "../context/AuthProvide";
import Layout from "../layout/Layout";
import "./auth.css";

const LOGIN_URL = '/auth';

const SignIn = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMessage("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      setUser('')
    setPwd('')
    setSuccess(true)
    } catch (error) {
      
    }
  }
  return (
    <Layout>
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
                id="username"
                placeholder="Username"
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
