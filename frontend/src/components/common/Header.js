import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { toast } from "react-toastify";
import "./Header.css";

function Header() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "login";
    toast.success("Logout successful");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="Container">
        <div>
          <Navbar.Brand href="/homepage">Blogging App</Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/homepage">Home</Nav.Link>
              <Nav.Link href="/create-blog">Create Blog</Nav.Link>
              <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        <div className="btn-div">
          {token ? (
            <>
              <Nav.Link
                href="#"
                onClick={handleLogout}
                className="btn-2 logout"
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login" className="btn-2 login">
                Login
              </Nav.Link>
              <Nav.Link href="/register" className="btn-2 register">
                Register
              </Nav.Link>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
