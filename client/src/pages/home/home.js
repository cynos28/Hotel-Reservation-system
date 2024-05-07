import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";

import "../home/home.css";
import HeroImage from "../../assets/hero.jpg";
import { Link } from "react-router-dom";
import Rates from "../Review/RateDetails/Rates";
import aboutImage from "../../assets/about-us-img.jpg";
import BasicExample from "./homePageCard";
import Newsletter from "./NewsLetter"

function home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <h1>Your Stay, Our Passion – Where Comfort Meets Luxury!</h1>

          <p>
            Discover a haven of comfort and style at our hotel, where every
            detail is crafted to elevate your experience. Immerse yourself in
            luxury, unwind in elegance, and let our dedicated team turn moments
            into memories. Your stay is not just a reservation; it's a journey
            of unparalleled hospitality and personalized service.
          </p>
          <p>
            Welcome to a world where every visit is a story, and every guest is
            a cherished part of our narrative. Indulge in the perfect blend of
            comfort and sophistication, where your satisfaction is our ultimate
            commitment.
          </p>
          <div className="hero-buttons">
            <Link to="/login">
              {" "}
              <button className="button-login">
                <span className="label"> Login </span>
              </button>{" "}
            </Link>
            <Link to="/register">
              {" "}
              <button className="button-register">
                <span className="label"> Register </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={HeroImage} alt="Hero Image" />

        </div>  
        

      </section>
      {/* <section className="about-us-section">
        <div className="about-us-text">
          <h2>Welcome to the Hotel Heritage... </h2>
          <p>
            We are more than just a place to stay. We are a community of
            hospitality enthusiasts dedicated to creating unforgettable
            experiences for every guest. Our passion for excellence drives us to
            go above and beyond, ensuring that each visit is filled with warmth,
            comfort, and personalized care.
          </p>
        </div>
        <div className="aboutImg">
          <img src={aboutImage} alt="About Us Image" />
        </div>
      </section> */}

  
  

    

<BasicExample />
<Newsletter/>

    </div>


  );
}

export default home;
