import axios from "axios";
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import './BlogCard.css';

function BlogCard({ blogData, homepage }) {
  const [isEdit, setIsEdit] = useState();
  const [newTitle, setNewTitle] = useState();
  const [newTextBody, setNewTextBody] = useState();

  const token = localStorage.getItem("token");

  const handleDelete = (blogId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
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

  const handleSubmit = (e, blogId) => {
    e.preventDefault();

    const blogObj = {
      blogId,
      title: newTitle,
      textBody: newTextBody,
    };

    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`, blogObj, {
        headers: {
          "X-Acciojob": token,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
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
  const formatCreationDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };
  return (
    <Card>
      <Card.Body>
        <div className="wrapper">
        <div className="card-title">{blogData.title}</div>
        <div className="card-text timestamp">
          {formatCreationDateTime(blogData.creationDateTime)}
        </div>
        </div>
       
        <div className="card-text">{blogData.textBody}</div>

        {homepage ? (
          <>
            <div className="card-text created-by">Created By - {blogData.username}</div>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              className="card-button edit-button"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="card-button delete-button"
              onClick={() => handleDelete(blogData._id)}
            >
              Delete
            </Button>
          </>
        )}

        {isEdit ? (
          <>
            <Form
              onSubmit={(e) => handleSubmit(e, blogData._id)}
              style={{ marginTop: '2rem' }}
            >
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="textbody">
                <Form.Label>Text Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter TextBody"
                  onChange={(e) => setNewTextBody(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="card-button edit-button">
                Edit
              </Button>
            </Form>
          </>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
}

export default BlogCard;