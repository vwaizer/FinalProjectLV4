import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./page.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowRoundBack } from "react-icons/io";
function Detail() {
  const { ID } = useParams("ID");

  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/book/detailBook/${ID}`)
      .then((product) => setProduct(Array(product.data)))
      .catch((err) => console.log(err));
  }, []);
  console.log(product);

  return (
    <Layout>
      <>
        <div className="detail_wrap">
          {product.map((item) => {
            return (
              <div key={item._id} className="detail">
                <div className="detail_image">
                  <img src={item.images} alt="detail-image" />
                </div>
                <div className="detail_info">
                  <div className="detail_title">
                    <h2>{item.name}</h2>
                    <h3>Author : {item.author}</h3>
                  </div>
                    <p>Description: .....</p>
                  {/* <div className="back-to-store">
                    <Link to="/product">
                      <IoIosArrowRoundBack className="icon" /> Back to Bookstore
                    </Link>
                  </div> */}
                  <h1>Price: {item.price}.000VND</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div className="detail_button">
          <button type="submit">ADD TO CART</button>
          <button type="submit">BUY NOW</button>
          <button type="submit">FOR RENT</button>
        </div>
      </>
    </Layout>
  );
}

export default Detail;
