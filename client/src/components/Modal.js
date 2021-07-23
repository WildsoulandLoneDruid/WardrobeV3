import React, { useState } from "react";
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { sizing } from '@material-ui/system';
import axios from 'axios';


function ModalComponent(probs) {
  const [showModal, setShowModal] = useState(false);
  const [newRFID, setnewRFID] = useState('');
  const [newColor, setnewColor] = useState('');
  const [newType, setnewType] = useState('');


//   const api = axios.create({
//     baseURL: `http://localhost:1337/api/`
//   });
  const api = axios.create({
    baseURL: ` https://wardrobev3.herokuapp.com/api/`
  })
  
  //console.log(probs.id)
  return (
    <div key={probs.index}>
     <Button variant="contained" color="default" onClick={()=>setShowModal(true)}>
                        Add Article
                      </Button>
        <Box container width={1/4}>
            <Modal onRequestClose={() => setShowModal(false)} isOpen={showModal} 
            style={{
                overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
                },
                content: {
                position: 'absolute',
                top: '250px',
                left: '325px',
                right: '40px',
                bottom: '40px',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
                width:'50%',
                height:'300px'
                }
            }}
        >
            <h1>{probs.wardrobe.location}</h1>
            <TextField fullWidth id="standard-basic" label="RFID"  value ={newRFID} onInput={e => setnewRFID(e.target.value)} />
            <TextField fullWidth id="standard-basic" label="COLOR" value ={newColor} onInput={e => setnewColor(e.target.value)} />
            <TextField fullWidth id="standard-basic" label="TYPE"  value ={newType} onInput={e => setnewType(e.target.value.toLowerCase())} />
            <Grid container direction="row-reverse">
                <Button variant="contained" color="default" onClick={async()=>
                    {
                        //console.log(probs.id)
                        let temp = await api({
                            url:'/updateDB/addArticle',
                            method: 'POST',
                            data: {
                            _id:  probs.id,
                            wardrobe_id: probs.wardrobe._id,
                            RFID : newRFID,
                            color: newColor,
                            type : newType
                            }
                          })
                        setShowModal(false)
                    }
                }>
                                Submit
                </Button>
            </Grid>
            </Modal>
        </Box>
    </div>
  );
}

export default ModalComponent;