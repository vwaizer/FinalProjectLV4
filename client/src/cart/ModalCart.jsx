import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Badge, Button, Modal } from "antd";
import axios from "axios";
import "./modalcart.css";
import { http } from "../util/http";

const ModalCart = () => {
  const [getAddToCart, setGetAddToCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState([]);

  useEffect(() => {
    http
      .get("/receipt/")
      .then((getAddToCart) => setGetAddToCart(getAddToCart.data))
      .catch((err) => console.log(err));
  }, []);

  let counting = 0;
  productModal.forEach((item, index) => {
    counting += item;
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Badge count={0}>
        <Button className="button-header" type="primary" onClick={showModal}>
          <FaShoppingCart />
        </Button>
        <Modal
          title="Your Cart"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {getAddToCart[0]?.cart?.map((item, index) => {
            let img, name, price, bookID, amount;
            img = getAddToCart[0].result[index].images[0];
            name = getAddToCart[0].result[index].name;
            price = item.price;
            bookID = item.bookID;
            amount = item.amount;
            return (
              <div>
                <div className="product-container">
                  <div>
                    <img className="books-image" src={img} alt=""></img>
                  </div>
                  <div className="products-info">
                    <div>{name}</div>
                    <div style={{ fontSize: "1.1em", fontWeight: "600" }}>
                      {price} đ
                    </div>
                  </div>
                </div>
                <div className="border-space-product"></div>
              </div>
            );
          })}
        </Modal>
      </Badge>
    </div>
  );
};

export default ModalCart;
