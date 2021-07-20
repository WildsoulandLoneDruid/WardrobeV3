import React, {useEffect} from 'react'
import '../../App.css'
import Footer from '../Footer'
import MainScreenSection from '../MainScreen'
import NavBar from '../NavBar'
import CardItem from '../CardItem'
import { useHistory } from 'react-router-dom';
const allItems = [
  {x:'shirt', y:1},
  {x:'pants', y:2},
  {x:'socks', y:3},
  {x:'1', y:3},
  {x:'2', y:3},
  {x:'3', y:3},
  {x:'4', y:3},
];
function UserPage() {
  const sessionId = localStorage.getItem('sessionId');
  const sessionExpires = Number(localStorage.getItem('sessionExpires'));
  const history = useHistory();
  const [items, setItems] = React.useState(allItems);
  useEffect(() => {
    // use axios to get user info
  });

  if(!sessionId || Date.now() >= sessionExpires) {
    history.push('/login');
    return <div>Please Login</div>
  }

  //let userInfo = axios.get()
  // is protected only logged user can view
    return (
      <>
      <NavBar />
        <h1>SUP {localStorage.getItem('sessionId')} hi</h1>
        <button onClick={()=>{
          console.log(items, items[items.length-1].x);
setItems(items.filter(item=>item.x!=='socks'));
        }}> do something</button>
        {/*
             <CardItem
              label='Shirt'
              src='images/services/T-Shirt_1.png'
              RFID = 'ABC123'
              active = 'I'
              timesUsed = '15'
              text='Item Description'
            />


        */}
          <ul className='cards__items'>
        {items.map((item) => {
          return  (
            <CardItem
              label={item.x}
            />
            )
          })}
          </ul>
      <Footer />
      </>
    )
}

export default UserPage;