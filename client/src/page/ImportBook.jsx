import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import './page.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { http } from "../util/http";

const ImportBook = () => {
  const navigate=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/sign-in")
    }
  },[])
  const [price,setPrice]=useState(0)
const[bookName,setBookName]=useState("")
const[typeName,setTypeName]=useState("")
const [amount,setAmount]=useState(0)
console.log("amount",amount);
  const submitBook=async(bookName,typeName,amount,price,e)=>{
    e.preventDefault();
    const item={name:bookName,type:typeName,amount:amount,price:price*1000}
    try {
      const result=await http.post("/book/",{book:[item]})
      console.log(result);
      toast.success("Nhập sách thành công")
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
   
    console.log("submit");
  }
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
      <div className="import_book">
        <h1>Nhập Sách</h1>
        <form onSubmit={(e)=>submitBook(bookName,typeName,amount,price,e)}>
          {/* <input type="text" placeholder="Tên Khách Hàng" value={userName} disabled></input> */}
          <input type="text" placeholder="Ngày Nhập Sách" value={new Date().toDateString()} disabled ></input>
          <input type="text" placeholder="Tên Sách" value={bookName} onChange={(e)=>setBookName(e.target.value)}></input>
          <input type="text" placeholder="Thể Loại" value={typeName} onChange={(e)=>setTypeName(e.target.value)}></input>
          <input type="number" placeholder="Số lượng" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
          <input type="number" placeholder="Giá " value={price} onChange={(e)=>setPrice(e.target.value)}></input>
          <div className="button_import">
            <button type="submit">Xác Nhận</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ImportBook;
