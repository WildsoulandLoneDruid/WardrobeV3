import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button } from './Button';
import './navBar.css'

function navBar() {
    const [click, setClick] = useSate(false);
    const [button, setButton] = useState(true);

    const handleclick = () => setClick(!click);
    const closedMobileMenu = () => setClick(false);

    const showbutton = () => {
        if(window.innerwidth <= 960){
            setButton(false);
        }
        else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showbutton);
    {/* for logo 43:00  */}
    return (
       <>
       <nav className="navbar">
           <div className="navbar-container">
            {/* npm install react-router-dom, add logo https://www.youtube.com/watch?v=I2UBjN5ER4s*/}
            <Link to="/" className="navbar-logo">WDI</Link>
            <div className='menu-icon' onClick = {handleclick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className ={click ? 'nav-menu active' : 'nav-menu'}>
                <li className ='nav-item'>
                    <Link to = '/' className='nav-links' onclick={closedMobileMenu}>Home</Link>
                    <Link to = '/Services' className='nav-links' onclick={closedMobileMenu}>Services</Link>
                    <Link to = '/About' className='nav-links' onclick={closedMobileMenu}>About</Link>
                    <Link to = '/sign-up' className='nav-links-mobile' onclick={closedMobileMenu}>Sign Up</Link>
                </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
           </div>
       </nav>
       </>
    )
}

export default navBar
