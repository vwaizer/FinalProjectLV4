import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Badge, Button, Modal } from 'antd';
import axios from 'axios'
import './modalcart.css';

const ModalCart = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState([])

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/book")
  //     .then((productModal) => setProductModal(productModal.data))
  //     .catch((err) => console.log(err));
  // }, []);
  let counting = 0;
  productModal.forEach((item,index) => {
    counting += item
  })
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
        </Modal>
      </Badge>
    </div>
  );
};

export default ModalCart;
