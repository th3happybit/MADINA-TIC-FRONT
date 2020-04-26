import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import profile from "./screens/CitoyenProfile/CitoyenProfile.jsx"


//? import screens

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={() => <div>admin</div>} />
        <Route path="/login" component={() => <div>login</div>} />
        <Route path="/signup" component={() => <div>signup</div>} />
        <Route path="/profile" component={profile}/ >
      </Switch>
    </Router>
  );
}

export default App;
