import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Blogs/BlogCard";
import { toast } from "react-toastify";

function Homepage() {
  const [homepageBlogs, setHomepageBlogs] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      toast.warn("Please Login First");
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
          headers: {
            "X-Acciojob": token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setHomepageBlogs(res.data.data);
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
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "30px 0",
          color: "#007bff",
        }}
      >
        Blog Central Hub
      </h1>
      {homepageBlogs?.length > 0 ? (
        homepageBlogs.map((blog) => (
          <BlogCard blogData={blog} homepage={true} />
        ))
      ) : (
        <h4 style={{ textAlign: "center", marginTop: "50px" }}>
          You are not following anyone. | The User you follow does not created
          any blog yet....
        </h4>
      )}
    </div>
  );
}

export default Homepage;
