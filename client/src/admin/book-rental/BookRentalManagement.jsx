import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./brm.css";
import { http } from "../../util/http";

const BookRentalManagement = () => {
  const [getHireBook, setGetHireBook] = useState([]);
const [isClicked,setIsClicked]=useState(false);
  useEffect(() => {
    http
      .get("/staff/hireBook")
      .then((getHireBook) => {
        const formatData=getHireBook.data.map((item,index)=>{
          console.log(item);
          return {...item,dateIn:new Date(item.dateIn).toLocaleDateString(),dateOut:new Date(item.dateOut).toLocaleDateString(),bookName:item?.bookData[0]?.name,userEmail:item?.user[0]?.email,index:index+1}
        })
        setGetHireBook(formatData)
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(getHireBook);
  }, [isClicked]);
  
  const onClickFunc=async(id)=>{
    try {
      const result=await http.put(`/staff/hiredBook/${id}`,{status:"Đồng ý"})
      console.log(result);
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error);
    }
      
    
  }
  const onRefuseFunc=async(id)=>{
    try {
      const result=await http.put(`/staff/hiredBook/${id}`,{status:"Từ chối"})
      console.log(result);
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Space size={"middle"} direction="vertical" wrap>
      <h2>Thông Tin Thuê Sách</h2>
      <Table className="rental"
        columns={[
          {
            title: "STT",
            dataIndex: "index",
          },
          {
            title: "Mail KH",
            dataIndex: "userEmail",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "",
          },
          {
            title: "Tên Sách",
            dataIndex: "bookName",
            responsive: ['sm']
          },
          {
            title: "Ngày Thuê",
            dataIndex: "dateIn",
          },
          {
            title: "Ngày Trả",
            dataIndex: "dateOut",
          },
          {
            title:"Tình trạng",
            dataIndex:"status"
          }
          ,
          {
            title: "",
            dataIndex: "",
            render: (button) => {
              console.log(button);
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
                    disabled={(button.status === "Đồng ý" || button.status === "Từ chối")?true:false}
                    onClick={()=>onClickFunc(button._id)}
                  >
                    Xác nhận
                  </button>
                </>
              );
            },
          },
          {
            title: "",
            dataIndex: "",
            render: (button) => {
              console.log(button);
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
                    disabled={(button.status === "Đồng ý" || button.status === "Từ chối")?true:false}
                    onClick={()=>onRefuseFunc(button._id)}
                  >
                    Từ chối 
                  </button>
                </>
              );
            },
          }
        ]}
        dataSource={getHireBook}
      ></Table>
    </Space>
  );
};

export default BookRentalManagement;
