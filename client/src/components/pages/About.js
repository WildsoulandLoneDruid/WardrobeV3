import React from 'react'
import '../../App.css'
import Footer from '../footer.js'
import NavBar from '../navBar.js'
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