import React from 'react';
import './aboutCard.css';
import AboutCardItem from './aboutCardItem';

function serviceCards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <AboutCardItem
              src='images/about/Me.jpeg'
              label ='CE'
              name = 'Juan Herrera'
              degree = 'College of Engineering and Computer Science'
              email = 'Juanherrera413@knights.ucf.edu'
              bio = 'Senior student at the University of Central Florida studying Computer Engineering. After Graduation in the summer of 2021, he will begin work with Lockheed Martin in Boulder, Colorado. He will be mainly working on Space Systems, and hopes to pursue a masters degree in late 2022.'
            />
            <AboutCardItem
              src='images/about/Oneal.png'
              label ='CE'
              name = "O'neal Thomas"
              degree = 'College of Engineering and Computer Science'
              email = 'onealthomas61@knights.ucf.edu'
              bio = 'a senior student at the University of Central Florida studying Computer Engineering. O’Neal has plans to move to Georgia following graduation at the university in order to begin his career as an electronics engineer working with the Air Force on radio communication systems.'
            />
          </ul>
          <ul className='cards__items'>
            <AboutCardItem
              src='images/about/Efren.jpeg'
              label ='EE'
              name = ' Efren Cintron'
              degree = 'College of Engineering and Computer Science'
              email = 'efrencintron7@knights.ucf.edu'
              bio = 'Senior student at the University of Central Florida studying Electrical engineering on Satellites and Communications Systems. After Graduation in the summer of 2021, he will move out to Tennessee to start a new beginning on his engineering career.'
            />
            <AboutCardItem
              src='images/about/Max.jpeg'
              label ='EE'
              name = 'Maximilian Carroll'
              degree = 'College of Engineering and Computer Science'
              email = 'maximilian@knights.ucf.edu'
              bio = 'Senior student at the University of Central Florida studying Electrical engineering. After Graduation in the summer of 2021, he will start pursuing his masters degree at UCF. He hopes to receive his masters in electrical engineering with a focus on power systems and will begin in the fall semester of 2021. '
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default serviceCards;