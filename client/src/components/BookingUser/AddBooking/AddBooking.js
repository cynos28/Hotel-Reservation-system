import React, { useState,  useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../User.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";



const AddBooking = () => {
  const [payment, setPayment] = useState(0);
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    code: "",
    phone: "",
    adults: 0,
    kids: 0,
    room: "",
    nights:"",
    
    request: "",
    payment:0,
    
    
  });
  const [error, setError] = useState("");
  

  useEffect(() => {
    const calculatePayment = () => {
      const nightlyRate = 1500; 
      const totalPayment = nightlyRate * parseInt(inputs.nights);
      setPayment(totalPayment);

      
      setInputs(prevState => ({
        ...prevState,
        payment: totalPayment
      }));
    };

    calculatePayment();
  }, [inputs.nights]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
      
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/bookings/", inputs);
      alert(" booked successfully.");
      history(`/my-booking/${response.data.booking._id}`); // Navigate to the booked room details page
    } catch (error) {
      console.error("Error booking room:", error);
      // Handle error and provide feedback to the user
    }
  };
  

  return (
    
    <div className="picture">
      <div>
      <Header/>

      </div>
      <div className="booking-container" >
        <form className="booking_form" onSubmit={handleSubmit}>
          <div>
            <div className="imgbox"  >
            <img src="./images/hotelimage1.jpg" alt="Hotel Heritage" ></img>
            </div>
          </div>
          <div className="form_box">
            <div className="left_box">
              <h2 className="booking_header">Personal Details</h2>
              <div>
                <label className="booking-label">Name:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Email:</label>
                <br />
                <input
                  className="booking-input"
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Address:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="address"
                  value={inputs.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">City:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="city"
                  value={inputs.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Postal Code:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="code"
                  value={inputs.code}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Phone Number:</label>
                <br />
                <input
                  className="booking-input"
                  type="tel"
                  pattern="\d{10}"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="right_box">
              <h2 className="booking_header">Reservation Form</h2>
              <div>
                <label className="booking-label">Number of Adults:</label>
                <br />
                <input
                  className="booking-input"
                  type="number"
                  name="adults"
                  value={inputs.adults}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Number of Kids:</label>
                <br />
                <input
                  className="booking-input"
                  type="number"
                  name="kids"
                  value={inputs.kids}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Room Type:</label>
                <br />
                <input
                  className="booking-input"
                  type="text"
                  name="room"
                  value={inputs.room}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Number of Nights:</label>
                <br />
                <input
                  className="booking-input"
                  type="nights"
                  name="nights"
                  value={inputs.nights}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="booking-label">Special Requests:</label>
                <br />
                <textarea
                  className="booking-input"
                  name="request"
                  value={inputs.request}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
            <label className="booking-label">Payment Amount:</label>
            <br />
            <input
              className="booking-input"
              
              type="text"
              name="payment"
              value={inputs.payment} 
              onChange={handleChange}
              
              
            />
          </div>
              <br></br>
              <button className="bookbtn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default AddBooking;
