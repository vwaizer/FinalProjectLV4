import React from "react";
import SetProduct from "./SetProduct";
import "./style.product.css";
import { Link } from "react-router-dom";
const GetProduct = ({ getBook }) => {
  return (
    <div className="product_info">
      {getBook.map((item, index) => {
        if(index <= 10) {
          return(
            <div key={index} id="literature">
            <Link to={`/product-detail/${item._id}`}>
              <SetProduct
                image={item.images}
                name={item.name}
                type={item.type}
                author={item.author}
                field={item.field}
                amount={item.amount}
              />
            </Link>
          </div>
          )
        }
        if(index > 17 < 34){
          return(
            <div key={index} id="#">
            <Link to={`/product-detail/:id${item._id}`}>
              <SetProduct
                image={item.images}
                name={item.name}
                type={item.type}
                author={item.author}
                field={item.field}
                amount={item.amount}
              />
            </Link>
          </div>
          )
        }
      })}
    </div>
  );
};

export default GetProduct;
