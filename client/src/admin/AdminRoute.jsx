import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Bill,
  BookRentalManagement,
  ImportAndBrowse,
  Overview,
  StaffAndUser,
} from "./index.js";
import LayoutAdmin from "./layout-admin/LayoutAdmin.jsx";
import Staff from "./staff-only/Staff.jsx";

const AdminRoute = () => {
  return (
      <Routes>
        <Route path="/admin/overview" element={<Overview />}></Route>
        <Route path="/admin/bill" element={<Bill />}></Route>
        <Route path="/admin/BRM" element={<BookRentalManagement />}></Route>
        <Route path="/admin/IaB" element={<ImportAndBrowse />}></Route>
        <Route path="/admin/SaU" element={<StaffAndUser />}></Route>
        <Route path="/admin/staff" element={<Staff />}></Route>
      </Routes>
  );
};

export default AdminRoute;
