import { Badge, Modal, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { http } from "../util/http";
import './page.css';
const DetailContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`;
const { Title } = Typography;
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
  const setHiredBook=async(bookID,rentTime)=>{
    console.log(bookID);
    try { 
      const result= await http.post("/book/hiredBook",{ 
        "dateIn":(new Date()).toISOString(),
        "dateOut":(new Date(new Date().setDate(new Date().getDate() + rentTime*7))).toISOString(),
        "bookID":bookID
      })
      console.log(result);
      if(
        result.status === 204
      )
      {
        toast.error("Bạn chỉ được phép thuê 1 quyển sách")
      }
      else{
        await http.post(`/book/mailRent/${bookID}`,{time:rentTime})
        toast.success("Thuê thành công")
      }
     
    } catch (error) {
      toast.error(error)
    }
  }
  const handleOk = () => {
    console.log(rentTime);
    console.log("bookID",bookID);
    setHiredBook(bookID,rentTime)
    console.log((new Date(new Date().setDate(new Date().getDate() + rentTime*7))).toISOString());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Badge count={0}>

      <button className="rent_button" onClick={showModal}>
          THUÊ SÁCH
        </button>
          <Modal
            title="Thuê Sách"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            styles={{header:{textDecoration:"underline"}}}
          >
            <form >
            <DetailContainer>
              <div>Tên Sách</div>
              <Title level={3} style={{textWrap:"pretty"}}>{bookDetail?.name}</Title>
            </DetailContainer>
            <DetailContainer>
              <div>Tác Giả</div>
              <Title level={3} style={{textWrap:"pretty"}}>{bookDetail?.author}</Title>
            </DetailContainer>
            <DetailContainer>
              <div>Thời Gian Thuê Sách:</div>
              <select
                defaultValue={rentTime}
                onChange={(e) => setRentTime(e.target.value)}
              >
                <option value="1">1 Tuần</option>
                <option value="2">2 Tuần</option>
              </select>
            </DetailContainer>
            </form>
          </Modal>
       
      </Badge>
    </div>
  );
};

export default RentForm;
