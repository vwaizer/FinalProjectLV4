import React, { useState } from 'react'
import { http } from '../../util/http';

const ButtonRefuse = ({record,method,value}) => {
    const[isClicked,setIsClicked]=useState(false)
    const onClickFunc=async(record)=>{
        console.log(record);
        try {
          if(localStorage.getItem("staff") === "staff"){
            const result=await http.put(`/staff/importedBook/${record._id}`,{status:"Đợi Admin"})
            console.log(result);
          }
          else if(localStorage.getItem("staff")=== "admin"){
            
            const result=await http.put(`/staff/importedBook/${record._id}`,{status:"Từ Chối"})
            // const addBook=await http.post(`/staff/book`,record)
            console.log(addBook);
            console.log("result",result);
            setIsClicked(true)
          }
         
         method(!value)
        } catch (error) {
          console.log(error);
        }
          
        
      }
    return (
        <>
          <button
            style={{
              border: "1px solid #000",
              borderRadius: "5px",
              width: "100px",
              height: "50px",
              
            }}
            type="button"
            disabled={record.status==="Từ Chối" || record.status==="Đồng ý"?true:isClicked}
            onClick={()=>onClickFunc(record)}
            
          >
            Từ Chối
          </button>
        </>
      )
}

export default ButtonRefuse