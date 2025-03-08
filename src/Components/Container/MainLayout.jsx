import React from 'react'
import NavBar from '../NavBar/NavBar'
import TickerBar from '../TickerBar/TickerBar'
import Hero from '../Hero/Hero'
import Footer from '../Footer/Footer'
import Interest from '../Interest/Interest'
import BottomNav from '../BottomNav'


function MainLayout() {
  return (
    <div>
        <NavBar />
        <TickerBar />
        <Hero />
        <Interest/>
        <Footer />
        <BottomNav/>
      
    </div>
  )
}

export default MainLayout
