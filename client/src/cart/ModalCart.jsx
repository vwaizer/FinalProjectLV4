import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Badge, Button, Modal } from 'antd';
import axios from 'axios'
import './modalcart.css';

const ModalCart = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productModal, setProductModal] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/book")
      .then((productModal) => setProductModal(productModal.data))
      .catch((err) => console.log(err));
  }, []);

  let counting = 0;
  productModal.forEach((item,index) => {
    counting += item.amount
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
      <Badge count={counting}>
        <Button className="button-header" type="primary" onClick={showModal}>
          <FaShoppingCart />
        </Button>
        <Modal
          title="Your Cart"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         {productModal.map((item) => {
            return (
                <div className="modal" key={item._id}>
                    <div>
                        <img src={item.images} alt="modal-image" />
                    </div>
                    <div>
                        <h4>{item.name}</h4>
                        <p>{item.author}</p>
                    </div>
                </div>
            )
         })}   
        </Modal>
      </Badge>
    </div>
  );
};

export default ModalCart;
