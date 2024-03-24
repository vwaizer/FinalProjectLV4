import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./auth/Admin.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import { AuthProvider } from "./context/AuthProvide.js";
import AboutUsPage from "./page/About Us/about-us-page.jsx";
import RentForm from "./page/RentForm.jsx";
import Contact from "./page/contact/contact-page.jsx";
import { Cart, Detail, Home, Payment, Products } from "./page/index.js";
import UserPage from "./user-infomation/UserPage.jsx";
import LayoutAdmin from "./admin/layout-admin/LayoutAdmin.jsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Products />}></Route>
        <Route path="/cart/" element={<Cart />}></Route>
        <Route path="/product-detail/:ID" element={<Detail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about-us" element={<AboutUsPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/staff" element={<Admin />}></Route>
        <Route path="/admin" element={<LayoutAdmin />}></Route>
        <Route path="/rent/:id" element={<RentForm />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
