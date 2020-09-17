import React, { useState } from 'react';
import { Carousel, Jumbotron } from 'react-bootstrap';
import './Home.css';
import placeData from '../../fakeData/placeData';
import HomeBody from '../HomeBody/HomeBody';

// ============================================================================================

// Set up background image and Carousel and send placeData as props to HomeBody Component
const Banner = () => {
  const [places, setPlaces] = useState(placeData);
 
  return (
    <Jumbotron className='hero d-flex align-items-center text-center'>
      <Carousel style={{ width: '100%' }}>
        {places.map((place) => (
          <Carousel.Item>
            <HomeBody key={place.placeId} place={place}></HomeBody>
          </Carousel.Item>
        ))}
      </Carousel>
    </Jumbotron>
  );
};

export default Banner;
