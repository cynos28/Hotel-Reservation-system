import React from 'react';
import './aboutUs.css';
import Image1 from './images/image1.jpg';
import Image2 from './images/image2.jpg';
import Image3 from './images/image3.jpg';
import Image4 from './images/image4.jpg';

const AboutUs = () => {
  return (
    <div className='aboutus-body'>
    <div className="about-us-container">
      <div className="about-us-header">
        <h2 className="about-us-title">Welcome to the Heritage Grand</h2>
        <h3 className="about-us-subtitle">Heritage Grand is part of Culture</h3>
      </div>
      <div className="about-us-content">
        <p className="about-us-description">
          Brilliant service with experience of serving thousands of happy customers throughout the ages. A fine dining
          experience with a variety of food items and styles. Make your dream event come to life with Heritage luxurious
          series of Banquet Halls. Make yourself at home with luxury and a great quality of service with our wide range
          of rooms. Most of our 4 Banquet Halls come with a reasonable price, uniting great design & innovation with
          personal, friendly modern service as well as outstanding offerings "All Under One Roof".
        </p>
        <p className="about-us-description">
          Memories are meant to be revisited. We invite you to experience Heritage Resorts, Badulla through the eyes of
          fellow travelers & share unforgettable moments from your own stay.
        </p>
        <div className="about-us-stats">
          <div className="about-us-stat">
            <div className="about-us-stat-icon">
              <i className="fas fa-smile"></i>
            </div>
            <h4 className="about-us-stat-number">164</h4>
            <p className="about-us-stat-label">Happy Clients</p>
          </div>
          <div className="about-us-stat">
            <div className="about-us-stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h4 className="about-us-stat-number">600</h4>
            <p className="about-us-stat-label">Events Done</p>
          </div>
          <div className="about-us-stat">
            <div className="about-us-stat-icon">
              <i className="fas fa-history"></i>
            </div>
            <h4 className="about-us-stat-number">3</h4>
            <p className="about-us-stat-label">Years of Experienced</p>
          </div>
        </div>
      </div>
      <div className="about-us-image-grid">
        <div className="about-us-image-container">
          <img src={Image1} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-image-container">
          <img src={Image2} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-image-container">
          <img src={Image3} alt="About Us" className="about-us-image" />
        </div>
        <div className="about-us-image-container">
          <img src={Image4} alt="About Us" className="about-us-image" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;