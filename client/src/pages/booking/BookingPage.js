import React from 'react';
import Booking from '../../components/bookingcomponent/Booking.js';
import DatePick from "../../components/bookingcomponent/datepick.js";
import '../../components/bookingcomponent/StyleB.css';





function BookingPage(){


    return (

        <div className="BookingPage">
        {/*add image*/}
        <div div class="containeri" >

              <img src = "/images/hotel12.jpg" alt="Image Hotel"  width="1470" height="600"  className='picture'></img>
            
            </div>

                <DatePick/>
                <Booking/>

            </div>
      );
}

export default BookingPage;

