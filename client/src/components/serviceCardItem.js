import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'> Description: {props.text}</h5>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} justifyContent="flex-start"><h5 className='cards__item__text'>RFID: {props.RFID}</h5></Grid>
              <Grid item xs={6}><h5 className='cards__item__text'>Times Used: {props.timesUsed}</h5></Grid>
              <Grid item xs={6}><h5 className='cards__item__text'>Status: {props.active} </h5> </Grid>
            </Grid>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;