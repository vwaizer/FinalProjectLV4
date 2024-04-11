import React, { useState } from 'react'
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from 'react';
import { http } from '../../util/http';

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({id}) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  // console.log(id);
  // console.log(value);
  const setRating=async(newValue)=>{
    try {
      const result=await http.post(`/book/setComment/${id}`,{rate:newValue})
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  const getRating=async()=>{
    try {
      const result=await http.get(`/book/getComment/${id}`)
      console.log(result);
      if(Object.keys(result.data).length>0){
        setValue(parseFloat(result.data[0].rate))
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getRating()
    
  },[value])
 
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          setRating(newValue);
       
        }}
        
        onChangeActive={(event, newHover) => {
          
          setHover(newHover);
        }}

        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
