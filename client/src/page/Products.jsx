
import Layout from "../layout/Layout";
import "./page.css";

import React from "react";
function Products() {
  return (
    <Layout>
      <div className="bookstore_wrap">
        <div className="leftbox">
          <div className="leftbox_collection">
            <div className="product">
              <h2>Product Category</h2>
              {/* 'map tu database' */}
            </div>
            <div className="author">
              <h2>Author</h2>
              {/* 'map tu database' */}
            </div>
            <div>
              <h2>Publisher</h2>
              {/* 'map tu database' */}
            </div>
          </div>
        </div>
        <div className="rigtbox">
          <div className="rightbox_collection">
            <div className="sort">
              <p className="sort-name">
                Sort by:
                <select className="selection">
                  <option>Name</option>
                  <option>date</option>
                </select>
              </p>
            </div>
            <div className="product_info">
              <h1>hello, this space uses for product information</h1>
            {/* 'map tu database hình ảnh, tên spham, gia tien' */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
