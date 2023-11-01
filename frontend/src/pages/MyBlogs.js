import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { toast } from 'react-toastify';

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warn("You are not logged in. Please Login First ");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`, {
          headers: {
            "X-Acciojob": token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setMyBlogs(res.data.data);
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
    }
  }, [token]);

  return (
    <div>
      <h1 style={{ margin: "30px" }}>My Blogs</h1>
      {myBlogs?.map((blog) => (
        <BlogCard blogData={blog} />
      ))}
    </div>
  );
}

export default MyBlogs;
