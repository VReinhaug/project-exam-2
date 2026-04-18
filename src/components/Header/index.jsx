import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./header.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("User:", user);

  function handleClose() {
    setShow(false);
  }

  function handleShow() {
    setShow(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleClose();
    navigate("/");
  }

  useEffect(() => {
    handleClose();
  }, [location]);

  return (
    <Navbar expand={false} className="holidaze-navbar">
      <Container fluid className="holidaze-header">
        <Navbar.Brand as={Link} to="/" className="logo">
          Holidaze
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="logo">Holidaze</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/venues">
                Venues
              </Nav.Link>

              {user && (
                <Nav.Link as={Link} to={`/profile/${user.name}`}>
                  My profile
                </Nav.Link>
              )}

              {!user ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
