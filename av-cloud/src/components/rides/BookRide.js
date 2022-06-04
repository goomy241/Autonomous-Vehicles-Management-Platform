import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FindSourceAndDestination from "./findSourceAndDestination";
import RideList from "./RideList";
import ReviewRide from "./ReviewRide";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavigationBar";
import AdminBookingsList from "../admin/AdminBookingsList";

const steps = [
  "Enter source and destination",
  "Choose your car",
  "Finalize your ride",
];

export default function BookRide() {
  const [activeStep, setActiveStep] = useState(0);
  const [ride, setRide] = useState();

  const [booking,setBooking] = useState(null);
  const [loading, setLoading] = useState();
  const history = useHistory();

  const [userDetails, setUserDetails] = useState(null);

  //   const authContext = useContext(AuthContext);
  //   const {user} = authContext;

  useEffect(() => {
    
      const loggedInUser = localStorage.getItem("user");

      if (loggedInUser!=null && loggedInUser!=undefined) {
        setUserDetails(JSON.parse(loggedInUser));
        //   navigate(-1);
      } else {
        history.push("/login");
        document.location.reload();
      }
   
  }, []);

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep == 2) {
      console.log(JSON.stringify(ride));
    
      

      axios
        .post(`https://avcloud-node.herokuapp.com/bookings/${userDetails.username}`, ride)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data)
            localStorage.setItem("booking", JSON.stringify(resp.data));
          
        setBooking(resp.data);

            console.log("Booking completed");
            setLoading(false);
          } else {
            console.log("Error Occured", resp.data.message);
            history.push("/book");
            document.location.reload();
          }
        });

        const booking_user = localStorage.getItem("booking");

    
        
        setTimeout (()=>{
          if(booking_user!=null && booking_user!=undefined && booking_user.length>0){
          console.log(JSON.parse(booking_user).message)
          console.log(JSON.parse(booking_user).booking_id)
          const trip = {
            car_id: ride.car_id,
            car_type:'tesla',
            booking_id : JSON.parse(booking_user).booking_id
          }
          console.log(trip)
  
  
        axios
          .post(
            'https://steven-li-h6vnra1fx3zwj5i5.socketxp.com/',
            trip
          )
          .then((resp) => {
            if (resp.status === 201) {
              setRide(resp.data.code);
              console.log("Carla Simulator completed");
              setLoading(false);
            } else {
              console.log("Error Occured", resp.data.message);
              history.push("/book");
              document.location.reload();
            }
          });

    }
  },100)
        console.log('x')
        
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FindSourceAndDestination setRide={setRide} ride={ride} />;
      case 1:
        return <RideList setRide={setRide} ride={ride} />;
      case 2:
        return <ReviewRide setRide={setRide} ride={ride} />;
      default:
      // throw new Error('Unknown step');
    }
  }

  return (<>
    <NavBar/>
    <Container component="main" maxWidth="m" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Ride Service
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <>
              {!loading && (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Your order has been placed.
                  </Typography>
                  <Typography variant="subtitle1">
                    Thank you for using AutoRentals. Have a safe journey
                  </Typography>
                </React.Fragment>
              )}
            </>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {activeStep !== 0 && (
                  <Button
                    variant="dark"
                    onClick={handleBack}
                    sx={{ mt: 5, ml: 1 }}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="dark"
                  onClick={handleNext}
                  sx={{ mt: 5, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Book ride" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
    </>
  );
}
