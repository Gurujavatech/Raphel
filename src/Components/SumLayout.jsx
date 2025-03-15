import React from 'react'
import Swap from './Container/Transactions/Swap'
import NavBar from './NavBar/NavBar'
import TickerBar from './TickerBar/TickerBar'
import Footer from './Footer/Footer'
import BottomNav from './BottomNav'

function SumLayout() {
  return (
    <div>
        <NavBar />
        <TickerBar />
        <Swap />
        <Footer />
        <BottomNav/>
    </div>
  )
}

export default SumLayout
