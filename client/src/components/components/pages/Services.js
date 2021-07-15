import React from 'react'
import '../../App.css'
import Footer from '../Fotter'
import NavBar from '../navBar'
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