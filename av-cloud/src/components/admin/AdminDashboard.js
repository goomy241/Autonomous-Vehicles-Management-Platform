import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  ListGroup,
  ListGroupItem,
  Card,
  CardGroup,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";
import { requirePropFactory } from "@mui/material";
const AdminDashboard = () => {

    const history = useHistory();
    const [userInfo,setUserInfo] = useState(null);


   

    useEffect(() => {
        const user = localStorage.getItem("admin");
        console.log("User: ", user);
        if (user !== null && user !== undefined) {
          setUserInfo(JSON.parse(user));
        }
        else{
          history.push('/admin/login')
          document.location.reload()
    }
},[]);





  return (
    <div>
      <AdminNavBar />


      <div
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3 style={{ padding: "20px" }}>
              <em>Welcome Onboard, {userInfo?.admin_id}</em>
            </h3>
          </div>

      <Row xs={1} md={2} className="g-4" style={{marginTop:'2%'}}>      
      <Col>
        <a href="/admin/dashboard/users">
         
          <Card style={{ marginLeft: "2%", marginRight: "2%" }}>
            <Card.Img variant="top" style={{height:'15rem',width:'50%', margin:'auto',marginTop:'2%'}} src={require("../../utils/users.png")} />
          
            <Card.Footer style={{marginTop:'2%'}}>
              <h5 className="text-muted">View all users</h5>
            </Card.Footer>
          </Card>
        </a>
        </Col>

        <Col>
        <a href="/admin/dashboard/cars">
          <Card style={{ marginRight: "2%" }}>
            <Card.Img variant="top" style={{height:'15rem',width:'50%', margin:'auto',marginTop:'2%'}} src={require("../../utils/cars.jpg")}/>
            
            <Card.Footer style={{marginTop:'2%'}}>
              <h5 className="text-muted">View all cars</h5>
            </Card.Footer>
          </Card>
        </a>
        </Col>

        <Col>
        <a href="/admin/dashboard/charts">
          <Card style={{ marginLeft:'2%', marginRight: "2%" }}>
            <Card.Img variant="top" style={{height:'15rem',width:'50%', margin:'auto',marginTop:'2%'}} src={require("../../utils/charts.webp")} />
            
            <Card.Footer style={{marginTop:'2%'}}>
              <h5 className="text-muted">Visualize analytical data</h5>
            </Card.Footer>
          </Card>
        </a>
        </Col>

        <Col>
        <a href="/admin/dashboard/bookings">
         
          <Card style={{ marginRight: "2%" }}>
            <Card.Img variant="top" style={{height:'15rem',width:'50%',margin:'auto',marginTop:'2%'}} src={require("../../utils/bookings.png")} />
            
            <Card.Footer style={{marginTop:'2%'}}>
              <h5 className="text-muted">View all bookings</h5>
            </Card.Footer>
          </Card>
        </a>
        </Col>
      </Row>


      {/* <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).map((list)) => (
    <Col>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row> */}
    </div>
  );
};

export default AdminDashboard;
