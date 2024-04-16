import React from "react";
import "../../Extra.css";
function Home() {
  return (
    <div>
      <div className="extra_home">
        <div className="topicset">
          <h1 className="bok_topic">Book Your Extra Facility Now..!</h1>
          <p className="bok_topic_para">
            "Experience unparalleled luxury and convenience with our extra
            facility bookings. Book now and elevate your stay to new heights!"
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
    </div>
  );
}

export default Home;
