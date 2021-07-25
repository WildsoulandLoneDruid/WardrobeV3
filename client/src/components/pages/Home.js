import React from 'react'
import '../../App.css'
import Footer from '../Footer.js'
import MainScreenSection from '../MainScreen.js'
import NavBar from '../NavBar.js'

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