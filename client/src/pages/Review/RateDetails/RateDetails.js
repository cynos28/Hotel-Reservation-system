import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Rateing from "./Rates";
import { useReactToPrint } from "react-to-print";
import "./rate.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/Footer";
const URL = "http://localhost:3001/rates";


const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function RateDetails() {
  const [rate, setRate] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setRate(data.rate));
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredRate = data.rate.filter((rate) =>
        Object.values(rate).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setRate(filteredRate);
      setNoResults(filteredRate.length === 0);
    });
  };
    /*PDF Function */
    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => ComponentsRef.current,
      DocumentTitle: " Details Report",
      onafterprint: () => alert(" Details Report Successfully Download !"),
    });
  return (
    <div>
  

   
      <br></br> <br></br>
      <h1 className="rate-topic">
        Review & <span className="rate-us"> Ratings</span>
      </h1>
      <div className="main_container_reiew">
        <div className="main_btn_topic">
          <div className="main_btn_topic">
            {" "}
            <button
              type="button"
              className="button_ad_review"
              onClick={() => (window.location.href = "/")}
            >
              Add Review
            </button>
            <button
              type="button"
              className="button_ad_review"
              onClick={handlePrint}
            >
              Generate Report
            </button>
          </div>

          <button
            type="button"
            className="button_ad_review"
            onClick={() => (window.location.href = "/findrate")}
          >
            Your Review
          </button>
        </div>
        <div className="sen_serch">
          <div className="sen_serch">
            <td className="srrch">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                className="serch_inpt"
                placeholder="Search Here.."
              ></input>
            </td>

            <td>
              <button onClick={handleSearch} className="search_btn">
                Search
              </button>
            </td>
          </div>
        </div>
        {noResults ? (
          <div>
            <br></br>
            <h1 className="con_topic">
              Not<span className="clo_us"> Found</span>{" "}
            </h1>
          </div>
        ) : (
          <div  ref={ComponentsRef} className="full_box_set_rate_disply">
            {rate &&
              rate.map((rate, i) => (
                <div key={i}>
                  <Rateing rate={rate} />
                </div>
              ))}
          </div>
        )}
      </div>
   
    </div>
  );
}

export default RateDetails;
