import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import NavBar from '../NavBar'
import CardAbout from '../aboutCards.js'

function About() {
    return (
      <>
        <NavBar />
        <h1>Who are we</h1>
        <CardAbout />
        <Footer />
      </>
    )
}

export default About;