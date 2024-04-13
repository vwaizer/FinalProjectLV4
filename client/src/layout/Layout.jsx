import React from 'react'
import Footer from './Footer'
import Header from './Header'
import PopUpChat from './PopUpChat'



function Layout({children, goToAdmin}) {
  return (
    <div>
        <Header onClick={goToAdmin}/>
        
        {children}
        <PopUpChat/>
        <Footer/>
    </div>
  )
}

export default Layout