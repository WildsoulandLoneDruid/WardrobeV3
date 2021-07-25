import React from 'react'
import '../../App.css'
import Footer from '../Footer.js'
import NavBar from '../NavBar.js'
import CardAbout from '../ourInfo/aboutCards.js'

function About() {
    return (
      <>
        <NavBar />
        <CardAbout />
        <Footer />
      </>
    )
}

export default About;