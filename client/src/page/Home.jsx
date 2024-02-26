import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  return (
    <Layout>
      Home
    </Layout>
  )
}

export default Home