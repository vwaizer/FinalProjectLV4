import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../../util/http";
import "./staffanduser.css";

const StaffAndUser = () => {
  const [getUser, setGetUser] = useState([]);

  useEffect(() => {
    http
      .get("/staff/user")
      .then((getUser) => {
        const formatData=getUser.data.map((item,index)=>{
            return {...item,birthday:new Date(item.birthday).toLocaleDateString(),index:index+1}
        })

        setGetUser(formatData)
      })
      .catch((err) => {
        console.log(err);
      });
    console.table(getUser);
  }, []);
 console.log(getUser);
 
  return (
    <Space size={"middle"} direction="vertical">
      <h2>Thông Tin Khách Hàng</h2>
      <Table className="user"
        columns={[
          {
            title: "STT",
            dataIndex: "index",
          },
          {
            title: "Tên KH",
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
          {
            title: "Trạng thái xác thực email",
            dataIndex: "verifyToken",
          },
        ]}
        dataSource={getUser}
        pagination={{
          pageSize: 5
        }}
      ></Table>
    </Space>
  );
};

export default StaffAndUser;
