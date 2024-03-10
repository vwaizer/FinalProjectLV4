import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import './page.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Detail(props) {
  const {id} = useParams("ID")
  const [product, setProduct] = useState()
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/book/detailBook/${id}`)
      .then((product) => setProduct(product.data))
      .catch((err) => console.log(err));
  }, []);
 console.log(product);
  return (
    <Layout>
     <div>
     </div>
    </Layout>
  )
}

export default Detail