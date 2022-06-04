import "./App.css";
import Login from "./components/UserManagement/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/UserManagement/Register";
import UpdateUserInfo from "./components/UserManagement/UpdateUserInfo";
import UserProfile from "./components/UserManagement/UserProfile";
import NavBar from "./components/NavigationBar";
import BookRide from "./components/rides/BookRide";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminUsersList from "./components/admin/AdminUsersList";
import AdminCarsList from "./components/admin/AdminCarsList";
import AdminNavBar from "./components/admin/AdminNavigationBar";
import AddRides from "./components/admin/AddRides";
import AdminDashboardChart from "./components/admin/AdminDashboardChart";
import AdminBookingsList from "./components/admin/AdminBookingsList";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <UserProfile />
          </Route>
          <Route exact path="/login" component={Login} />

          <Route exact path="/register" component={Register} />

          <Route exact path="/updateuserprofile">
            <UpdateUserInfo />
          </Route>

          <Route exact path="/book">
            <BookRide />
          </Route>

          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>

          <Route exact path="/admin/dashboard">
            <AdminDashboard />
          </Route>

          <Route exact path="/admin/dashboard/users">
            <AdminUsersList />
          </Route>

          <Route exact path="/admin/dashboard/cars">
            <AdminCarsList />
          </Route>

          <Route exact path="/admin/add">
            <AddRides />
          </Route>

          <Route exact path="/admin/dashboard/charts">
            <AdminDashboardChart />
          </Route>
          <Route exact path="/admin/dashboard/bookings">
            <AdminBookingsList />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
