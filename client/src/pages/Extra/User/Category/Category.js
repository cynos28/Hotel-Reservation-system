import React from "react";

function Category() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/booking")}>
        Book Now
      </button>
    </div>
  );
}

export default Category;
