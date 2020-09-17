import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';

// ============================================================================================

// Get the hotel details from the Hotel component as props and show in this component
const HotelDetails = (props) => {
const {title, image, room, feature, cancellation, rating, price, total} = props.hotel

    return (
        <Card className='hotel-card mt-3'>
            <div className='card-horizontal'>
              <div className='img-square-wrapper'>
                <img
                  src={image}
                  style={{ width: '270px', height: '188px' }}
                  alt='Card'
                />
              </div>
              <Card.Body>
                <Card.Title>
                  {title}
                </Card.Title>
                <Card.Text className='mb-1'>
                  {room}
                </Card.Text>
                <Card.Text className='mb-1'>
                 {feature}
                </Card.Text>
                <Card.Text className='mb-1'>
                  {cancellation}
                </Card.Text>

                <div>
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                    {rating}
                  </span>
                  <span> {price} </span>
                <span> {total}</span>
                </div>
              </Card.Body>
            </div>
          
          </Card>
    );
};

export default HotelDetails;