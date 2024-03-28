import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Category from "../custom/productcpn/Category";
import GetProduct from "../custom/productcpn/GetProduct";
import Layout from "../layout/Layout";
import { http } from "../util/http.js";
import "./page.css";
import BasicPagination from "../pagination/Pagination.jsx";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SetProduct from "../custom/productcpn/SetProduct.jsx";
import { Link } from "react-router-dom";

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
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = getBook.slice(firstPostIndex, lastPostIndex);
  const totalPage = Math.ceil(getBook.length / postPerPage);

  useEffect(() => {
    http
      .get(`/book/?page=${currentPage}`)
      .then((res) => {
        setGetBook(res.data);
        setGetAuthor(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          window.location.href = "/sign-in";
        }
      });
  }, [currentPage]);



  useEffect(() => {
    http
      .get("/book/types")
      .then((getTypeBook) => setGetTypeBook(getTypeBook.data))
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          window.location.href = "/sign-in";
        }
      });
  }, []);


  let timeOut = null;

  const handleFilter = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() =>{
      setGetAuthor(
        getBook.filter((val) => val.author.toLowerCase().includes(e.target.value))
      );
    },1000)
  };

  const handlePageClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage + 1);
    }
  };


  // const onChangeAuthor = async (e) => {
  //   setValue(e.target.value);
  //   clearTimeout(timeOut);
  //   timeOut = await setTimeout(() => {
  //     http
  //       .get("/book/author")
  //       .then((getAuthor) => setGetAuthor(getAuthor.data))
  //       .catch((err) => console.log(err));
  //   },2000);
  // };

  // const onChangePublisher =  (e) => {
  //   setValuePublisher(e.target.value);
  //   clearTimeout(timeOut);
  //   timeOut = setTimeout(() => {
  //     http
  //       .get("/book/publisher")
  //       .then((getPublisher) => setGetPublisher(getPublisher.data))
  //       .catch((err) => console.log(err));
  //   },2000);
  // };

  return (
    <Layout>
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
              <h2>Tác Giả</h2>
              <div className="author">
                <input
                  className="product-input"
                  type="text"
                  onChange={handleFilter}
                  placeholder=" "
                />
                <label htmlFor="Author" className="label">
                  Search
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="rightbox">
          {getAuthor.map((item, index) => {
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
