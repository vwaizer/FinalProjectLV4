import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  AdminPage,
  Bill,
  BookRentalManagement,
  ImportAndBrowse,
  Overview,
  StaffAndUser,
  Statistics,
} from "./admin/index.js";
import Admin from "./auth/Admin.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import { AuthProvider } from "./context/AuthProvide.js";
import RentForm from "./page/RentForm.jsx";
import {
  AboutUs,
  Cart,
  ContactUs,
  Detail,
  Home,
  Payment,
  Products,
} from "./page/index.js";
import UserPage from "./user-infomation/UserPage.jsx";
import AboutUsPage from "./page/About Us/AboutUs.jsx";
import Contactpage from "./page/contact/contact-page.jsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Products />}></Route>
        <Route path="/cart/:ID" element={<Cart />}></Route>
        <Route path="/product-detail/:ID" element={<Detail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/ContactUs" element={<Contactpage />}></Route>
        <Route path="/AboutUs" element={<AboutUsPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/staff" element={<Admin />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/admin/overview" element={<Overview />}></Route>
        <Route path="/admin/bill" element={<Bill />}></Route>
        <Route path="/admin/BRM" element={<BookRentalManagement />}></Route>
        <Route path="/admin/IaB" element={<ImportAndBrowse />}></Route>
        <Route path="/admin/SaU" element={<StaffAndUser />}></Route>
        <Route path="/admin/statistic" element={<Statistics />}></Route>
        <Route path="/rent/:id" element={<RentForm/>}></Route>
      
      </Routes>
    </AuthProvider>
  );
  
}

export default App;
