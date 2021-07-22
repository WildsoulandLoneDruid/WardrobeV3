import React from 'react';
import { Link } from 'react-router-dom';
import './aboutCard.css';

function aboutCardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
        <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.name}</h5>
          </div>
          <figure className='cards__item__pic-wrap'data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Shirt'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.email}</h5>
            <h5 className='cards__item__text'>{props.degree}</h5>
            <h5 className='cards__item__text'>{props.bio}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default aboutCardItem;
