import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './slick.css';

const testimonials = [
    {
        name: 'JBradd Pitt',
        title: 'Customer',
        quote: 'Lorem ipsum dolor sit amet consectetur. Condimentum eget vitae ligula sed urna sit sagittis interdum a. Blandit mattis mattis lobortis orci. Facilisis dui sagittis tempor egestas pellentesque eu mauris.',
        profilePic: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Victor Pugh',
        title: 'Customer',
        quote: 'Lorem ipsum dolor sit amet consectetur. Condimentum eget vitae ligula sed urna sit sagittis interdum a. Blandit mattis mattis lobortis orci. Facilisis dui sagittis tempor egestas pellentesque eu mauris.',
        profilePic: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Jacqueline Wright',
        title: 'Customer',
        quote: 'Lorem ipsum dolor sit amet consectetur. Condimentum eget vitae ligula sed urna sit sagittis interdum a. Blandit mattis mattis lobortis orci. Facilisis dui sagittis tempor egestas pellentesque eu mauris.',
        profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const OurHappyClients = () => {
    return (
        <div className="our-happy-clients">
            <h2>Our Happy Clients</h2>
            <div className="testimonial-container">
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial" key={index}>
                        <img src={testimonial.profilePic} alt={`${testimonial.name}'s profile`} />
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.title}</p>
                        <blockquote>{testimonial.quote}</blockquote>
                    </div>

                ))}
            </div>

            <div>
                <Link to ="/rates">
                <button class="cta">
                    <span>Submit a review</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                        
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </button> </Link>
            </div>
        </div>
    );
};

export default OurHappyClients;