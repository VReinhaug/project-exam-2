import { Link } from "react-router-dom";
import "./header.scss";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  return (
    <Navbar expand={false} className="holidaze-navbar">
      <Container fluid className="holidaze-header">
        <Navbar.Brand as={Link} to="/" className="logo">
          Holidaze
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
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

              <Nav.Link as={Link} to="/profile">
                My profile
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
