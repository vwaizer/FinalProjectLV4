import { Link } from "react-router-dom";
import SetProduct from "../custom/productcpn/SetProduct";
import Layout from "../layout/Layout";
import "./page.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Category from "../custom/productcpn/Category";
import GetProduct from "../custom/productcpn/GetProduct";
import Pagination from "../pagination/Pagination";
import { Skeleton } from "antd";
import { http } from "../util/http.js";
import ReactPaginate from 'react-paginate'

function Products() {
  const [getBook, setGetBook] = useState([]);
  const [getTypeBook, setGetTypeBook] = useState([]);
  const [getAuthor, setGetAuthor] = useState([]);
  const [getPublisher, setGetPublisher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(32);
  const [loading, setLoading] = useState(false);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = getBook.slice(firstPostIndex, lastPostIndex);
  const totalPage = Math.ceil(getBook.length / postPerPage);

  useEffect(() => {
    setLoading(true);
    http
      .get("/book")
      .then((getBook) => setGetBook(getBook.data), setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/book/types")
      .then((getTypeBook) => setGetTypeBook(getTypeBook.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/book/author")
      .then((getAuthor) => setGetAuthor(getAuthor.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    http
      .get("/book/publisher")
      .then((getPublisher) => setGetPublisher(getPublisher.data))
      .catch((err) => console.log(err));
  }, []);

  const Loading = () => {
    return (
      <>
        <div>
          <Skeleton height={350} />
        </div>
        <div>
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="show_product">
        <div>
          <GetProduct getBook={currentPost} />
        </div>
      </div>
    );
  };

  const handlePageClick = () => {
    if(currentPage !== firstPostIndex) {
      setCurrentPage(currentPage - 1)
    }
    if(currentPage !== lastPostIndex){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Layout>
      <div className="bookstore_wrap">
        <div className="leftbox">
          <div className="leftbox_collection">
            <div>
              <h2>Product Category</h2>
              {getTypeBook.map((value, index) => {
                return (
                  <div className="category" key={value.type}>
                    <Category href="#literature" type={value.type} />
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Author</h2>
              {getAuthor.map((item, index) => {
                return (
                  <div className="author" key={index}>
                    <p>{item.author}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Publisher</h2>
              {getPublisher.map((item, index) => {
                return (
                  <div className="publisher" key={index}>
                    <p>{item.publisher}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightbox">
          <div>{loading ? <Loading /> : <ShowProduct />}</div>
          <div>
            <ReactPaginate 
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={getBook.length}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}/>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
