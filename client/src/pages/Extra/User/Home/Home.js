import React from "react";
import "../../Extra.css";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/Footer";
function Home() {
  return (
    <div>
      <Header />
      <div className="extra_home">
        <div className="topicset">
          <h1 className="bok_topic">Book Your Extra Facility Now..!</h1>
          <p className="bok_topic_para">
            "Experience unparalleled luxury and convenience with our extra
            facility bookings. Book now and elevate your stay to new heights!
            People think being famous is so glamorous, but half the time you’re
            in a strange hotel room living out of a suitcase. Chilling out on
            the bed in your hotel room watching television, while wearing your
            own pajamas, is sometimes the best part of a vacation. Withnature
            all around, you will also love the luxury we offer"
          </p>
        </div>
        <div className="btnset_extr">
          <button
            className="booknow_extra"
            onClick={() => (window.location.href = "/category")}
          >
            Book Now
          </button>
          <button
            className="mybooknow_extra"
            onClick={() => (window.location.href = "/bookingvalidate")}
          >
            My Book
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
