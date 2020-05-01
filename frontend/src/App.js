import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//? import screens
import Admin from "./screens/Admin/Admin.jsx";
import AdminProfile from "./screens/AdminProfile/AdminProfile.jsx";
import CitoyenAuth from "./screens/CitoyenAuth/CitoyenAuth.jsx";
import AdminDashboard from "./screens/AdminDashboard/AdminDashboard.jsx";
import CitoyenProfile from "./screens/CitoyenProfile/CitoyenProfile.jsx";
import AdminCitoyen from "./screens/AdminCitoyen/AdminCitoyen.jsx";

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminLogin from "./screens/AdminLogin/AdminLogin.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/citoyen/profile" component={CitoyenProfile} />
        <Route
          exact
          path="/admin/citoyen"
          component={() => (
            <Admin active="citoyens" childComponent={<AdminCitoyen />} />
          )}
        />
        <Route
          exact
          path="/admin/profile"
          component={() => (
            <Admin active="" childComponent={<AdminProfile />} />
          )}
        />
        <Route
          exact
          path="/admin/dashboard"
          component={() => (
            <Admin active="dashboard" childComponent={<AdminDashboard />} />
          )}
        />
        <Route path="/login" component={() => <CitoyenAuth islogin={true} />} />
        <Route
          path="/signup"
          component={() => <CitoyenAuth islogin={false} />}
        />
        <Redirect to="/admin/login" />
      </Switch>
    </Router>
  );
}

export default App;
