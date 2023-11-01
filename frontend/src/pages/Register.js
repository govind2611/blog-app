import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css"

function Register() {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      username,
      name,
      email,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, userObj)
      .then((res) => {
        if (res.data.status === 201) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 500);

        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        const res = err.response.data;
        console.log(res);
        if (res.status === 400) {
          toast.error(res.message);
          return;
        }
        alert(err);
        toast.error(err);
      });
  };

  return (
    <div className="form-container-2">
      <h1 className="form-title">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="username">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="name">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="email">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="password">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="form-button">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
