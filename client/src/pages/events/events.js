import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';
import "../events/events.css"; // Import the CSS file

const Events = () => {

  const publicEvents = [
    { id: 1, name: 'Friday DJ Party', date: '2024-02-20', status: 'Approved',venue:"At GrandPrime" },
    { id: 2, name: 'B&S Musical Event', date: '2024-02-25', status: 'Approved',venue:"At PrimeHall" },
    { id: 2, name: 'Public Event 2', date: '2024-02-26', status: 'Approved',venue:"At GrandPrime" },
    { id: 2, name: 'Public Event 2', date: '2024-02-27', status: 'Approved',venue:"At GrandPrime" }
  ];

  const personalEvents = [
    { id: 1, name: "Annie's Birthday", date: '2024-03-01', status: 'Pending', reason: 'Pending'},
    { id: 2, name: "Mr.Saman's Wedding", date: '2024-03-10', status: 'Declined', reason: 'Unable to contact customer' },
    { id: 1, name: "Annie's Birthday", date: '2024-03-01', status: 'Approved', reason: 'ok'}
  ];

  const getStatusColor = (status) => {
    switch (status) {
        case 'Declined':
            return 'red';
        case 'Pending':
            return 'orange';
        case 'Approved':
            return 'green';
        default:
            return 'gray'; // Default color for unknown status values
    }
};

  return (
    <div>
      <Header/>
      <div className="events-page">
        <div className="public-events">
          <h2 className='to1'>Public Events</h2>
          <div className="events-container">
            {publicEvents.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Venue:{event.venue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="personal-events">
          <h2 className='to1'>Personal Events</h2>
          <div className="events-container">
            {personalEvents.map(event => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Status:</p><div className="status-box" style={{ backgroundColor: getStatusColor(event.status) }}>
            <p>{event.status}</p>
        </div>
                {event.status === 'Declined' && <p style={{ color: 'red' }}>Reason: {event.reason}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Book Event Button */}
      <div className="book-event-button">Book Event</div>

      
      <Footer/>
    </div>
  )
}

export default Events;
