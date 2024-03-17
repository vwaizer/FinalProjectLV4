import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../util/http";
import styled from "styled-components"
const DetailContainer=styled.div`
    
`
const RentForm = () => {
  const bookID = useParams().id;
  
  const [bookDetail, setBookDetail] = useState();
  const [rentTime,setRentTime]=useState("1")
  const getBook = async () => {
    const result = await http.get(`/book/detailBook/${bookID}`);
    console.log(result);
    setBookDetail(result.data);
  };
  useEffect(()=>{
   getBook()
  },[])
  console.log(bookDetail);
  const handleSubmit = (e) => {
    e.preventDefault();
  
    
    
    console.log("submit");
    console.log(rentTime);
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DetailContainer>
          <div>Book Name</div>
          <div>{bookDetail?.name}</div>
        </DetailContainer>
        <DetailContainer>
          <div>Book Author</div>
          <div>{bookDetail?.author}</div>
        </DetailContainer>
        <DetailContainer>
           <select  defaultValue={rentTime} onChange={(e)=>setRentTime(e.target.value)}>
            <option value="1">1 week</option>
            <option value="2" >2 weeks</option>
           </select>
        </DetailContainer>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RentForm;
