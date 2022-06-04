import React, {useState}  from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NavBar from '../NavigationBar';


export default function FindSourceAndDestination(props) {

  
  const setSource = (e) => {
    const { ride, setRide} = props;
    setRide(
      {
        ...ride,
        start_loc: e.target.value,
      }
    );
  }
  const setDestination = (e) => {
    const { ride, setRide} = props;
    setRide(
      {
        ...ride,
        destination_loc: e.target.value,
      }
    );
  }
//   const setCarType = (e) => {
//     const { ride, setRide} = props;
//     setRide(
//       {
//         ...ride,
//         carType: e.target.value,
//       }
//     );
//   }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom marginBottom={5} >
        Select Starting and End point
      </Typography>
      <Grid container spacing={3} marginTop={[5]} marginLeft={10}>
      <Grid item xs={5}>
          <TextField
            id="source"
            name="source"
            label="Source"
            style={{width:'500px'}}
            autoComplete="Source"
            variant="outlined"
            onChange={(e) => {setSource(e)}}
            defaultValue={props.ride ? props.ride.source : ''}
            required
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id="destination"
            name="destination"
            label="Car Destination"
            style={{width:'500px'}}
            autoComplete="Car Type"
            variant="outlined"
            onChange={(e) => {setDestination(e)}}
            defaultValue={props.ride ? props.ride.destination : ''}
            required
          />
        </Grid>
        
        
    
      </Grid>
    </React.Fragment>
  );
}