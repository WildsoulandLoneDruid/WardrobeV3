import React from 'react';
import { Link } from 'react-router-dom';

function serviceCardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
             <div class="row">
               <div class="col-sm">
                  RFID: {props.RFID}
               </div>
               <div class="col-sm">
                  type: {props.type}
               </div>
               <div class="col-sm">
                  Times Used: {props.timesUsed}
               </div>
               <div class="col-sm">
                  Active: {props.active}
               </div>
              </div> 
          </div>
        </Link>
      </li>
    </>
  );
}

export default serviceCardItem;