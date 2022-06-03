import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
// import logout from "./logout";

import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";
export default function AdminLogin() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const [user, setuser] = useState({
    admin_id: "",
    admin_pw: ""
  });

  useEffect(() => {
    return () => {
      const loggedInUser = localStorage.getItem("admin");

      if (loggedInUser!=null && user!=undefined) {
        setUserDetails(JSON.parse(loggedInUser));
        console.log(userDetails)
        history.push("/admin/dashboard");
        document.location.reload()
        //   navigate(-1);
      }
    };
  }, []);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setuser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
   

    axios.post("https://avcloud-node.herokuapp.com/admins/login",user)
    .then(response=>{
    if (response.status == 200) {
      localStorage.setItem("admin", JSON.stringify(response.data));
      const loggedInUser = localStorage.getItem("admin");
      console.log(loggedInUser)
      setUserProfile(response.data);
      console.log("Login Response", response.data);
      history.push('/admin/dashboard');
      document.location.reload()
    } else {
      console.log("Unauthorized");
      console.log(response);
    }
  })
  };

  //check if user is already logged in

  //If not then return this login form
  return (
    <>
      {/* {userProfile ? (
        <Redirect
          to={{
            pathname: "/",
            state: userProfile,
          }}
        />
      ) : ( */}
      <AdminNavBar/>
        <React.Fragment>
          <Row>
            <Col>
              <Card
                style={{
                  width: "35rem",
                  marginLeft: "25rem",
                  marginTop: "5rem",
                }}
              >
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Header
                  style={{
                    textAlign: "center",
                    color: "green",
                    fontStyle: "italic",
                  }}
                >
                  Login
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleSubmit} onChange={handleChange}>
                    <Form.Group as={Row} className="mb-3">
                      {/* <Form.Label column sm="6"><div><h6>Login</h6></div></Form.Label> */}

                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="text"
                          id="admin_id"
                          name="admin_id"
                          placeholder="UserName"
                          required
                        />
                        <label htmlFor="Email" style={{ marginLeft: 10 }}>
                          {" "}
                          UserName
                        </label>
                      </Form.Floating>

                      <Form.Floating className="mb-3">
                        <Form.Control
                          type="password"
                          id="admin_pw"
                          name="admin_pw"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="Password" style={{ marginLeft: 10 }}>
                          {" "}
                          Password
                        </label>
                      </Form.Floating>
                    </Form.Group>
                    <Row>
                      <Col>
                        <Button
                          type="submit"
                          variant="success"
                          size="md"
                          active
                        >
                          Login
                        </Button>
                      </Col>
                      
                    </Row>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </React.Fragment>
      {/* )} */}
    </>
  );
}
