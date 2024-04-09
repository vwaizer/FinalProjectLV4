import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { http } from "../../util/http";

const ChartBar = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    http
      .get("/staff/user")
      .then((getData) => setGetData(getData.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.table(getData);
  return (
    <>
      <h3>Thống kê các thể loại sách</h3>  
      <Chart
        type="pie"
        width={1280}
        height={550}
        series={[81, 36, 73, 17, 29, 53]}
        options={{
          labels: ['Văn Học', 'Tâm lý - Kỹ năng sống','Kinh tế', 'Nuôi dạy con','Tiểu Sử - Hồi ký', 'Sách học Ngoại ngữ']
        }}
      ></Chart>
    </>
  );
};

export default ChartBar;
