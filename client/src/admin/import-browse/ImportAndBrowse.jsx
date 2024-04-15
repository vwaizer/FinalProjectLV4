import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./import.css";
import { http } from "../../util/http";
import ButtonImport from "./ButtonImport";
import ImportBook from "../../page/ImportBook";
import ButtonRefuse from "./ButtonRefue";

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
      const result=await http.put(`/staff/importedBook/${id}`,{status:"Từ chối"})
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
              dataSource={getImport}
            ></Table>
          </>
        )}
      </Space>
    </div>
  );
};

export default ImportAndBrowse;
