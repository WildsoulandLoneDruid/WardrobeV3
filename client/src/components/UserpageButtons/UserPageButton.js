import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
// const api = axios.create({
//     baseURL: `http://localhost:1337/api/`
//   });
  const api = axios.create({
    baseURL: ` https://wardrobev3.herokuapp.com/api/`
  })
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 10,
  },
});

async function UpdateWardrobe(){
    // let userData = await api({
    //         url:'/updateDB/deleteWardrobe',
    //         method: 'POST',
    //         data: {
    //         _id: sessionId
    //     }
    //   })
  }

    function SelectWardrobe(){
    console.log("I need nick here")
  }
  async function deleteWardrobe(){
    let data = JSON.parse(localStorage.getItem('data'));
    let userData = await api({
            url:'/credentials/userInfo',
            method: 'POST',
            data: {
            _id: data._id,
            wardrobe_id: data.wardrobe._id
        }
      })
      window.location.reload();
  }
function IconLabelButtons(props) {
  const { classes } = props;
  return (
    <Grid container direction="row" alignContent="flex-start">
      <Button variant="contained" color="secondary" onClick={deleteWardrobe}>
        Delete: 
      </Button>
      <Button variant="contained" color="primary" onClick={SelectWardrobe}>
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        Send
      </Button>
      <Button variant="contained" color="default" onClick={UpdateWardrobe}>
        Update
      </Button>
    </Grid>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelButtons);