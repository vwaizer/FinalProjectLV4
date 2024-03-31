import { Badge, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../layout/Layout";
import { http } from "../util/http";
const DetailContainer = styled.div``;
const RentForm = () => {
  const bookID = useParams("ID").ID;
  console.log(bookID);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookDetail, setBookDetail] = useState();
  const [rentTime, setRentTime] = useState("1");
  const getBook = async () => {
    try {
      const result = await http.get(`/book/detailBook/${bookID}`);
    console.log(result);
    setBookDetail(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBook();
  }, []);
  console.log(bookDetail);
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log("submit");
  //   console.log(rentTime);
  // };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(rentTime);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Badge count={0}>

      <Button className="button-header" type="primary" onClick={showModal}>
          Rent Form
        </Button>
          <Modal
            title="Your Cart"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form >
            <DetailContainer>
              <div>Book Name</div>
              <div>{bookDetail?.name}</div>
            </DetailContainer>
            <DetailContainer>
              <div>Book Author</div>
              <div>{bookDetail?.author}</div>
            </DetailContainer>
            <DetailContainer>
              <select
                defaultValue={rentTime}
                onChange={(e) => setRentTime(e.target.value)}
              >
                <option value="1">1 week</option>
                <option value="2">2 weeks</option>
              </select>
            </DetailContainer>
            </form>
          </Modal>
       
      </Badge>
    </div>
  );
};

export default RentForm;
