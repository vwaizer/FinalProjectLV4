import React from "react";
import Layout from "../layout/Layout";
import './page.css'
const ImportBook = () => {
  return (
    <Layout>
      <div className="import_book">
        <h1>Nhập Sách</h1>
        <form>
          <input type="text" placeholder="Tên Khách Hàng"></input>
          <input type="text" placeholder="Ngày Nhập Sách"></input>
          <input type="text" placeholder="Tên Sách"></input>
          <input type="text" placeholder="Thể Loại"></input>
          <input type="number" placeholder="Số lượng"></input>
          <div className="button_import">
            <button>Xác Nhận</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ImportBook;
