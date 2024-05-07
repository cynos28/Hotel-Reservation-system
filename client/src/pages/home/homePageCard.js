import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Card1Image from './homePage/card1.jpg';
import Card2Image from './homePage/card2.jpg';
import Card3Image from './homePage/card3.jpg';
import Card4Image from './homePage/card4.jpg';
import Card5Image from './homePage/card5.jpg';
import { AnimationOnScroll } from 'react-animation-on-scroll';

function BasicExample() {
 const containerStyle = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   backgroundColor: '#f5f5f5',
   padding: '40px 0',
 };

 const titleStyle = {
   marginBottom: '40px',
   fontSize: '48px',
   color: '#333',
   textAlign: 'center',
   fontWeight: 'bold',
   fontFamily: 'Georgia, serif',
 };

 const cardContainerStyle = {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
   maxWidth: '1200px',
 };

 const cardStyle = {
   width: '350px',
   margin: '20px',
   boxShadow: '0 0 10px rgba(32, 106, 93, 0.2)',
   borderRadius: '10px',
   overflow: 'hidden',
 };

 const cardImageStyle = {
   height: '250px',
   objectFit: 'cover',
 };

 const cardTitleStyle = {
   fontSize: '24px',
   fontWeight: 'bold',
   color: '#333',
   marginBottom: '10px',
   padding: '10px',
   backgroundColor: '#f2f2f2',
   textAlign: 'center',
 };

 const cardTextStyle = {
   padding: '10px',
   textAlign: 'justify',
   lineHeight: '1.5',
   color: '#666',
 };

 return (
   <div>
     <div style={containerStyle}>
       <h2 style={titleStyle}>Our Services</h2>
       <div style={cardContainerStyle}>
         <AnimationOnScroll animateIn="fadeIn">
           <div style={cardStyle}>
             <Card>
               <Card.Img variant="top" src={Card1Image} style={cardImageStyle} />
               <Card.Body>
                 <Card.Title style={cardTitleStyle}>Accommodation</Card.Title>
                 <Card.Text style={cardTextStyle}>
                   Variety of rooms to suit your needs and preferences.
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
         </AnimationOnScroll>
         <AnimationOnScroll animateIn="fadeIn" delay={30}>
           <div style={cardStyle}>
             <Card>
               <Card.Img variant="top" src={Card2Image} style={cardImageStyle} />
               <Card.Body>
                 <Card.Title style={cardTitleStyle}>Dining</Card.Title>
                 <Card.Text style={cardTextStyle}>
                   Delectable cuisine and room service for your dining pleasure.
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
         </AnimationOnScroll>
         <AnimationOnScroll animateIn="fadeIn" delay={400}>
           <div style={cardStyle}>
             <Card>
               <Card.Img variant="top" src={Card3Image} style={cardImageStyle} />
               <Card.Body>
                 <Card.Title style={cardTitleStyle}>Leisure & Entertainment</Card.Title>
                 <Card.Text style={cardTextStyle}>
                   Rejuvenating spa treatments and fitness facilities.
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
         </AnimationOnScroll>
         <AnimationOnScroll animateIn="fadeIn" delay={600}>
           <div style={cardStyle}>
             <Card>
               <Card.Img variant="top" src={Card4Image} style={cardImageStyle} />
               <Card.Body>
                 <Card.Title style={cardTitleStyle}>Business & Events</Card.Title>
                 <Card.Text style={cardTextStyle}>
                   Venues for meetings, conferences, and special events.
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
         </AnimationOnScroll>
         <AnimationOnScroll animateIn="fadeIn" delay={800}>
           <div style={cardStyle}>
             <Card>
               <Card.Img variant="top" src={Card5Image} style={cardImageStyle} />
               <Card.Body>
                 <Card.Title style={cardTitleStyle}>Concierge Services</Card.Title>
                 <Card.Text style={cardTextStyle}>
                   Personalized assistance for all your needs during your stay.
                 </Card.Text>
               </Card.Body>
             </Card>
           </div>
         </AnimationOnScroll>
       </div>
     </div>
   </div>
 );
}

export default BasicExample;