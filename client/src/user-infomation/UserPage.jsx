import React from 'react'
import Layout from '../layout/Layout'

const UserPage = () => {
  const boxFillInfo = ['Họ','Tên','Số điện thoại','Email']
  return (
    <Layout>
      <div style={{display:'flex',width:'80%',height:'800px',margin:'auto',gap:'0px 20px'}}>
        <div style={{border:'1px solid black',flex:'1'}}>

        </div>
        <div style={{border:'1px solid red',flex:'2'}}></div>
      </div>
      
    </Layout>
  )
}

export default UserPage
