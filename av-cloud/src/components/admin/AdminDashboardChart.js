import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

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

const AdminDashboardChart = () => {
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [chartData, setChartData] = useState(null);
  const history = useHistory();


  useEffect(() => {
    const user = localStorage.getItem("admin");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(JSON.parse(user));
    } else {
      history.push("/admin/login");
      document.location.reload();
    }

    axios.get("https://avcloud-node.herokuapp.com/bookings").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setBookings(res.data.data)

            if (bookings!==null && bookings!== undefined && bookings.length!=0) {
              
                console.log(bookings);
               const cleaned_bookings =  twoSum(bookings);
               console.log(cleaned_bookings);
               const final_cars = Object.keys(cleaned_bookings)
               const final_bookings = Object.values(cleaned_bookings)

               console.log(final_bookings,final_cars)
              setChartData({
                labels: Object.keys(cleaned_bookings),

                datasets: [
                  {
                    label: "Number of cars per booking",
                    data: Object.values(cleaned_bookings),
                    backgroundColor: [
                      "#ffbb11",
                      "#ecf0f1",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
                  },
                ],
              });
            //   console.log(chartData)
            }
            
       
      } else {
        console.log("Error happened!");
        document.location.reload();
      }
    });
  }, [bookings]);


   function twoSum(bookings){
    
    const cars ={
      
      }
      
    
    for ( let index=0;index<bookings.length;index++){
      if (bookings[index].b_car_id in cars){
        cars[bookings[index].b_car_id] +=1
      

    }
    else{
    cars[bookings[index].b_car_id] = 1
    }
  }
  return cars;
  
};




  return (
    <div>
      <>
        <AdminNavBar />
        {/* {bookings?.map((booking) => {
          <div>
            {booking.booking_id}
            xxxxxxx
          </div>;
        })} */}
        {chartData ? (
          <Bar
            data={chartData}
            options={{
                indexAxis:'y',
              plugins: {
                title: {
                  display: true,
                  text: "Cars per booking",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              },
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <Spinner animation="border" variant="success" />
          </div>
        )}
      </>
    </div>
  );
};

export default AdminDashboardChart;
