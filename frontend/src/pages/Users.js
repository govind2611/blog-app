import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/Users/UserCard";
import { toast } from 'react-toastify';

function Users() {
  const [users, setUsers] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
        toast.warn("You are not logged in. Please Login First ");
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`, {
          headers: {
            "X-Acciojob": token,
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setUsers(res.data.data);
            toast.success(res.data.message);
          }
        });
    }
  }, [token]);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Users</h1>
      <div style={{ padding: "20px", display: "flex",flexWrap: 'wrap'}}>
        {users?.map((user) => (
          <UserCard userData={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
