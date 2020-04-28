import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//? import screens
import Admin from "./screens/Admin/Admin.jsx";
import AdminProfile from "./screens/AdminProfile/AdminProfile.jsx";
import CitoyenAuth from "./screens/CitoyenAuth/CitoyenAuth.jsx";

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin" component={() => <Admin />} />
        <Route
          exact
          path="/admin/profile"
          component={() => (
            <Admin childComponent={<AdminProfile />} test="sdq" />
          )}
        />
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
