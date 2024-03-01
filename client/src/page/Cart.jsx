import React from "react";
import Layout from "../layout/Layout";
import "./cart.css";
function Cart() {
  const books = [];
  return (
    <Layout>
      <div className="cart-container">
        <div className="header-cart-item">
          <h2>GIỎ HÀNG ({books.length} sản phẩm)</h2>
          <div className="checked-all-products">
            <div style={{ flex: "2" }}>
              <label>
                <input type="checkbox" />
                <span style={{ margin: "0px 5px" }}>
                  Chọn tất cả ({books.length} sản phẩm)
                </span>
              </label>
            </div>

            <div style={{ flex: ".5" }}>Số lượng</div>
            <div style={{ flex: ".5" }}>Thành tiền</div>
          </div>

          <div style={{border:'1px solid green'}}>
            <label>
              <input type="checkbox"/>
            </label>
          </div>
        </div>

        <div style={{ flex: "1", border: "1px solid violet" }}>
          <h2>Tổng số tiền</h2>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
