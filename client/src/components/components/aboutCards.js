import React from 'react';
import './serviceCards.css';
import aboutCardItem from './aboutCardItem';

function aboutCards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <aboutCardItem
              src='images/about/Juan.png'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='CpE'
            />
            <aboutCardItem
              src='images/about/Oneal.png'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='CpE'
            />
          </ul>
          <ul className='cards__items'>
            <aboutCardItem
              src='images/about/Max.png'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='EE'
            />
              <aboutCardItem
              src='images/about/Efren.png'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='EE'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default aboutCards;