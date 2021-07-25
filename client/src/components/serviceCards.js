import React from 'react';
import './cards.css';
import CardItem from './serviceCardItem';

function serviceCards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              label='Shirt'
              src='images/services/T-Shirt_1.png'
              RFID = 'ABC123'
              active = 'I'
              timesUsed = '15'
              text='Item Description'
            />
            <CardItem
              text='Item Description'
              label='Pants'
              src='images/services/Pants_1.jpg'
              RFID = 'LOL908'
              active = 'I'
              timesUsed = '12'
            />
            <CardItem
              src='images/services/T-Shirt_2.png'
              label='Pants'
              RFID = 'HAS786'
              active = 'A'
              timesUsed = '7'
              text='Item Description'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
            src='images/services/Pants_2.png'
            label='Pants'
            RFID = 'HAS786'
            active = 'A'
            timesUsed = '7'
            text='Item Description'
            />
            <CardItem
            src='images/services/T-Shirt_3.png'
            label = 'Shirt'
            RFID = 'LMN789'
            active = 'A'
            timesUsed = '2'
            text='Item Description'
            />
            <CardItem
              src='images/services/Pants_3.png'
              label = 'Pants'
              RFID = 'DEF321'
              active = 'I'
              timesUsed = '0'
              text='Item Description'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default serviceCards;