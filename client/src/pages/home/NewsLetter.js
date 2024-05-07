import React, { useState } from 'react';
import "./home.css";

function NewsLetter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Email submitted:', email);
    alert("Thank You For signing up !");
    
    setEmail('');
  };

  return (
    <div className="newsletter-wrapper">
      <div className="newsletter-container">
      <h3>        Subscribe to our Newsletter</h3>
        <form onSubmit={handleSubmit}>
        
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
