import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
} from "../assets/imageProduct.js";
import Category from "../custom/productcpn/Category";
import Logo from "../custom/productcpn/Logo.jsx";
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
  const [filterUrl, setFIlterUrl] = useState("");
  useEffect(() => {
    http
      .get(`/book/?page=${currentPage}&${filterUrl}`)
      .then((getBook) => {
        setGetBook(getBook.data);
      })
      .catch((err) => {
        console.log(err);

        toast.error(err.code);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      });
  }, [currentPage, filterUrl]);
  const getFilterType = (type) => {
    const encodeType = encodeURI(type);
    setFIlterUrl(`type=${encodeType}`);

    // http
    //     .get(`/book/?type=${encodeType}`)
    //     .then((getBook) => {
    //       setGetBook(getBook.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);

    //       toast.error(err.code);
    //       setTimeout(() => {
    //         window.location.href = "/sign-in";
    //       }, 2000);
    //     });
  };
  useEffect(() => {
    http
      .get("/book/types")
      .then((getTypeBook) => setGetTypeBook(getTypeBook.data))
      .catch((err) => {
        console.log(err);

        toast.error(err.code);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      });
  }, []);

  const handlePageClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0, "smooth");
  };

  const filterChange = (e) => {
    setValue(e.target.value);
  };
  let searchData = getBook.filter((val) => {
    return Object.keys(val).some((key) =>
      val[key].toString().toLowerCase().includes(value.toString().toLowerCase())
    );
  });
  console.log(searchData);
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="bookstore_wrap">
        <div className="leftbox">
          <div className="leftbox_collection">
            <div className="category">
              <h2>Danh Mục</h2>
              {getTypeBook.map((val, index) => {
                return (
                  <div key={index} className="type">
                    <Category
                      type={val.type}
                      onClick={() => getFilterType(val.type)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="search">
              <h2>Tìm Kiếm</h2>
              <input
                type="text"
                value={value}
                onChange={filterChange}
                placeholder="Tên sách, tác giả, thể loại"
              />
            </div>
          </div>
        </div>
        <div className="rightbox">
        {searchData.map((item, index) => {
                if (item !== null) {
                  return (
                    <div className="product_info" key={index}>
                      <Link to={`/product-detail/${item._id}`}>
                        <SetProduct
                          image={item.images}
                          name={item.name}
                          author={item.author}
                          price={item.price}
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
      <div className="logo_middle">
        <Logo image={picture1} />
        <Logo image={picture2} />
        <Logo image={picture3} />
        <Logo image={picture4} />
        <Logo image={picture5} />
        <Logo image={picture6} />
      </div>
    </Layout>
  );
}

export default Products;
