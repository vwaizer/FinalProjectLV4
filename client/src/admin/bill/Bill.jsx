import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./bill.css";
import OverviewCustom from "../over-view/OverviewCustom";
import { IoReceipt } from "react-icons/io5";
import { http } from "../../util/http";


const Bill = () => {
  const [getReceipt, setGetReceipt] = useState([])
  const [getBill, setGetBill] = useState([])

  useEffect(() => {
    http
      .get("/receipt/getAllReceipt")
      .then((getReceipt) => {
        const formatData=getReceipt.data.map((item,index)=>{
          console.log(item);
          return {...item,date:new Date(item.date).toLocaleDateString(),index}
        })
        setGetReceipt(formatData)})
      .catch((err) => {

        console.log(err);
      });
   
  }, []);
  console.log(getReceipt);
  useEffect(() => {
    http
      .get("/staff/overall")
      .then((getBill) => setGetBill(getBill.data))
      .catch((err) => {
        console.log(err);
      });

  }, []);
  console.log(getBill);
  return (
    <Space  direction="vertical">
      <h2>Hóa Đơn</h2>
      <Space>
        <OverviewCustom
          icon={
            <IoReceipt 
              style={{
                color: "red",
                backgroundColor: "rgba(249, 239, 128, 0.758)",
                borderRadius: 70,
                fontSize: 70,
                padding: 8,
              }}
            />
          }
          title="Hóa Đơn"
          value={getBill.receiptNumber}
        />
      </Space>
      <Table className="bill"
        columns={[
          {
            title: "Thông tin khách hàng",
            dataIndex: "email",
          },
          {
            title: "Tên Sách",
            dataIndex: "bookName",
            responsive: ['sm']
          },
          {
            title: "Ngày Mua",
            dataIndex: "date",
          },
          {
            title: "Số Lượng",
            dataIndex: "amount",
          },
          {
            title: "Đơn Giá",
            dataIndex: "price",
          },
          {
            title: "Thành Tiền",
            dataIndex: "total",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
          },
        ]}
        dataSource={getReceipt}
        pagination={{
          pageSize: 5
        }}
      ></Table>
    </Space>
  );
};

export default Bill;
