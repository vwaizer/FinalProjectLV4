import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./page.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail(props) {
 
  const { ID } = useParams("ID"); 

  const [product, setProduct] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/book/detailBook/${ID}`)
      .then((product) => setProduct(product.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(product);
  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

export default Detail;
