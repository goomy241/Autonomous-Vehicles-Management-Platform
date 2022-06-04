import React,{useState,useEffect} from "react";
import { Button, Card, Form, Row , Col} from "react-bootstrap";

import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import NavBar from "../NavigationBar";



export default function UpdateUserInfo(){
    const [regUserdata, setRegUserdata]=useState(null);
    const [userDetails, setUserDetails] = useState();
    const [userInfo , setUserInfo] = useState(null);

    const history = useHistory();

    useEffect(() => {
      const user = localStorage.getItem("user");
      console.log("User: ", user);
      if (user !== null && user !== undefined) {
        setUserInfo(JSON.parse(user));
      }
      else{
        history.push('/login')
        document.location.reload()
      }
     
        axios.get(`https://avcloud-node.herokuapp.com/users/${JSON.parse(user).username}`)
            .then((res) => {
              if (res.status === 200) {
                console.log(res.data);
                setUserDetails(res.data.data);
              } else {
                history.push("/login");
                document.location.reload();
              }
            });
  
          
        
        }, []);

    const handleChange=(event)=>{
        // console.log(event.target.value);
        setRegUserdata({...regUserdata,[event.target.name]:event.target.value})
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(regUserdata);

        axios.put(`https://avcloud-node.herokuapp.com/users/${userInfo.username}`,regUserdata)
        .then(res=>{
            if (res.status==200){
                console.log(res.data.message)
                console.log("Updation successful");

                history.push('/')
                document.location.reload()
            }
            else{
                document.location.reload()
                window.alert("Update information did not go through")
            }
            
        });
     
       
        

        // history.push("/login");
    }

return(
  <React.Fragment>
    <NavBar/>

      <Card style={{ width: '35rem', marginLeft:'25rem', marginTop:'2rem' }}>
          <Card.Header  style={{textAlign:'center', color:'green', fontStyle:"italic"}}>Update your profile</Card.Header>
          <Card.Body>
          <form onSubmit={handleSubmit} onChange={handleChange}>
              <Form.Group>
                 
                 <Form.Floating className="mb-3">
                 <Form.Control type="email"  placeholder="email" id="user_email" name="user_email"  required/>
                 <label htmlFor="Email" style={{marginLeft:10}} > Email</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="password" placeholder="Password" id="user_pw"  name="user_pw" required />
                 <label htmlFor="Password" style={{marginLeft:10}}> Password</label>
                 </Form.Floating>

                 <Form.Floating className="mb-3">
                 <Form.Control type="text"  placeholder="66944554687" id="user_phone"  name="user_phone" required/>
                 <label htmlFor="contact" style={{marginLeft:10}} > Contact Number</label>
                 </Form.Floating> 
                 
              </Form.Group>
              <Row>
                  <Col>
                  <Button type="submit" variant="success" size="md" active>Update Info</Button>
                  </Col>
                  
              </Row>



              </form>
          </Card.Body>
      </Card>
  </React.Fragment>

    
)
}