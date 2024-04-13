import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http";
import './staff.css'
const Staff = () => {
    const [getStaff, setGetStaff] = useState([])
 
    useEffect(() => {
    http
      .get("/staff/getAllStaff")
      .then((getStaff) => {
        const formatData=getStaff.data.map((item,index)=>{
          return {...item,birthday:new Date(item.birthday).toLocaleDateString(),index:index+1}
      })
        setGetStaff(formatData)})
      .catch((err) => {
        console.log(err);
      }); 

  }, []);
  console.log(getStaff);
  return (
    <Space size={"middle"} direction="vertical">
      <h2>Thông Tin Nhân Viên</h2>
      <Table className="staff"
        columns={[
          {
            title: "STT",
            dataIndex: "index",
          },
          {
            title: "Tên ",
            dataIndex: "fullName",
          },
          {
            title: "Năm Sinh",
            dataIndex: "birthday",
          },
          {
            title: "Số Điện Thoại",
            dataIndex: "phone",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
        ]}
        dataSource={getStaff}
        pagination={{
          pageSize: 5
        }}
      ></Table>
    </Space>
  );
};

export default Staff;
