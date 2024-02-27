import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Cart,
  Detail,
  Home,
  Payment,
  Products,
  AboutUs,
  ContactUs,
} from "./page/index.js";
import SignUp from "./auth/SignUp.jsx";
import SignIn from "./auth/SignIn.jsx";
import { AuthProvider } from "./context/AuthProvide.js";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Products />}></Route>
        <Route path="/cart/:ID" element={<Cart />}></Route>
        <Route path="/detail/:ID" element={<Detail />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
