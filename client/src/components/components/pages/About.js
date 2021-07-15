import React from 'react'
import '../../App.css'
import Footer from '../Fotter'
import NavBar from '../navBar'
import CardAbout from '../aboutCards.js'
function About() {
    return (
      <>
        <NavBar />
        <h1>Who we are</h1>
        <CardServices />
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
        <Footer />
      </>
    )
}

export default About;