import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import "./UserCard.css"

function UserCard({ userData }) {
  const token = localStorage.getItem("token");

  const handleFollow = (userId) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,
        {
          followingUserId: userId,
        },
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 201) {
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

  const handleUnfollow = (userId) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
        {
          followingUserId: userId,
        },
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

  return (
    <Card className="card-main">
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Text>{userData.username}</Card.Text>
        <Card.Text>{userData.email}</Card.Text>

        {userData.follow ? (
          <>
            <Button
              variant="danger"
              onClick={() => handleUnfollow(userData._id)}
            >
              Unfollow
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => handleFollow(userData._id)}>
            Follow
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
