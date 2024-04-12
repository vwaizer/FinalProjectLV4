import React, { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import LayoutAdmin from "../admin/layout-admin/LayoutAdmin";

const Admin = ({onClick}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  const handleSubmit =async (e) => {
    if (username === "admin" && password === "123456789") {
      toast.success("Đăng nhập thành công", {
        position: "top-right",
    });
      localStorage.setItem("staff", username)
      window.location.href = "/adminpage"
    } 
    else if(username === "staff" && password === "123456789"){
      toast.success("Đăng nhập thành công", {
        position: "top-right",
    });
      localStorage.setItem("staff", username)
      window.location.href = "/adminpage"
    }
    else {
      e.preventDefault();
      try {
        const result = await http.post(
          "/staffLogin",
          { email: username, password: password }
        );
       
        console.log(result);
        if (result.data.message) {
          console.log(result.data);
         
    
          localStorage.setItem("staff", "staff")
          toast.success("Đăng nhập thành công", {
            position: "top-right",
        });
          setTimeout(() => {
            window.location.href = "/adminpage";
  
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

        if (err?.result?.status===500) {
          setErrMessage("No Server Response");
        } else if (err.result?.status === 400) {
          setErrMessage("Missing Username or Password");
        } else if (err.result?.status === 401) {
          setErrMessage("Unauthorized");
        } else {
          setErrMessage("Login Failed");
        }
      
        toast.error(errMessage)
      }
      // setTimeout(() => {
      //   toast.error("Wrong Password");
      // }, 1000);
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
      <div className="admin">
        <div className="admin_wrap">
          <h1>Administration</h1>
          <div className="admin_input">
            <input
              type="text"
              placeholder="Admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={40}
            />
            <FaUser className="icon" />
          </div>
          <div className="admin_input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={16}
            />
            <FaLock className="icon" />
          </div>
          <button type="submit" onClick={(e)=>handleSubmit(e)}>
            Login
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
