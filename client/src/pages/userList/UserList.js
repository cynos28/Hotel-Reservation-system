import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ChangeRole from "../../components/changeRole/ChangeRole";

import PageMenu from "../../components/pageMenu/PageMenu";
import Search from "../../components/searchUser/Search";
import UserStats from "../../components/userStats/UserStats";

import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
//import { shortenText } from "../profile/Profile";
import "./UserList.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  FILTER_USERS,
  selectUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";
import Sidebar from "../../AdminPanel/AdminComponents/Sidebar/Sidebar";
import TopNav from "../../AdminPanel/AdminComponents/TopNav/TopNav";
import { useReactToPrint } from "react-to-print";


const UserList = () => {
  // useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { users, isLoading, isLoggedIn, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const filteredUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    console.log(id);
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    console.log(id);
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  /*PDF---------- */

  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "User Document",
    onAfterPrint: () => alert("Document Successfully Downloaded!"),
  });

  // End Pagination

  return (
    <section>
      <div className="containerUser" >
        <Sidebar />
        <TopNav />
        <UserStats />
       
          <div className="user-list">

            {/* {isLoading && <Spinner />} */}
            <div className="table">
              <div className="--flex-between">
                <span>
                  <h3>All Users</h3>
                </span>
                <span>
                  <Search
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </span>
              </div>
              <div ref={summaryRef}>
              {/* Table */}
              {!isLoading && users.length === 0 ? (
                <p>No user found...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Change Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((user, index) => {
                      const { _id, name, email, role } = user;

                      return (
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>{(name, 8)}</td>
                          <td>{email}</td>
                          <td>{role}</td>
                          <td>
                            <ChangeRole _id={_id} email={email} />
                          </td>
                          <td>
                            <span>
                              <FaTrashAlt
                                size={20}
                                color="red"
                                onClick={() => confirmDelete(user._id)}
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <hr />
            </div>
            
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />

          <button onClick={handlePrint} className="serchbtn" style={{ float: 'right' }}>
            Download Report
          </button>
        
      </div>
      </div>
    </section>
  );
};

export default UserList;
