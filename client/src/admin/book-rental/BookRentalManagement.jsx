import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./brm.css";
import { http } from "../../util/http";
import ButtonImport from "./ButtonImport";
import ButtonRefuse from "./ButtonRefue";


const BookRentalManagement = () => {
  const [getHireBook, setGetHireBook] = useState([]);
const [isClicked,setIsClicked]=useState(false);
const [buttonStatus,setButtonStatus]=useState("")
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
      setButtonStatus("Đồng ý")
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error);
    }
      
    
  }
  const onRefuseFunc=async(id)=>{
    try {
      const result=await http.put(`/staff/hiredBook/${id}`,{status:"Từ chối"})
      console.log(result);
      setButtonStatus("Từ chối")
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
                 <ButtonImport
                        record={button}
                        method={setIsClicked}
                        value={isClicked}
                        />
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
                  <ButtonRefuse
                        record={button}
                        method={setIsClicked}
                        value={isClicked}
                        />
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
