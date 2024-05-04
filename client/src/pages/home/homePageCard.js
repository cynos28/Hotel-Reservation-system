import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Card1Image from './homePage/card1.jpg';
import Card2Image from './homePage/card2.jpg';
import Card3Image from './homePage/card3.jpg';
import Card4Image from './homePage/card4.jpg';
import Card5Image from './homePage/card5.jpg';

function BasicExample() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle = {
    marginBottom: '20px',
    fontSize: '36px',
    color: '#000066',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  };

  const cardStyle = {
    width: '30rem',
    marginBottom: '20px',
  };

  const cardImageStyle = {
    height: '285px',
    objectFit: 'cover',
  };

  const cardTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000099',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Our Services</h2>
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <Card>
            <Card.Img variant="top" src={Card1Image} style={cardImageStyle} />
            <Card.Body>
              <Card.Title style={cardTitleStyle}>Accommodation Services</Card.Title>
              <Card.Text>
                Accommodation services in a hotel reservation system encompass a range of room options tailored to meet the diverse needs and preferences of guests. From standard rooms to luxurious suites, guests have access to a variety of accommodations designed to provide comfort and convenience during their stay.
              </Card.Text>
     
            </Card.Body>
          </Card>
        </div>
        <div style={cardStyle}>
          <Card>
            <Card.Img variant="top" src={Card2Image} style={cardImageStyle} />
            <Card.Body>
              <Card.Title style={cardTitleStyle}>Dining Services</Card.Title>
              <Card.Text>
                Dining services offered through a hotel reservation system aim to provide guests with a delightful culinary experience during their stay. Guests have the option to dine at on-site restaurants offering a diverse selection of cuisines to suit different tastes and preferences. Additionally, room service facilities enable guests to enjoy delicious meals and refreshments in the comfort and privacy of their rooms.
              </Card.Text>

            </Card.Body>
          </Card>
        </div>
        <div style={cardStyle}>
          <Card>
            <Card.Img variant="top" src={Card3Image} style={cardImageStyle} />
            <Card.Body>
              <Card.Title style={cardTitleStyle}>Leisure and Entertainment Services</Card.Title>
              <Card.Text>
                Leisure and entertainment services in a hotel reservation system cater to guests seeking relaxation and recreation during their stay. Spa and wellness centers offer a range of rejuvenating treatments and activities aimed at promoting physical and mental well-being. Fitness centers equipped with state-of-the-art equipment provide guests with the opportunity to maintain their fitness routine while traveling.
              </Card.Text>
        
            </Card.Body>
          </Card>
        </div>
        <div style={cardStyle}>
          <Card>
            <Card.Img variant="top" src={Card4Image} style={cardImageStyle} />
            <Card.Body>
              <Card.Title style={cardTitleStyle}>Business and Events</Card.Title>
              <Card.Text>
                Business and event services provided through a hotel reservation system cater to the needs of corporate travelers and event organizers. Meeting rooms equipped with modern amenities serve as ideal venues for conferences, seminars, and business meetings. Banquet halls offer spacious and elegant settings for hosting weddings, receptions, and other special events.
              </Card.Text>
           
            </Card.Body>
          </Card>
        </div>
        <div style={cardStyle}>
          <Card>
            <Card.Img variant="top" src={Card5Image} style={cardImageStyle} />
            <Card.Body>
              <Card.Title style={cardTitleStyle}>Concierge Services</Card.Title>
              <Card.Text>
                Concierge services play a crucial role in enhancing the overall guest experience by providing personalized assistance and support throughout their stay. Staff at the concierge desk are available to assist guests with various requests, including booking tours, arranging transportation, and providing recommendations for dining and entertainment options.
              </Card.Text>
        
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BasicExample;
