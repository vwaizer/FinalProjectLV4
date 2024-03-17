import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import "./page.css";

import slideDetail from "../assets/imageDetail";
import SliderDetail from "../slideDetail/SliderDetail";
function Detail() {
  const { ID } = useParams("ID");
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    http
      .get(`http://localhost:4000/book/detailBook/${ID}`)
      .then((product) => setProduct(Array(product.data)))
      .catch((err) => console.log(err));
  }, []);

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
        const response = await http.post(`/receipt/addToCart/${ID}`);
        console.log(response);
        if (response.status == 200) {
          toast.success(`Product added to cart successfully`, {
            position: "top-right",
          });
          setTimeout(() => {
            navigate(`/cart/:ID`);
          }, 2000);
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
                  <h1>Price: {item.price} VND</h1>
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
          <button
            type="submit"
            onClick={() => handleAddToCartClick(product[0]._id)}
          >
            ADD TO CART
          </button>
          <button type="submit">BUY NOW</button>
          <button type="submit" onClick={()=>navigator(`/rent/${ID}`)}>FOR RENT</button>
        </div>
        <div>
          <SliderDetail>
          {slideDetail.map((item, index) => {
          return <img key={index} src={item.image} alt={item.alt} />;
        })}
          </SliderDetail>
        </div>
      </>
    </Layout>
  );
}

export default Detail;
