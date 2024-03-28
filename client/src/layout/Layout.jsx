import React from 'react'
import Header from './Header'
import Footer from './Footer'



function Layout({children, goToAdmin}) {
  return (
    <div>
        <Header onClick={goToAdmin}/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout