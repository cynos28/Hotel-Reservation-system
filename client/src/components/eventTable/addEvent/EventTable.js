import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "./EventTable.css"; // Import custom CSS
import TopNav from "../../../AdminPanel/AdminComponents/TopNav/TopNav";
import Sidebar from "../../../AdminPanel/AdminComponents/Sidebar/Sidebar";
import { Trash, PencilSquare } from "react-bootstrap-icons"; // Import Bootstrap Icons
import { useReactToPrint } from "react-to-print";
import PDFFile from "./Ereport";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Wrap the component with React.forwardRef to enable forwarding of ref
const EventTable = React.forwardRef((props, ref) => {
  // State variables
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/event");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []);

  // Function to delete a room/event
  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/event/${eventId}`
      );
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      // Show success message upon successful deletion
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting event");
    }
  };

  // Filter events based on search term and filter value
  const filteredEvents = events.filter(
    (event) =>
      event.etype.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* PDF Function */
  // Create a ref to the printable content
  const ComponentsRef = useRef();
  // Define the function to handle printing
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current, // Specify the content to print
    DocumentTitle: "Event Details Report", // Specify the document title
    onAfterPrint: () =>
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Event Report Downloaded Successfully!",
        showConfirmButton: false,
        timer: 1500,
      }), // Callback after printing
  });

  // JSX
  return (
    <div className="kaveeshaCss">
      <TopNav />
      <Sidebar />

      <div className="EventTableContainer">
        <PDFDownloadLink
          className="reportpart"
          document={<PDFFile items={events} />}
          fileName="Event_table.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="bg-BrownLi rounded-md p-[7px] font-bold text-[14px]">
                Preparing...
              </button>
            ) : (
              <button className="reportpart2">Monthly Report</button>
            )
          }
        </PDFDownloadLink>
        <div className="EventTable"></div>
        <div className="search-container">
          <input
            type="text"
            placeholder=" Search By Event Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Button to trigger printing */}
        <button onClick={handlePrint} className="generate-event-button">
          Download Table
        </button>

        {/* Table to display event data */}
        <table style={{ marginLeft: "100px" }} ref={ComponentsRef}>
          <thead>
            <tr>
              <th
                scope="col"
                style={{ width: "100px", backgroundColor: "#041852" }}
              >
                UserID
              </th>
              <th
                scope="col"
                style={{ width: "140px", backgroundColor: "#041852" }}
              >
                Event Name
              </th>
              <th
                scope="col"
                style={{ width: "40px", backgroundColor: "#041852" }}
              >
                Capacity
              </th>
              <th
                scope="col"
                style={{ width: "120px", backgroundColor: "#041852" }}
              >
                Date
              </th>
              <th
                scope="col"
                style={{ width: "140px", backgroundColor: "#041852" }}
              >
                Event Type
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Venue
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Status
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Start Time
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                End Time
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Cost
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Description
              </th>
              <th
                scope="col"
                style={{ width: "200px", backgroundColor: "#041852" }}
              >
                Reason
              </th>

              <th
                scope="col"
                className="col1"
                style={{ backgroundColor: "#041852" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event._id}>
                <td>{event.userId}</td>
                <td>{event.name}</td>
                <td className="col1">{event.cap}</td>
                <td>{event.date}</td>
                <td className="col2">{event.etype}</td>
                <td>{event.venue}</td>
                <td>{event.estatus}</td>
                <td className="col1">{event.sTime}</td>
                <td className="col1">{event.eTime}</td>
                <td>{event.cost}</td>
                <td className="col1">{event.description}</td>
                <td className="col1">{event.reason}</td>
                <td className="actionButtons">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteEvent(event._id)}
                  >
                    <Trash /> Delete
                  </button>
                  <Link
                    to={`/EventTable/EditEvent/${event._id}`}
                    className="btn btn-outline-primary"
                  >
                    <PencilSquare />
                    <br /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Link to add a new event */}
        <Link to={"/addEvent"} className="add-Event-button">
          Add Event
        </Link>
      </div>
    </div>
  );
});

export default EventTable;
