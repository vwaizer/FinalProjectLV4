import React from "react";
import SetProduct from "./SetProduct";
import "./style.product.css";
import { Link } from "react-router-dom";
const GetProduct = ({ getBook }) => {
  return (
    <div className="container">
      {getBook.map((item, index) => {
        if(item !== null) {
          return (
            <div key={index} id="literature" >
              <Link to={`/product-detail/${item._id}`}>
                <SetProduct image={item.images} name={item.name} author={item.author} />
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default GetProduct;
