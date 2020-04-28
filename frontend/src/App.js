import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//? import screens

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminLogin from "./screens/AdminLogin/AdminLogin.jsx"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={() => <AdminLogin/>} />
        <Route path="/login" component={() => <div>login</div>} />
        <Route path="/signup" component={() => <div>signup</div>} />
      </Switch>
    </Router>
  );
}

export default App;
