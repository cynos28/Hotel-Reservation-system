import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import toast from 'react-hot-toast';
import MuiButton from '@mui/material/Button';
import Swal from 'sweetalert2';
import './EditRoom.css'; // Import CSS file

const Edit = () => {
  const rooms = {
    name: '',
    image: '',
    rentperday: 0,
    maxcount: 0,
    type: '',
  };

  const [room, setRoom] = useState(rooms);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/api/create', room);
      toast.success(response.data.msg, { position: 'top-right' });

      // Display SweetAlert after successful addition
      Swal.fire({
        icon: 'success',
        title: 'Room Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6}>
          <div className="addUser" style={{ marginTop: '100px' }}>
            <Link to="/" className="link-back">Back</Link>
            <h3 className="mb-4">Add New Room</h3>
            <Form onSubmit={submitForm} className="form-container">
              <Form.Group controlId="name">
                <Form.Label className="form-label">Room Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={inputHandler}
                  placeholder="Enter room name"
                  name="name"
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label className="form-label">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  onChange={inputHandler}
                  placeholder="Enter image URL"
                  name="image"
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="rentperday">
                <Form.Label className="form-label">Rent per Day</Form.Label>
                <Form.Control
                  type="number"
                  onChange={inputHandler}
                  placeholder="Enter rent per day"
                  name="rentperday"
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="maxcount">
                <Form.Label className="form-label">Max Count</Form.Label>
                <Form.Control
                  type="number"
                  onChange={inputHandler}
                  placeholder="Enter max count"
                  name="maxcount"
                  className="form-input"
                />
              </Form.Group>

              <Form.Group controlId="type">
                <Form.Label className="form-label">Room Type</Form.Label>
                <Form.Control
                  type="text"
                  onChange={inputHandler}
                  placeholder="Enter room type"
                  name="type"
                  className="form-input"
                />
              </Form.Group>
              <div className="text-center my-3">
                <MuiButton variant="contained" type="submit" className="btn-submit">
                  Add Room
                </MuiButton>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
