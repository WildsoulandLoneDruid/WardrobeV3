import React, {useEffect,useState} from 'react'
import '../../App.css'
import Footer from '../Footer'
import UserPageButton from '../UserpageButtons/UserPageButton'
import NavBar from '../NavBar'
import CardItem from '../CardItem'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
let allItems = [
  {x:'shirt', y:1},
  {x:'pants', y:2},
  {x:'socks', y:3},
];
let allItems2 = [
  {x:'6', y:1},
  {x:'7', y:2},
  {x:'8', y:3},
  {x:'9', y:3},
  {x:'10', y:3},
  {x:'11', y:3},
];
let allItems3 = [
  {x:'1', y:1},
  {x:'2', y:2},
  {x:'3', y:3},
  {x:'4', y:3},
  {x:'5', y:3},
  {x:'6', y:3},
];
const api = axios.create({
  baseURL: `http://localhost:1337/api/`
});

let newLocation = null;
const sessionId = localStorage.getItem('sessionId');
const sessionExpires = Number(localStorage.getItem('sessionExpires'));

function fetchData(){
  return api({
    url:'/credentials/userInfo',
    method: 'POST',
    data: {
      _id: sessionId
    }
  })
}

function UserPage() {
  const history = useHistory();
  const [items, setItems] = React.useState(allItems);
  const [newLocation, setNewLocation] = useState('');
  // NICK START
  function refreshAllData() {
    // Fetch all the data that you need for the page
    fetchData().then(data =>{
      // If you are doing multiple async calls, you can use Promise.all 
      // like: Promise.all([fetchUser(), fetchWarddrobe()]).then(([userData, wardrobes]) => { setUserData(userData); setWardrobeData(wardrobes); });
      // or if just one then: setData(data);
    })
  }

  // Refresh all data on the first page load
  useEffect(refreshAllData, []);
  // NICK END

  if(!sessionId || Date.now() >= sessionExpires) {
    history.push('/login');
    return <div>Please Login</div>
  }
  let data = JSON.parse(localStorage.getItem('data'));
  // is protected only logged user can view
    return (
      <>
      <NavBar flag='true' name={data.fullName}/>
        <h1>Welcome {JSON.stringify(data.fullName)} To Your Wardrobes</h1>
        {/* <button onClick={()=>{
        console.log(items, items[items.length-1].x);
        setItems(items.filter(item=>item.x!=='socks'));
        }}> do something</button> */}
        {/*f
             <CardItem
              label='Shirt'
              src='images/services/T-Shirt_1.png'
              RFID = 'ABC123'
              active = 'I'
              timesUsed = '15'
              text='Item Description'
            />
        */}
        <Grid container spacing={1}>
          <Grid item xs={3} container direction="column" alignItems="center">
          <ul >
              {data.wardrobe.map((individualWardrobe,index) => {
                return  (
                  <>
                    <Box borderTop={0} borderRadius={16} m={3} > 
                    <Typography align ="center" variant="h6" gutterBottom >Wardrobe {index + 1}: {individualWardrobe.location}</Typography>
                    <Typography align ="left">Number Of Shirts : {individualWardrobe.totalNumberOfShirts}</Typography>
                    <Typography align ="left">Number Of Pants : {individualWardrobe.totalNumberOfPants}</Typography>
                    <Typography align ="left">Number Of Articles : {individualWardrobe.totalNumberOfArticles}</Typography>
                    <Grid container direction="row" alignContent="flex-start" justify="space-between">
                      <Button variant="contained" color="secondary" onClick={async()=>{
                        // NICK START

                        // You can do any api call and if it updates something in the database then
                        let userData = await api({
                            url:'/updateDB/deleteWardrobe',
                            method: 'POST',
                            data: {
                            wardrobe_id: individualWardrobe._id
                            }
                          })
                          // you refresh all the data you need to
                          refreshAllData();
                          // NICK END
                      }}>
                        Delete 
                      </Button>
                      <Button variant="contained" color="primary" onClick={async()=>{
                        setItems(allItems2);
                      }}>
                        Send
                      </Button>
                    </Grid>
                    <Grid container direction="row-reverse">
                    <TextField fullWidth id="standard-basic" label="Location" value ={newLocation} onInput={e => setNewLocation(e.target.value)}/>
                    <Button variant="contained" color="default" onClick={async()=>{
                        let userData = await api({
                            url:'/updateDB/updateWardrobe',
                            method: 'POST',
                            data: {
                            wardrobe_id: individualWardrobe._id,
                            location: newLocation
                            }
                          })
                          // this here is not working everything else is good
                          // history.push('/userpage');

                      }}>
                        Update
                      </Button>
                      </Grid>
                    </Box>
                  </>
                  )
                })}
                <Button fullWidth variant="contained" color="primary" onClick={async()=>{
                console.log(data._id)
                let userData = await api({
                  url:'/updateDB/AddWardrobe',
                  method: 'POST',
                  data: {
                  _id: data._id,
                  location : "Temporary"
                  }
                })
                // this here is not working everything else is good
                //this.forceUpdate();
              }}>
                Add Wardrobe
              </Button>
            </ul>
          </Grid>
          <Grid item xs={9}>
            <ul className='cards__items'>
              {items.map((item) => {
                return  (
                  <CardItem
                    label={item.x}
                  />
                  )
                })}
          </ul> 
          </Grid>
        </Grid>
        
        {/* <ul className='cards__items'>
        {items.map((item) => {
          return  (
            <CardItem
              label={item.x}
            />
            )
          })}
          </ul> */}
      <Footer />
      </>
    )
}

export default UserPage;