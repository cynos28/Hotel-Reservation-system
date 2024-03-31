import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

const Edit = () => {
  const rooms = {
    name: '',
    image: '',
    rentperday: 0,
    maxcount: 0,
    type: '',
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(rooms);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3500/api/getone/${id}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3500/api/update/${id}`, room)
      .then((response) => {
        toast.success(response.data.msg, { position: 'top-right' });
        navigate('/getroom');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <Link to="/getroom">Back</Link>
      <h3>Update Room</h3>
      <Form className="addUserForm" onSubmit={submitForm}>
        <Form.Group controlId="name">
          <Form.Label>Room Name</Form.Label>
          <Form.Control
            type="text"
            value={room.name}
            onChange={inputChangeHandler}
            placeholder="Room name"
          />
        </Form.Group>
        <Form.Group controlId="rentperday">
          <Form.Label>Rent per day</Form.Label>
          <Form.Control
            type="text"
            value={room.rentperday}
            onChange={inputChangeHandler}
            placeholder="Rent per day"
          />
        </Form.Group>
        <Form.Group controlId="maxcount">
          <Form.Label>Max Count</Form.Label>
          <Form.Control
            type="text"
            value={room.maxcount}
            onChange={inputChangeHandler}
            placeholder="Max Count"
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Room Type</Form.Label>
          <Form.Control
            type="text"
            value={room.type}
            onChange={inputChangeHandler}
            placeholder="Room Type"
          />
        </Form.Group>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            UPDATE Room
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Edit;
