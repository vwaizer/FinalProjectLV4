import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import { AuthProvider } from "./context/AuthProvide.js";
import { Suspense, lazy } from "react";
import {
  AboutUs,
  Cart,
  ContactUs,
  Detail,
  Home,
  Payment,
  Products,
} from "./page/index.js";
import {
  AdminPage,
  Bill,
  BookRentalManagement,
  ImportAndBrowse,
  Overview,
  StaffAndUser,
  Statistics,
} from "./admin/index.js";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Products />}></Route>
        <Route path="/cart/:ID" element={<Cart />}></Route>
        <Route path="/product-detail/:id" element={<Detail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/admin/overview" element={<Overview />}></Route>
        <Route path="/admin/bill" element={<Bill />}></Route>
        <Route path="/admin/BRM" element={<BookRentalManagement />}></Route>
        <Route path="/admin/IaB" element={<ImportAndBrowse />}></Route>
        <Route path="/admin/SaU" element={<StaffAndUser />}></Route>
        <Route path="/admin/statistic" element={<Statistics />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
