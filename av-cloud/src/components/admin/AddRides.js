import React,{useState,useEffect} from "react";
import { Button, Card, Form, Row , Col} from "react-bootstrap";

import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import AdminNavBar from "./AdminNavigationBar";



export default function UpdateUserInfo(){
    const [carData, setCarData]=useState(null);
    // const [userDetails, setUserDetails] = useState();
    const [userInfo , setUserInfo] = useState(null);

    const history = useHistory();

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
     
        // axios.get(`http://localhost:3000/users/${JSON.parse(user).username}`)
        //     .then((res) => {
        //       if (res.status === 200) {
        //         console.log(res.data);
        //         setUserDetails(res.data.data);
        //       } else {
        //         history.push("/login");
        //         document.location.reload();
        //       }
        //     });
  
          
        
        }, []);

    const handleChange=(event)=>{
        // console.log(event.target.value);
        setCarData({...carData,[event.target.name]:event.target.value})
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(carData);

        axios.post('https://avcloud-node.herokuapp.com/cars',carData)
        .then(res=>{
            if (res.status==200){
                console.log(res.data.message)
                console.log("Updation successful");

                history.push('/admin/dashboard/cars')
                document.location.reload()
            }
            else{
                document.location.reload()
                window.alert("Could not add car")
            }
            
        });
     
       
        

        // history.push("/login");
    }

return(
  <React.Fragment>

        <AdminNavBar/>
      <Card style={{ width: '35rem', marginLeft:'25rem', marginTop:'2rem' }}>
          <Card.Header  style={{textAlign:'center', color:'green', fontStyle:"italic"}}>Add a Car</Card.Header>
          <Card.Body>
          <form onSubmit={handleSubmit} onChange={handleChange}>
              <Form.Group>
                 
                 <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="Use-State" id="use_state" name="use_state"  required/>
                 <label htmlFor="Email" style={{marginLeft:10}} > Use State</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="text" placeholder="Moving-State" id="moving_state"  name="moving_state" required />
                 <label htmlFor="Password" style={{marginLeft:10}}> Moving State</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="Car type" id="car_type"  name="car_type" required/>
                 <label htmlFor="contact" style={{marginLeft:10}} > Car Model</label>
                 </Form.Floating> 
                 <Form.Floating className="mb-3">

                 <Form.Control type="text"  placeholder="X- coordinate" id="car_loc_x"  name="car_loc_x" required/>
                 <label htmlFor="contact" style={{marginLeft:10}} > Car Location - X</label>
                 </Form.Floating> 

                 <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="Y-coordinate" id="car_loc_y"  name="car_loc_y" required/>
                 <label htmlFor="contact" style={{marginLeft:10}} > Car Location - Y</label>
                 </Form.Floating> 
                 
              </Form.Group>
              <Row>
                  <Col>
                  <Button type="submit" variant="success" size="md" active>Add car</Button>
                  </Col>
                  
              </Row>



              </form>
          </Card.Body>
      </Card>
  </React.Fragment>

    
)
}