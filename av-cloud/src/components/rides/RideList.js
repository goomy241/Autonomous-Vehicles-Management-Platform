import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "react-bootstrap";

function createData(rideNumber, carNumber, date, charge, status) {
  return { rideNumber, carNumber, charge, date, status };
}

const rows = [
  createData("1", "8CPA850", "11/10/2021", 16.0, "active"),
  createData("2", "7YPN393", "11/09/2021", 29.0, "active"),
  createData("3", "8AMF954", "11/09/2021", 56.0, "active"),
  createData("4", "8AMF954", "10/19/2021", 76.0, "active"),
  createData("5", "8AMF954", "10/09/2021", 76.0, "active"),
  createData("6", "8AMF954", "10/06/2021", 146.0, "active"),
  createData("7", "7MWL676", "09/30/2021", 122.0, "active"),
  createData("8", "7MWL676", "09/29/2021", 102.0, "active"),
  createData("9", "8AMF954", "09/19/2021", 56.0, "active"),
  createData("10", "8AMF954", "05/09/2021", 86.0, "active"),
  createData("11", "8AMF954", "05/09/2021", 86.0, "inactive"),
];

export default function RideList(props) {
  // const {persona } = location.state;
  const [rideList, setRideList] = useState();
  const [loading, setLoading] = useState(true);
 
  const { ride } = props;

  useEffect(() => {
    fetchRideList();
  }, []);


  const fetchRideList = async () => {
    axios.get("https://avcloud-node.herokuapp.com/car/available").then((res) => {
      if (res.status === 200) {
        const rows = [];
        console.log(res.data.data);
        res.data.data.map((el) => {
          const { car_id, car_type, car_loc_x, car_loc_y, use_state } = el;
          rows.push({
            car_id,
            car_loc_x,
            car_loc_y,
            car_type,
            use_state,
          });
        });

        setRideList(rows);
        setLoading(false);
      } else {
        console.log(res.message);
      }
    });
  };

  const setCarType = (event) => {
    const { ride, setRide} = props;
    const car_id_string = event.target.value
    setRide(
      {
        ...ride,
        car_id: parseInt(car_id_string),
      }
    );
    console.log(ride)

  }


  return (
    <>
      {!loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple-table" >
            <TableHead>
              <TableRow hover>
                {/* <TableCell>Ride Number</TableCell> */}
                <TableCell align="center">Car ID</TableCell>
                <TableCell align="center">Starting Location</TableCell>
                <TableCell align="center">Ending Location</TableCell>
                {/* <TableCell align="right">Charge Per Daye</TableCell> */}
                <TableCell align="center">Car Number</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rideList?.map((row) => (
                <TableRow  hover
                  key={row?.car_id} value={row?.car_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick = {setCarType} selected
                >
                  {/* <TableCell component="th" scope="row">
                    {row?.rideId}
                </TableCell> */}
                <TableCell align="center" value={row?.car_id} >{row?.car_id}</TableCell>

                  <TableCell align="center"  >{ride.start_loc}</TableCell>
                  <TableCell align="center">{ride.destination_loc}</TableCell>
                  <TableCell align="center">{row?.car_type}</TableCell>
                  <TableCell align="center" style={{ color: " green" }}>
                    {row?.use_state}
                  </TableCell>
                  <Button style={{marginTop:'7%'}} value={row?.car_id} onClick={setCarType}>Select</Button>
                </TableRow>
                
              ))}
            </TableBody>
          
          </Table>
        </TableContainer>
      )}
    </>
  );
}
