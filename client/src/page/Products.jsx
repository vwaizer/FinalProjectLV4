import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Category from "../custom/productcpn/Category";
import SetProduct from "../custom/productcpn/SetProduct.jsx";
import Layout from "../layout/Layout";
import { http } from "../util/http.js";
import "./page.css";
function Products() {
  const [getBook, setGetBook] = useState([]);
  const [getTypeBook, setGetTypeBook] = useState([]);
  const [getAuthor, setGetAuthor] = useState([]);
  const [getPublisher, setGetPublisher] = useState([]);
  const [value, setValue] = useState([]);
  const [valuePublisher, setValuePublisher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(32);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    http
      .get(`/book/?page=${currentPage}`)
      .then((getBook) => {
        setGetBook(getBook.data);
      })
      .catch((err) => {
        console.log(err);
       
            toast.error(err.code)
            setTimeout(()=>{
              window.location.href = "/sign-in";
            },2000)
        
        
      });
  }, [currentPage]);

  console.log(getBook)

  useEffect(() => {
    http
      .get("/book/types")
      .then((getTypeBook) => setGetTypeBook(getTypeBook.data))
      .catch((err) => {
        console.log(err);
       
        toast.error(err.code)
        setTimeout(()=>{
          window.location.href = "/sign-in";
        },2000)
      });
  }, []);

  let timeOut = null;

  const handleFilter = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() =>{

        http
          .get(`/book?author=${e.target.value}`)
          .then((getAuthor) => setGetAuthor(getAuthor.data))
          .catch((err) => {
            console.log(err)
          });
    
    },1000)
  };

  const handlePageClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Layout>
      <ToastContainer
        position="top-right" autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
        />
      <div className="bookstore_wrap">
        <div className="leftbox">
          <div className="leftbox_collection">
            <div>
              <h2>Danh Mục</h2>
              {getTypeBook.map((value, index) => {
                return (
                  <div className="category" key={value.type}>
                    <Category href="#literature" type={value.type} />
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Tìm kiếm</h2>
              <div className="author">
                <input
                  className="product-input"
                  type="text"
                  onChange={handleFilter}
                  placeholder=" "
                />
                <label htmlFor="Author" className="label">
                  Tác giả
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="rightbox">
          {getBook.map((item, index) => {
            if (item !== null) {
              return (
                <div className="product_info" key={index}>
                  <Link to={`/product-detail/${item._id}`}>
                    <SetProduct
                      image={item.images}
                      name={item.name}
                      author={item.author}
                    />
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
          <div className="paginate">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={getBook.length}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
    </Layout>
  );
}

export default Products;
