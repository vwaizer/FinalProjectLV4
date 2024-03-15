import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../util/http";
import styled from "styled-components"
const DetailContainer=styled.div`
    
`
const RentForm = () => {
  const bookID = useParams().id;
  const [bookDetail, setBookDetail] = useState();
  const getBook = async () => {
    const result = await http.get(`/book/detailBook/${bookID}`);
    setBookDetail(result.data);
  };
  const handleSubmit = () => {};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DetailContainer>
          <div>Book Name</div>
          <div>{bookDetail.name}</div>
        </DetailContainer>
        <DetailContainer>
          <div>Book Author</div>
          <div>{bookDetail.author}</div>
        </DetailContainer>
        <DetailContainer>
           <select onSelect={()=>}>
            <option value="1 week">1 week</option>
            <option value="2 week" >2 weeks</option>
           </select>
        </DetailContainer>
        <div>
          <div></div>
        </div>
      </form>
    </div>
  );
};

export default RentForm;
