import React from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import './Hotel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import hotelData from '../../fakeData/hotelData';
import placeData from '../../fakeData/placeData';
import HotelDetails from '../HotelDetails/HotelDetails';
import MapView from '../MapView/MapView'

const Hotel = () => {
  const selectedPlaceId = localStorage.getItem('selectedPlace');
  const placeId = JSON.parse(selectedPlaceId);

  const findPlace = placeData.find((place) => place.placeId == placeId);
  const hotelsFilter = hotelData.filter((hotel) => hotel.placeId == placeId);

  return (
    <Container className='mt-5'>
      <hr />
      <small>252 stays Apr 13-17 3 guests</small>
      <h2>Stay in {findPlace.name}</h2>
      <Row className='d-flex justify-items-center align-items-center'>
        <Col md={8}>
          {hotelsFilter.map((hotel) => (
            <HotelDetails key={hotel.hotelId} hotel={hotel}></HotelDetails>
          ))}
        </Col>
        <Col md={4}>
          <h4 className="text-center">Hotel Location</h4>
          <MapView></MapView>
        </Col>
      </Row>
    </Container>
  );
};

export default Hotel;
