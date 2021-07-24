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
import ModalComponent from "../Modal";
import ModalComponentUpdate from "../updateModal/Modal";

let baseURL = `http://localhost:1337/api/`;
let baseURL2 = `http://localhost:1337/`;
const api = axios.create({
  baseURL: baseURL 
});
// let baseURL2 = `http://localhost:1337/`;
// const api = axios.create({
//   baseURL: ` https://wardrobev3.herokuapp.com/api/`
// })

// const sessionId = localStorage.getItem('sessionId');
// const sessionExpires = Number(localStorage.getItem('sessionExpires'));

function fetchData(){
  const sessionId = localStorage.getItem('sessionId');
  console.log('here 213 ' + sessionId);
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
  const [selectedWardrobeId, setSelectedWardrobeId] = React.useState([]);
  const [data, setData] = React.useState({email:[],fullName:'',_id:''});
  const [wardrobes, setWardrobes] = React.useState([]);
  const [newLocation, setNewLocation] = useState('');
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const sessionId = localStorage.getItem('sessionId');
  const sessionExpires = Number(localStorage.getItem('sessionExpires'));

  function refreshAllData() {
    // Fetch all the data that you need for the page
    fetchData().then(({data:{email, fullName, wardrobe,_id}}) =>{
      setData({ email, fullName, _id });
      setWardrobes(wardrobe);
    })
  }

  // Refresh all data on the first page load
  useEffect(refreshAllData, []);
  //console.log(data._id); 
  if(!sessionId || Date.now() >= sessionExpires) {
    history.push('/login');
    return <div>Please Login</div>
  }
    return (
      <>
      <NavBar flag='true' name={data.fullName}/>
        <h1>Welcome {JSON.stringify(data.fullName)} To Your Wardrobes</h1>
        <Grid container spacing={1}>
          <Grid item xs={3} container direction="column" alignItems="center">
          <ul >
              {wardrobes.map((individualWardrobe,index) => {
                // TODO Break this into it's own component so that it can have it's own state and be independent inputs
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
                      <ModalComponent wardrobe = {individualWardrobe} index = {index} id = {data._id} onSubmit={()=>{
                        refreshAllData();
                        setSelectedWardrobeId(individualWardrobe._id);
                      }} />
                      <Button variant="contained" color="primary" onClick={async()=>{
                        setSelectedWardrobeId(individualWardrobe._id);
                        refreshAllData();
                        //try getting it to set wardrobe content so like setwardorbecontents
                      }}>
                        Select
                      </Button>
                    </Grid>
                    <Grid direction="row">
                    <ModalComponentUpdate wardrobe = {individualWardrobe} index = {index} onSubmit={()=>{
                        refreshAllData();
                      }} />
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
              <Button fullWidth variant="contained" color="secondary" onClick={()=>{
                  localStorage.removeItem('sessionId');
                  localStorage.removeItem('sessionExpires');
                  setSelectedWardrobeId([]);
                  setData({email:[],fullName:'',_id:''});
                  setWardrobes([]);
                  setNewLocation('');
                // this here is not working everything else is good
                //this.forceUpdate();
                history.push('/')
              }}>
                Log Out
              </Button>
            </ul>
          </Grid>
          <Grid item xs={9}>
            <ul className='cards__items'>
              {wardrobes.find(w=>w._id === selectedWardrobeId)?.articleData?.map((individualItem) => {
                // console.log(individualItem.RFID);
                return  (
                  <>
                  <li>
                  <CardItem
                    src={baseURL2 + individualItem.picture}
                    label={individualItem.x}
                    RFID = {individualItem.RFID}
                    color = {individualItem.color}
                    active = {individualItem.status}
                    timesUsed = {individualItem.timesUsed}
                    text={individualItem.desc}
                  />
                    <Box display="flex" justifyContent="center">
                    <Button variant="contained" color="secondary" onClick={async()=>{
                           let temp = await api({
                            url:'/updateDB/removeArticle',
                            method: 'POST',
                            data: {
                            _id:  data._id,
                            wardrobe_id: selectedWardrobeId,
                            RFID : individualItem.RFID,
                            type : individualItem.type
                            }
                          })
                          refreshAllData();
                      }}>
                        Delete 
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