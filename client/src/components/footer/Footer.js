import React from 'react'
import "./Footer.css";

function Footer() {
  return (
    <div>
      
      <header>
  {/* <!-- Content --> */}
</header>

<main>
  {/* <!-- Content --> */}
</main>

<footer class="footer">
  <div class="footer__addr">
    <h1 class="footer__logo_title">

      The Hritage
    </h1>
  
<br/>
<br/>
            Our passion for excellence drives us to
            go above and beyond, <br/>
            ensuring that each visit is filled with warmth,
            comfort, <br/>and personalized care.

  </div>
  
  <ul class="footer__nav">
    <li class="nav__item">
      <h2 class="nav__title">Policies</h2>
      <hr/>

      <ul class="nav__ul">
        <li>
          <a href="#">Contact Us</a>
        </li>

        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Terms and Conditions</a>
        </li>
      </ul>
    </li>
    
    <li class="nav__item nav__item--extra">
      <h2 class="nav__title">Quick Links</h2>
      <hr/>
      
      <ul class="nav__ul nav__ul--extra">
        <li>
          <a href="#">Rooms</a>
        </li>
        
        <li>
          <a href="#">Services</a>
        </li>
        
        <li>
          <a href="#">Galleries</a>
        </li>
        
        <li>
          <a href="#">About Us</a>
        </li>
        
        <li>
          <a href="/Profile">Profile</a>
        </li>
        
        <li>
        <a href="/login">Login</a>
        </li>
      </ul>
    </li>
    
    <li class="nav__item">
      <h2 class="nav__title">Contact</h2>
      <hr/>
      
      <address>
      27 Church Street ,Galle<br/>
          
      <a class="footer__btn" href="mailto:example@gmail.com">Email Us</a>
    </address>
    </li>
  </ul>
  
  <div class="copyright">
    <p>&copy; 2024 The Heritage. All rights reserved.</p>
    
    <div class="legal__links">
      
    </div>
  </div>
</footer>


    </div>
  ) 
}

export default Footer