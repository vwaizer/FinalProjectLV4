import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { http } from "../../util/http";
import "./overview.css";
const ChartBar = () => {
  const [getData, setGetData] = useState([]);
  const [typeBook, setTypeBook] = useState([]);
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    const isTypeBook = [];
    const isAmount = [];
    http
      .get("/staff/chart")
      .then((getData) => setGetData(getData.data))
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < getData.length; i++) {
      isTypeBook.push(getData[i].type);
      isAmount.push(parseInt(getData[i].amount));
    }
    setTypeBook(isTypeBook);
    setAmount(isAmount);
  }, [getData.length]);
  console.log(getData);
  return (
    <div className="chart">
      <Chart 
        type="pie"
        width={650}
        height={500}
        series={amount}
        options={{
          noData: { text: "Empty Data" },
          labels: typeBook,
        }}
      ></Chart>
    </div>
  );
};

export default ChartBar;
