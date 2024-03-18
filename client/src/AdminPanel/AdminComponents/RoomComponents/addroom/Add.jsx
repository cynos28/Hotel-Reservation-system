import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';
import MuiButton from '@mui/material/Button';
import Swal from 'sweetalert2';
import Sidebar from '../../Sidebar/Sidebar';
import TopNav from '../../TopNav/TopNav'; // Corrected import path

const AddRoom = () => {
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
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />
        <Container className="mt-5">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <div className="addUser" style={{ marginTop: '100px' }}>
                <Link to="/">Back</Link>
                <h2 className="mb-4">Add New Room</h2>
                <Form onSubmit={submitForm}>
                  <Form.Group controlId="name">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={inputHandler}
                      placeholder="Enter room name"
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={inputHandler}
                      placeholder="Enter image URL"
                      name="image"
                    />
                  </Form.Group>

                  <Form.Group controlId="rentperday">
                    <Form.Label>Rent per Day</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={inputHandler}
                      placeholder="Enter rent per day"
                      name="rentperday"
                    />
                  </Form.Group>

                  <Form.Group controlId="maxcount">
                    <Form.Label>Max Count</Form.Label>
                    <Form.Control
                      type="number"
                      onChange={inputHandler}
                      placeholder="Enter max count"
                      name="maxcount"
                    />
                  </Form.Group>

                  <Form.Group controlId="type">
                    <Form.Label>Room Type</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={inputHandler}
                      placeholder="Enter room type"
                      name="type"
                    />
                  </Form.Group>
                  <div className="text-center my-3">
                    <MuiButton variant="contained" type="submit">
                      Add Room
                    </MuiButton>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AddRoom;
