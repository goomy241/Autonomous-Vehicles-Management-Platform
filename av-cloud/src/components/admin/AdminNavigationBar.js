import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function AdminNavBar() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("admin");
      if (
        user != null &&
        user != undefined &&
        JSON.stringify(userDetails) != user
      ) {
        setUserDetails(user);
      }
    }, 500);
  }, []);

  const logoutClicked = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin");
    setUserDetails(null);
    history.push("/admin/login");
    document.location.reload();
  };
  // const loginClicked = (e) => {
  //   e.preventDefault();
  //   history.push("/login");
  // };
  // const signUpClicked = (e) => {
  //   e.preventDefault();
  //   history.push("/register");
  // };

  return (
    <Navbar
      className="me-auto my-2 my-lg-0"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/admin/dashboard" style={{ marginRight: "4rem" }}>
          <h2>
            <em>Auto</em>Rentals
          </h2>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/admin/add"
              style={{ color: "white", marginRight: "2rem" }}
            >
              Add Rides
            </Nav.Link>
            <Nav.Link
              href="https://use-349807.wn.r.appspot.com/"
              style={{ color: "white", marginRight: "2rem" }}
            >
              View Sensor Data{" "}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            {userDetails ? (
              <Button onClick={logoutClicked} variant="outline-primary">
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                >
                  <a style={{ textDecoration: "none" }} href="/admin/login">
                    Login
                  </a>
                </Button>
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
      {/* {userDetails && <p>{userDetails.id}</p>} */}
    </Navbar>
  );
}

export default AdminNavBar;
