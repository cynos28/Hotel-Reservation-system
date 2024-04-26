import "./style.css";

import { BACKEND_URL, PAYMENT_TYPES } from "../../../constants";
import React, { useEffect, useRef, useState } from "react";

import Sidebar from "../../AdminComponents/Sidebar/Sidebar";
import TopNav from "../../AdminComponents/TopNav/TopNav";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function AdminDash() {
  const [roomPaymentState, setRoomPaymentState] = useState({
    isLoading: false,
    payments: [],
  });
  const [selectedBookingType, setSelectedBookingType] = useState(
    PAYMENT_TYPES.ROOM
  );
  const [roomSearchText, setRoomSearchText] = useState("");

  const onFetchPaymentsByBookingType = async () => {
    setRoomPaymentState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/payments?type=${selectedBookingType}`
      );
      setRoomPaymentState((prevState) => ({
        ...prevState,
        payments: response.data.data,
      }));
    } catch (error) {
      console.error("Error fetching room payments: ", error);
    } finally {
      setRoomPaymentState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    if (selectedBookingType) {
      onFetchPaymentsByBookingType();
    }
  }, [selectedBookingType]);

  const onDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/payments/${paymentId}`);
      window.alert("Payment deleted successfully!");
      onFetchPaymentsByBookingType();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  /*PDF---------- */
  const summaryRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Payment Document",
    onAfterPrint: () => alert("Doc Successfully Downloaded!"),
  });

  return (
    <div className="admin_full">
      <Sidebar />
      <TopNav />
      <div>
        <h1 className="main_book_topic">
          Payment <span className="sub_book_topic">Details..!</span>
        </h1>
        <div>
          <div className="type-section">
            <div className="btn_set">
              <select
                // class="payment_input"
                required
                value={selectedBookingType}
                onChange={(e) => {
                  setSelectedBookingType(e.target.value);
                }}
                name="type"
              >
                <option value="">Select Booking Type</option>
                <option value={PAYMENT_TYPES.ROOM}>{"Room"}</option>
                <option value={PAYMENT_TYPES.BAR}>{"Bar"}</option>
                <option value={PAYMENT_TYPES.POOL}>{"Pool"}</option>
                <option value={PAYMENT_TYPES.FOOD}>{"Food"}</option>
              </select>
              <div className="search_box">
                <input
                  onChange={(e) => setRoomSearchText(e.target.value)}
                  type="text"
                  name="search"
                  className="serch_ipt"
                  placeholder="Search Here.."
                />
                {/* <button onClick={handleSearch} className="serchbtn">
                  Search
                </button> */}
              </div>
              <button onClick={handlePrint} className="serchbtn">
                Download Report
              </button>
            </div>
            <br />
            <div ref={summaryRef}>
              <table className="admin_tble">
                <thead>
                  <tr>
                    <th className="details_admin_tble_col">Payment ID</th>
                    <th className="details_admin_tble_col">Name</th>
                    <th className="details_admin_tble_col">Email</th>
                    <th className="details_admin_tble_col">Phone</th>
                    <th className="details_admin_tble_col">Type</th>
                    <th className="details_admin_tble_col">Amount</th>
                    <th className="details_admin_tble_col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomPaymentState?.payments
                    ?.filter((payment) =>
                      payment?.user?.name
                        ?.toLowerCase()
                        .includes(roomSearchText.toLowerCase())
                    )
                    ?.map((payment) => (
                      <tr key={payment._id}>
                        <td className="details_admin_tble_col">
                          {payment._id}
                        </td>
                        <td className="details_admin_tble_col">
                          {payment?.user?.name}
                        </td>
                        <td className="details_admin_tble_col">
                          {payment?.user?.email}
                        </td>
                        <td className="details_admin_tble_col">
                          {payment?.user?.phone}
                        </td>
                        <td className="details_admin_tble_col">
                          {payment?.booking?.bookingType}
                        </td>
                        <td className="details_admin_tble_col">
                          {payment?.booking?.amount}
                        </td>

                        <td className="details_admin_tble_col">
                          <button
                            onClick={() => onDeletePayment(payment?._id)}
                            className="dltbtn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
