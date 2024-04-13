import { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./admin/layout-admin/LayoutAdmin.jsx";
import Admin from "./auth/Admin.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import { AuthProvider } from "./context/AuthProvide.js";
import ErrorPage from "./custom/lazy/ErrorPage.jsx";
import Loading from "./custom/lazy/Loading.jsx";
import ThankYouPage from "./custom/mail/ThankYouPage.jsx";
import AboutUsPage from "./page/About Us/about-us-page.jsx";
import RentForm from "./page/RentForm.jsx";
import Contact from "./page/contact/contact-page.jsx";
import { Cart, Detail, Home, Payment } from "./page/index.js";
import UserPage from "./user-infomation/UserPage.jsx";
const Products = lazy(() => import("./page/Products.jsx"));

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  const navigate = useNavigate();

  const goToAdmin = () => {
    const checkUser = localStorage.getItem("staff");
    if (checkUser) {
      setShowAdmin(true);
      navigate("/admin/overview");
    } else {
      navigate("/staff");
    }
  };

  return (
    <AuthProvider>
      {showAdmin ? (
        <LayoutAdmin />
      ) : (
        <>
          <Routes>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/nha-sach"
              element={
                <ErrorBoundary 
                FallbackComponent={<ErrorPage />}
                onReset={() => window.location.href = "/"}>
                  <Suspense fallback={<Loading />}>
                    <Products />
                  </Suspense>
                </ErrorBoundary>
              }
            ></Route>
            <Route path="/gio-hang/" element={<Cart />}></Route>
            <Route path="/product-detail/:ID" element={<Detail />}></Route>
            <Route path="/thanh-toan" element={<Payment />}></Route>
            <Route path="/lien-he" element={<Contact />}></Route>
            <Route path="/gioi-thieu" element={<AboutUsPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/staff" element={<Admin />}></Route>
            <Route path="/rent/:id" element={<RentForm />}></Route>
            <Route path="/verify/:id" element={<ThankYouPage />}></Route>
          </Routes>
          <div className="goto_admin">
            <button type="button" onClick={goToAdmin}>
              Admin
            </button>
           
          </div>
          <div>
         
          </div>
        </>
      )}
    </AuthProvider>
  );
}

export default App;
