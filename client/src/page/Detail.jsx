import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import "./page.css";

import slideDetail from "../assets/imageDetail";
import SliderDetail from "../slideDetail/SliderDetail";
import RentForm from "./RentForm";
function Detail() {
  const {ID} = useParams("ID");
  console.log(ID);
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if(ID !== "undefined"){
      console.log(`http://localhost:4000/book/detailBook/${ID}`);
      http
        .get(`http://localhost:4000/book/detailBook/${ID}`)
        .then((product) => setProduct(Array(product.data)))
        .catch((err) => console.log(err));
    }
   
  }, [ID]);

  const handleAddToCartClick = async (ID) => {
    console.log("onclick");
    console.log(product);
    if (!ID) {
      console.error("Product ID is undefined");
      toast.error("Product ID is undefined", {
        position: "top-right",
      });
      return;
    }

    try {
      console.log(ID);
      const authToken = localStorage.getItem("accessToken");

      if (authToken) {
        const response = await http.post(`/receipt/addToCart/${ID}`,{amount:quantity});
        console.log(response);
        if (response.status == 200) {
          toast.success(`Product added to cart successfully`, {
            position: "top-right",
          });
         
        } else {
          console.error(`Failed to add product to cart:`);
          toast.error(`Failed to add product to cart`, {
            position: "top-right",
          });
        }
      } else {
        console.error("User not logged in. Redirecting to signin page.");
        toast.error("Please log in to add products to cart", {
          position: "top-right",
        });
        setTimeout(navigate("/sign-in"), 2000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(`Error adding product to cart`, {
        position: "top-right",
      });
    }
  };
  const onDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)
  }

  const onIncrease = () => {
    setQuantity(quantity + 1) 
  }
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
                    <h3>Tác giả : {item.author}</h3>
                  </div>
                  <p>{item.description}</p>
                  <h1>Giá: {item.price} VND</h1>
                <div className="quantity">
                  <button type="button" onClick={onDecrease}>-</button>
                  <div className="amount-quantity">{quantity}</div>
                  <button type="button" onClick={onIncrease}>+</button>
                </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="detail_button">
          <button onClick={() => handleAddToCartClick(product[0]._id)}
            type="submit"
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <button onClick={() => {handleAddToCartClick(product[0]._id); setTimeout(() => {
            navigate(`/cart/`);
          }, 1000);}} type="submit">MUA NGAY</button>
          <RentForm/>
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
