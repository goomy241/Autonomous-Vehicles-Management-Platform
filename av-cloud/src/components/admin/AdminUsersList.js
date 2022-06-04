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

const AdminUsersList = () => {
  const history = useHistory();

  const [users, setUsers] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("admin");
    console.log("User: ", user);
    if (user !== null && user !== undefined) {
      setUserInfo(JSON.parse(user));
    } else {
      history.push("/admin/login");
      document.location.reload();
    }

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

    axios.get("https://avcloud-node.herokuapp.com/users").then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);

        setUsers(res.data.data);
        console.log(users);
      } else {
        history.push("/admin/login");
        document.location.reload();
      }
    });
  }, []);


  const handleDelete =(event) =>{
    console.log(event.target.value);
        const deleteUser = event.target.value
        
        axios.delete(`https://avcloud-node.herokuapp.com/${deleteUser}`)
        .then((res) =>{
            if (res.status === 200){
                console.log(res.data);
                window.alert('Delete user complete')
                document.location.reload()
            }
            else{
                window.alert('Cannot delete user! Please try again!')
                document.location.reload()
            }


        });
  }



  return (
    <div>
      <>
      <AdminNavBar/>
        {users?.map((user) => (
          <Card style={{ margin: "2%"  }}>
            <Card.Header><b>{user.user_name}</b><Button value={user.user_name} onClick={handleDelete} style={{float:'right'}}>Delete</Button></Card.Header>
            <Card.Body>
              <Card.Title> User ID : {user.user_id} </Card.Title>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>User Email : </b>{user.user_email}</ListGroup.Item>
                  <ListGroup.Item><b>User Phone : </b>{user.user_phone}</ListGroup.Item>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </>
    </div>
  );
};

export default AdminUsersList;
