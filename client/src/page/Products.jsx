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
    setLoading(true);
    http
      .get(`/book/?page=${currentPage}`)
      .then((getBook) => setGetBook(getBook.data), setLoading(false))
      .catch((err) => {
        console.log(err);
        if (err.code === "ERR_NETWORK") {
          window.location.href = "/sign-in";
        }
      });
  }, [currentPage]);

  console.log(getBook);

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

  const ShowProduct = ({ getBook }) => {
    return (
      <div className="show_product">
        <div>
          <GetProduct getBook={getBook} />
        </div>
      </div>
    );
  };

  const handlePageClic = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage + 1);
    }
  }

  const onChangeAuthor = async (e) => {
    setValue(e.target.value);
    await http
      .get("/book/author")
      .then((getAuthor) => setGetAuthor(getAuthor.data))
      .catch((err) => console.log(err));
  };

  const onChangePublisher = async (e) => {
    setValuePublisher(e.target.value);
    await http
      .get("/book/publisher")
      .then((getPublisher) => setGetPublisher(getPublisher.data))
      .catch((err) => console.log(err));
  };

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
              <h2>Tác giả</h2>
              <div className="author">
                <input
                  className="product-input"
                  type="text"
                  placeholder=" "
                  onChange={onChangeAuthor}
                  value={value}
                />
                <label htmlFor="author" className="label">
                  Tìm tên tác giả
                </label>
              </div>
              <div className="drop-down">
                {value &&
                  getAuthor
                    .filter(
                      (item) =>
                        item.author.startsWith(value) && item.author !== value
                    )
                    .map((item, index) => {
                      return (
                        <div
                          className="item"
                          key={index}
                          onClick={(e) => setValue(item.author)}
                        >
                          <li>
                            <a href="#">{item.author}</a>
                          </li>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div>
              <h2>Nhà Xuất Bản</h2>
              <div className="publisher">
                <input
                  className="product-input"
                  type="text"
                  placeholder=" "
                  onChange={onChangePublisher}
                  value={valuePublisher}
                />
                <label htmlFor="Publisher" className="label">
                  Tìm tên NXB
                </label>
              </div>
              <div className="drop-down">
                {valuePublisher &&
                  getPublisher
                    .filter(
                      (item) =>
                        item.publisher.startsWith(valuePublisher) &&
                        item.publisher !== valuePublisher
                    )
                    .map((item, index) => {
                      return (
                        <div
                          className="item"
                          key={index}
                          onClick={(e) => setValuePublisher(item.publisher)}
                        >
                          <li>
                            <a href="#">{item.publisher}</a>
                          </li>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <div className="rightbox">
          <div>{loading ? <Loading /> : <ShowProduct getBook={getBook} />}</div>
          <div>
            <Stack spacing={2}>
              <Pagination count={getBook.length} page={currentPage} onChange={handlePageClic} />
            </Stack>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
