import React from 'react';
import './serviceCards.css';
import ServiceCardItem from './serviceCardItem';

function serviceCards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <ServiceCardItem
              src='images/services/T-Shirt_1.png'
              type = 'Shirt'
              RFID = 'ABC123'
              active = 'inactive'
              timesUsed = '15'
            />
            <ServiceCardItem
              src='images/services/Pants_1.jpg'
              type = 'Pants'
              RFID = 'LOL908'
              active = 'inactive'
              timesUsed = '12'
            />
            <ServiceCardItem
            src='images/services/T-Shirt_2.png'
            type = 'Shirt'
            RFID = 'HAS786'
            active = 'active'
            timesUsed = '7'
            />
          </ul>
          <ul className='cards__items'>
          <serviceCardItem
              src='images/services/Pants_2.png'
              type = 'Pants'
              RFID = 'TTTY89'
              active = 'inactive'
              timesUsed = '5'
            />
            <serviceCardItem
              src='images/services/T-Shirt_3.png'
              type = 'Shirt'
              RFID = 'LMN789'
              active = 'inactive'
              timesUsed = '2'
            />
            <serviceCardItem
            src='images/services/Pants_3.png'
            type = 'Pants'
            RFID = 'DEF321'
            active = 'inactive'
            timesUsed = '0'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default serviceCards;