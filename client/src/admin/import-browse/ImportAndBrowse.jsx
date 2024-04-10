import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";
import ButtonImport from "./ButtonImport";
import ImportBook from "../../page/ImportBook";

const ImportAndBrowse = () => {
  const [getImport, setGetImport] = useState([]);
  const [isClicked,setIsClicked]=useState(false);
 
  useEffect(() => {
    http
      .get("/staff/getImportedBook")
      .then((getImport) => {
        const formatData=getImport.data.map((item,index)=>{
          return {...item,dateIn:new Date(item.dateIn).toLocaleDateString(),bookName:item.book.name,index}
        })
        setGetImport(formatData)
      })
      .catch((err) => {
        console.log(err);
      });
    console.table(getImport);
  }, [isClicked]);
  console.log(getImport);
  return (
    <Space size={"middle"} direction="vertical">
      {localStorage.getItem("staff")==="staff"?<><ImportBook/></>:<>
      <Typography.Title level={4}>Nhập Sách</Typography.Title>
      <Table
        columns={[
          {
            title:"Stt",
            dataIndex:"index"
          },
          {
            title: "Mã Hóa Đơn",
            dataIndex: "_id",
          },
          {
            title: "Tên sách",
            dataIndex: "bookName",
            responsive: ['sm'],
          },
          {
            title: "Ngày Nhập",
            dataIndex: "dateIn",
          },
          {
            title: "Số lượng",
            dataIndex: "amount",
          },
          {
            title: "Tình Trạng",
            dataIndex: "status",
          },
          {
            title: "",
            dataIndex: "",
            render: (record) => {
              
             return <ButtonImport record={record} method={setIsClicked} value={isClicked}/>
            },
          },
        ]}
        dataSource={getImport}
      ></Table>
      </>}
    </Space>
  );
};

export default ImportAndBrowse;
