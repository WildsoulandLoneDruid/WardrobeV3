import React from 'react'
import '../../App.css'
import Footer from '../footer.js'
import MainScreenSection from '../mainScreen.js'
import NavBar from '../navBar.js'

function Home() {
    return (
      <>
        <NavBar />
        <MainScreenSection />
        <Footer />
      </>
    )
}

export default Home;