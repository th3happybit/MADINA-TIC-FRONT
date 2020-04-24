import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      </Switch>
    </Router>
  );
}

export default App;
