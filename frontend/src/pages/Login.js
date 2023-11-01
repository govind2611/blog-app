import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import './Login.css';

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/homepage";
      toast.success("Welcome Back, Chief");
    }
  }, [token])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      username,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, userObj)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("token", res.data.data.token);
            window.location.href = "/homepage";
            toast.success(res.data.message);
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
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="username">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
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
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;