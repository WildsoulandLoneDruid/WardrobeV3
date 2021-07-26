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
  const [newLocation, setnewLocation] = useState('');
  const [newType, setnewType] = useState('');
  const [newDesc, setnewDesc] = useState('');
  const [selectedFile, setselectedFile] = useState(null);
  function  fileSelectedHandler (event) {
    setselectedFile(event.target.files[0]);
  }
  // const api = axios.create({
  //   baseURL: `http://localhost:1337/api/`
  // });
  const api = axios.create({
    baseURL: ` https://wardrobev3.herokuapp.com/api/`
  })
  
  //console.log(probs.id) tesing-
  return (
    <div key={probs.index}>
     <Button variant="contained" color="default" onClick={()=>setShowModal(true)}>
                        Update  
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
                height:'350px'
                }
            }}
        >
            <h1>Updating Article</h1>
            <input type="file" onChange={e => fileSelectedHandler(e)}/>
            <TextField fullWidth id="standard-basic" label="desc"  value ={newDesc} onInput={e => setnewDesc(e.target.value)} />
            <TextField fullWidth id="standard-basic" label="type"  value ={newType} onInput={e => setnewType(e.target.value)} />
            <Grid container direction="row-reverse">
                <Button variant="contained" color="default" onClick={async()=>
                    {
                        var bodyFormData = new FormData();
                        bodyFormData.append('_id',  probs.id);
                        bodyFormData.append('wardrobe_id', probs.wardrobe);
                        bodyFormData.append('RFID', probs.RFID);
                        bodyFormData.append('type', newType);
                        bodyFormData.append('desc', newDesc);
                        bodyFormData.append('picture', selectedFile);
                        //console.log(bodyFormData.get('_id'));
                        let temp = await api({
                            url:'/updateDB/updateArticle',
                            method: 'POST',
                            data: bodyFormData,
                            headers: { "Content-Type": "multipart/form-data" }
                          })
                        setShowModal(false)
                        probs.onSubmit()
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