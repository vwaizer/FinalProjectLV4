import React from 'react'
import Footer from './Footer'
import Header from './Header'



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