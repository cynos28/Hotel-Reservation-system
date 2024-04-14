import React from "react";

function Home() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/category")}>
        Book Now
      </button>
      <button onClick={() => (window.location.href = "/bookingvalidate")}>
        My Book
      </button>
    </div>
  );
}

export default Home;
