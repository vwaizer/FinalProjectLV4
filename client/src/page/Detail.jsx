import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { http } from "../util/http";
import "./page.css";
function Detail () {
  const { ID } = useParams("ID");
  const navigate = useNavigate()

  const [product, setProduct] = useState([]);

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
      const authToken = localStorage.getItem("remember");

      if (authToken) {
        const response = await http.post(
          `http://localhost:4000/receipt/addToCart/${ID}`,
          
        );
         console.log(response);
        if (response.status == 200) {
          toast.success(`Product added to cart successfully`, {
            position: "top-right"
          });
          setTimeout(() => {
            navigate(`/cart/:ID`)
          },2000)
        } else {
          console.error(`Failed to add product to cart:`);
          toast.error(`Failed to add product to cart`, {
            position: "top-right"
          });
        }
      } else {
        console.error("User not logged in. Redirecting to signin page.");
        toast.error("Please log in to add products to cart", {
          position: "top-right"
        });
        setTimeout( navigate('/sign-in'),2000)
       
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(`Error adding product to cart`, {
        position: "top-right"
      });
    }
  };
  
  return (
    <Layout>
      
      <>
        <div className="detail_wrap">
          { product.map((item) => {
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
          <button  type="submit" onClick={()=>handleAddToCartClick(product[0]._id)}>ADD TO CART</button>
          <button type="submit">BUY NOW</button>
          <button type="submit">FOR RENT</button>
        </div>
      </>
    </Layout>
  );
}

export default Detail;
