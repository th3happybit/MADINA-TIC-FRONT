import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//? import screens
import Admin from "./screens/Admin/Admin.jsx";

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App({ CitoyenAuth }) {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={() => <Admin />} />
        <Route path="/login" component={() => <CitoyenAuth islogin={true} />} />
        <Route
          path="/signup"
          component={() => <CitoyenAuth islogin={false} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
