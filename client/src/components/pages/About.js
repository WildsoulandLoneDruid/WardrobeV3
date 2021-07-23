import React from 'react'
import '../../App.css'
import Footer from '../Footer'
import NavBar from '../NavBar'
import CardAbout from '../ourInfo/aboutCards'

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