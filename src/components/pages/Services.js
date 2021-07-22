import React from 'react'
import '../../App.css'
import Footer from '../Footer.js'
import NavBar from '../NavBar.js'
import CardServices from '../serviceCards.js'

function Services() {
    return (
      <>
        <NavBar/>
        <h1>Wardrobe inventory System</h1>
        <CardServices />
        <Footer />
      </>
    )
}

export default Services;