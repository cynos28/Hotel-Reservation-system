import React from "react";
import Gym from "./img/gim.jpg";
import Pool from "./img/pool.jpg";
import Bar from "./img/kanten.jpg";
import Spa from "./img/spar.jpg";
import Vehical from "./img/taxxi.jpg";
import Day from "./img/six.jpg";
import Specitiol from "./img/five.jpg";
import Pet from "./img/for.jpg";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/Footer";
function Category() {
  return (
    <>
      <Header />

      <div className="backimg1">
        <div>
          <h1 className="topic_extra">
            Our Extra<span className="sub_topic_extra"> Facilities!!</span>
          </h1>
          <div className="fullbox_set_cat">
            <div className="cat_box_extra">
              <img src={Gym} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">GYM</h3>
              <p className="cat_para">
                "Fully-equipped hotel gym: cardio machines, free weights, and
                yoga mats for your workout convenience and comfort"
              </p>
              <h3 className="cat_topic_price">Rs.2500 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Pool} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">POOL</h3>
              <p className="cat_para">
                "Relax in our serene hotel swimming pool oasis, a tranquil
                retreat for ultimate refreshment and rejuvenation"
              </p>
              <h3 className="cat_topic_price">Rs.3000 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Bar} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">BAR SERVICES</h3>
              <p className="cat_para">
                "Sophisticated cocktails, cozy ambiance, live music—our hotel
                bar is the perfect spot to unwind and socialize."
              </p>
              <h3 className="cat_topic_price">Rs.5200 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Spa} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">SPA TREATMENTS</h3>
              <p className="cat_para">
                "Indulgent massages, rejuvenating facials, and tranquil ambiance
                make our hotel spa an oasis of relaxation"
              </p>
              <h3 className="cat_topic_price">Rs.4500 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Vehical} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">VEHICLE SERVICES</h3>
              <p className="cat_para">
                "Convenient hotel vehicle services for hassle-free
                transportation, ensuring comfort and ease for guests"
              </p>
              <h3 className="cat_topic_price">Rs.7000 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Day} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">DAY PLANING</h3>
              <p className="cat_para">
                "Crafting your perfect day: hotel stay, breakfast in bed, spa
                indulgence, local exploration, sunset cocktails"
              </p>
              <h3 className="cat_topic_price">Rs1500 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Specitiol} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">SPECIAL DAY ARRANGMENT</h3>
              <p className="cat_para">
                "Special day arrangements at the hotel: exquisite decor,
                culinary delights, and memorable experiences"
              </p>
              <h3 className="cat_topic_price">Rs.1500 for one day</h3>
            </div>
            <div className="cat_box_extra">
              <img src={Pet} alt="gym" className="cat_img_extra" />
              <h3 className="cat_topic_extra">PET FRIENDLY</h3>
              <p className="cat_para">
                "Pet-friendly hotel with welcoming amenities, ensuring a
                comfortable stay for you and your furry friend"
              </p>
              <h3 className="cat_topic_price">Rs.2000 for one day</h3>
            </div>
          </div>
        </div>
        <button
          className="centerbtn_extra"
          onClick={() => (window.location.href = "/bookingsextras")}
        >
          Book Now
        </button>
        <br /> <br />
      </div>
      <Footer />
    </>
  );
}

export default Category;
