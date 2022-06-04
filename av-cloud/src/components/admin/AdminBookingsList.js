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
  Button,
} from "react-bootstrap";
import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";

const AdminBookingsList = () => {
  const history = useHistory();

  const [bookings, setBookings] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {






    const user = localStorage.getItem("admin");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(JSON.parse(user));
      console.log(userInfo)
    } else {
      history.push("/admin/login");
      document.location.reload();
    }

    axios.get("https://avcloud-node.herokuapp.com/bookings").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);

        setBookings(res.data.data);
        console.log(bookings);
      } else {
        history.push("/admin/login");
        document.location.reload();
      }
    });


    //   axios.get(`http://localhost:3000/users/${JSON.parse(user).username}`)
    //       .then((res) => {
    //         if (res.status === 200) {
    //           console.log(res.data);
    //           setUserDetails(res.data.data);
    //         } else {
    //           history.push("/login");
    //           document.location.reload();
    //         }
    //       });

    
  }, []);


  const handleDelete =(event) =>{
    console.log(event.target.value);
        const deleteCar = event.target.value;
        console.log(deleteCar)
        
        // axios.delete(`http://localhost:3000/cars/${deleteCar}`)
        // .then((res) =>{
        //     if (res.status === 200){
        //         console.log(res.data);
        //         window.alert('Delete car complete')
        //         document.location.reload()
        //     }
        //     else{
        //         window.alert('Cannot delete car! Please try again!')
        //         document.location.reload()
        //     }


        // });
  }



  return (
    <div>
      <>
      <AdminNavBar/>
        {bookings?.map((booking) => (
          <Card style={{ margin: "2%"  }}>
            <Card.Header>Booking ID: {booking.booking_id}<Button value={booking.booking_id} onClick={handleDelete} style={{float:'right'}}>Delete</Button></Card.Header>
            <Card.Body>
              <Card.Title> Customer Name : {booking.customer_name} </Card.Title>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Start Location : </b>{booking.start_loc}</ListGroup.Item>
                  <ListGroup.Item><b>End Location : </b>{booking.destination_loc}</ListGroup.Item>
                  <ListGroup.Item><b>Car Booked : </b>{booking.b_car_id} </ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
};

export default AdminBookingsList;
