import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import slideDetail from "../assets/imageDetail";
import Layout from "../layout/Layout";
import HoverRating from "../page/rating/Rating";
import SliderDetail from "../slideDetail/SliderDetail";
import { http } from "../util/http";
import "./page.css";
import RentForm from "./RentForm";
import SyncLoader from "react-spinners/SyncLoader";
import { alignProperty } from "@mui/material/styles/cssUtils";

const override = {
  display: "flex",
  justifyContent: "center",
  alignProperty: "center",
  margin: "20px auto",
};

const paragrapStyle = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

function Detail() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const { ID } = useParams("ID");
  console.log(ID);
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);
  let timeOut = null;
  useEffect(() => {
    // clearTimeout(timeOut);
    setLoading(true);
    console.log(localStorage.getItem("accessToken") == null);
     setTimeout(() => {
      if (ID !== "undefined" && localStorage.getItem("accessToken")!= null) {
        console.log(`/book/detailBook/${ID}`);
        http
          .get(`/book/detailBook/${ID}`)
          .then((product) => {
            setProduct(Array(product.data));
            setLoading(false);
          })
          .catch((err) => window.location.href="/sign-in");
      }
      else{
        window.location.href="/sign-in"
      }
    }, 1000);
    
  }, [ID]);

  const handleAddToCartClick = async (ID) => {
    console.log("onclick");
    console.log(product);
    if (!ID) {
      console.error("Product ID is undefined");
      toast.error("chưa có Product ID", {
        position: "top-right",
      });
      return;
    }

    try {
      console.log(ID);
      const authToken = localStorage.getItem("accessToken");

      if (authToken) {
        const response = await http.post(`/receipt/addToCart/${ID}`, {
          amount: quantity,
        });
        console.log(response);
        if (response.status == 200) {
          toast.success(`Thêm vào giỏ hàng thành công`, {
            position: "top-right",
          });
        } else {
          console.error(`Failed to add product to cart:`);
          toast.error(`Lỗi khi thêm vào giỏ hàng`, {
            position: "top-right",
          });
        }
      } else {
        console.error("User not logged in. Redirecting to signin page.");
        toast.error("Đăng nhập lại !!!", {
          position: "top-right",
        });
        setTimeout(navigate("/sign-in"), 2000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(`Lỗi Thêm hàng vào giỏ`, {
        position: "top-right",
      });
    }
  };
  const onDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
  };

  const onIncrease = () => {
    setQuantity(quantity + 1);
  };
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
      <div className="detail_wrap">
        {loading ? (
          <SyncLoader
            cssOverride={override}
            color="#ec5959"
            loading={loading}
            size={15}
          />
        ) : (
          product.map((item) => {
            return (
              <div key={item._id} className="detail">
                <div className="detail_image">
                  <img src={item.images} alt="detail" />
                </div>
                <div className="detail_info">
                  <div className="detail_title">
                    <h2>{item.name}</h2>
                    <HoverRating id={item._id} />
                    <h3>Tác giả : {item.author}</h3>
                  </div>
                  <div>
                    <p style={seeMore ? null : paragrapStyle}>
                      {item.description}
                    </p>
                    <button
                      className="read-more"
                      type="button"
                      onClick={() => setSeeMore(!seeMore)}
                    >
                      {seeMore ? "Thu gọn" : "Xem thêm"}
                    </button>
                  </div>
                  <h1>Giá: {item.price} VND</h1>
                  <div className="quantity">
                    <button type="button" onClick={onDecrease}>
                      -
                    </button>
                    <div className="amount-quantity">{quantity}</div>
                    <button type="button" onClick={onIncrease}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="detail_button">
        <button
          onClick={() => handleAddToCartClick(product[0]._id)}
          type="submit"
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <button
          onClick={() => {
            handleAddToCartClick(product[0]._id);
            setTimeout(() => {
              navigate(`/gio-hang/`);
            }, 2000);
          }}
          type="submit"
        >
          MUA NGAY
        </button>
        <RentForm />
      </div>
      <div>
        <SliderDetail>
          {slideDetail.map((item, index) => {
            return <img key={index} src={item.image} alt={item.alt} />;
          })}
        </SliderDetail>
      </div>
    </Layout>
  );
}

export default Detail;
