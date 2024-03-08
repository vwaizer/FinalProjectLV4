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

function Products() {
  const [getBook, setGetBook] = useState([]);
  const [getTypeBook, setGetTypeBook] = useState([]);
  const [getAuthor, setGetAuthor] = useState([]);
  const [getPublisher, setGetPublisher] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/book")
      .then((getBook) => setGetBook(getBook.data), setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/book/types")
      .then((getTypeBook) => setGetTypeBook(getTypeBook.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/book/author")
      .then((getAuthor) => setGetAuthor(getAuthor.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/book/publisher")
      .then((getPublisher) => setGetPublisher(getPublisher.data))
      .catch((err) => console.log(err));
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = getBook.slice(firstPostIndex, lastPostIndex);

  const Loading = () => {
    return(
      <>
      <div>
        <Skeleton height={350} />
      </div>
      <div>
        <Skeleton height={350} />
      </div>
      </>
    )
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
                  <div className="author" key={item.author}>
                    <p>{item.author}</p>
                  </div>
                );
              })}
            </div>
            <div>
              <h2>Publisher</h2>
              {getPublisher.map((item, index) => {
                return (
                  <div className="publisher" key={item.publisher}>
                    <p>{item.publisher}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="rightbox">
          <div>{loading ? <Loading /> : <ShowProduct />}</div>
          <Pagination
            totalPost={getBook.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Products;
