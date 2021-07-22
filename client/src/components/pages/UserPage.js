import React, {useEffect,useState} from 'react'
import '../../App.css'
import Footer from '../Footer'
import UserPageButton from '../UserpageButtons/UserPageButton'
import NavBar from '../NavBar'
import CardItem from '../serviceCardItem'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
import { set } from 'mongoose'
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
let data = {};
function UserPage() {
  const history = useHistory();
  const [items, setItems] = React.useState([]);
  const [data, setData] = React.useState({email:[],fullName:'',_id:''});
  const [wardrobes, setWardrobes] = React.useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [wardrobeId, setWardrobeId] = useState('');
  function refreshAllData() {
    // Fetch all the data that you need for the page
    fetchData().then(({data:{email, fullName, wardrobe,_id}}) =>{
      setData({ email, fullName, _id });
      setWardrobes(wardrobe);
    })
  }

  // Refresh all data on the first page load
  useEffect(refreshAllData, []);

  if(!sessionId || Date.now() >= sessionExpires) {
    history.push('/login');
    return <div>Please Login</div>
  }
  // let dataLocal = JSON.parse(localStorage.getItem('data'));
  // setData(dataLocal);
  // console.log(data.wardrobe);
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
              {wardrobes.map((individualWardrobe,index) => {
                return  (
                  <>
                    <Box borderTop={0} borderRadius={16} m={3} > 
                    <Typography align ="center" variant="h6" gutterBottom >Wardrobe {index + 1}: {individualWardrobe.location}</Typography>
                    <Typography align ="left">Number Of Shirts : {individualWardrobe.totalNumberOfShirts}</Typography>
                    <Typography align ="left">Number Of Pants : {individualWardrobe.totalNumberOfPants}</Typography>
                    <Typography align ="left">Number Of Articles : {individualWardrobe.totalNumberOfArticles}</Typography>
                    <Grid container direction="row" alignContent="flex-start" justify="space-between">
                      <Button variant="contained" color="secondary" onClick={async()=>{
                        let userData = await api({
                            url:'/updateDB/deleteWardrobe',
                            method: 'POST',
                            data: {
                            wardrobe_id: individualWardrobe._id
                            }
                          })
                          refreshAllData();
                      }}>
                        Delete 
                      </Button>
                      <Button variant="contained" color="default" onClick={async()=>{
                        let userData = await api({
                            url:'/updateDB/deleteWardrobe',
                            method: 'POST',
                            data: {
                            wardrobe_id: individualWardrobe._id
                            }
                          })
                          refreshAllData();
                      }}>
                        Add Article 
                      </Button>
                      <Button variant="contained" color="primary" onClick={async()=>{
                        setItems(individualWardrobe.articleData);
                        setWardrobeId(individualWardrobe._id);
                        //try getting it to set wardrobe content
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
                          refreshAllData();
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
                refreshAllData();
              }}>
                Add Wardrobe
              </Button>
            </ul>
          </Grid>
          <Grid item xs={9}>
            <ul className='cards__items'>
              {items.map((individualItem) => {
                return  (
                  <>
                  <li>
                  <CardItem
                    label={individualItem.x}
                    RFID = {individualItem.RFID}
                    active = {individualItem.status}
                    timesUsed = {individualItem.timesUsed}
                    text='Item Description'
                  />
                    <Box display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" onClick={async()=>{
                           await api({
                            url:'/updateDB/removeArticle',
                            method: 'POST',
                            data: {
                            _id:  data._id,
                            wardrobe_id: wardrobeId,
                            RFID : individualItem.RFID,
                            type : individualItem.type
                            }
                          })
                          
                          refreshAllData();
                      }}>
                        Delete 
                      </Button>
                      <Button variant="contained" color="default" onClick={async()=>{
                        let userData = await api({
                            url:'/updateDB/deleteWardrobe',
                            method: 'POST',
                            data: {
                            wardrobe_id: individualItem._id
                            }
                          })
                          refreshAllData();
                      }}>
                        Update 
                      </Button>
                    </Box>
                      </li>
                  </>
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