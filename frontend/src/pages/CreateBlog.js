import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateBlog.css"

function CreateBlog() {
  const [title, setTitle] = useState();
  const [textBody, setTextBody] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warn("You are not logged in. Please Login First ");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogObj = {
      title,
      textBody,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        if (res.data.status === 201) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.href = "/my-blogs";
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
    <div className="blog-wrapper">
      <h1 style={{ marginBottom: "20px" }}>Create Blog</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="textbody">
          <Form.Label>TextBody</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Text Body"
            onChange={(e) => setTextBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Blog</Button>
      </Form>
    </div>
  );
}

export default CreateBlog;
