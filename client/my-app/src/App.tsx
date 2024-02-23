import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./layout/Layout";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Products from "./page/Products";
import Detail from "./page/Detail";
import Payment from "./page/Payment";
import Cart from "./page/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail/:ID" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cart/:ID" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
