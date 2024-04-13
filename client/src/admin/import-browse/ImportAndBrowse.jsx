import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";
import ButtonImport from "./ButtonImport";
import ImportBook from "../../page/ImportBook";

const ImportAndBrowse = () => {
  const [getImport, setGetImport] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    http
      .get("/staff/getImportedBook")
      .then((getImport) => {
        const formatData = getImport.data.map((item, index) => {
          return {
            ...item,
            dateIn: new Date(item.dateIn).toLocaleDateString(),
            bookName: item.book.name,
            index,
          };
        });
        setGetImport(formatData);
      })
      .catch((err) => {
        console.log(err);
      });
    console.table(getImport);
  }, [isClicked]);
  const onRefuseFunc=async(id)=>{
    try {
      const result=await http.put(`/staff/hiredBook/${id}`,{status:"Từ chối"})
      console.log(result);
      setIsClicked(!isClicked)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(getImport);
  return (
    <div >
      <Space size={"middle"} direction="vertical">
        {localStorage.getItem("staff") === "staff" ? (
          <>
            <ImportBook />
          </>
        ) : (
          <>
            <h2>Nhập Sách</h2>
            <Table className="import-book"
              columns={[
                {
                  title: "Stt",
                  dataIndex: "index",
                },
                {
                  title: "Mã Hóa Đơn",
                  dataIndex: "_id",
                },
                {
                  title: "Tên sách",
                  dataIndex: "bookName",
                  responsive: ["sm"],
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
                    return (
                      <ButtonImport
                        record={record}
                        method={setIsClicked}
                        value={isClicked}
                      />
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
              dataSource={getImport}
            ></Table>
          </>
        )}
      </Space>
    </div>
  );
};

export default ImportAndBrowse;
