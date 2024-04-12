import React from 'react'
import Header from '../../components/header/header'
import "../ContactUs/contact.css"
import Footer from '../../components/footer/Footer';


// Shared Tailwind CSS classes
const inputClasses = "appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white";
const selectClasses = "block appearance-none w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500";

const Contactus = () => {

  return (
    <>
    <Header />
    <div >
    <section class="contact-page-section">
      <div class="container">
          <div class="sec-title">
              <div class="title">Contact Us</div>
                <h2>Let's Get in Touch.</h2>
            </div>
            <div class="inner-container">
              <div class="row clearfix">
                
                 
                    <div class="form-column col-md-8 col-sm-12 col-xs-12">
                      <div class="inner-column">
                          
                            
                            <div class="contact-form">
                                <form method="post" action="sendemail.php" id="contact-form">
                                    <div class="row clearfix">
                                        <div class="form-group col-md-6 col-sm-6 co-xs-12">
                                            <input type="text" name="name" value="" placeholder="Name" required></input >
                                        </div>
                                        <div class="form-group col-md-6 col-sm-6 co-xs-12">
                                            <input type="email" name="email" value="" placeholder="Email" required></input >
                                        </div>
                                        <div class="form-group col-md-6 col-sm-6 co-xs-12">
                                            <input type="text" name="subject" value="" placeholder="Subject" required></input >
                                        </div>
                                        <div class="form-group col-md-6 col-sm-6 co-xs-12">
                                            <input type="text" name="phone" value="" placeholder="Phone" required></input >
                                        </div>
                                        <div class="form-group col-md-12 col-sm-12 co-xs-12">
                                            <textarea name="message" placeholder="Massage"></textarea>
                                        </div>
                                        <div class="form-group col-md-12 col-sm-12 co-xs-12">
                                            <button type="submit" class="theme-btn btn-style-one">Send Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                           
                            
                        </div>
                    </div>
                    
                   
                    <div class="info-column col-md-4 col-sm-12 col-xs-12">
                      <div class="inner-column">
                          <h2>Contact Info</h2>
                            <ul class="list-info">
                              <li><i class="fas fa-globe"></i>The Heritage Hotel Galle.</li>
                                <li><i class="far fa-envelope"></i>contactus@heritage.com</li>
                                <li><i class="fas fa-phone"></i>011 2598 258 <br/> 011 3587 469</li>
                            </ul>
                            <ul class="social-icon-four">
                                <li class="follow">Follow on: </li>
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#"><i class="fab fa-dribbble"></i></a></li>
                                <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section> 
    </div>
    <Footer />
    </>
  );
};

export default Contactus;
