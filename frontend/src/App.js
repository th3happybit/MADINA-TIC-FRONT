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
import AdminCreateAccount from "./screens/AdminCreateAccount/AdminCreateAccount.jsx";
import Maire from "./screens/Maire/Maire.jsx";
import MaireAuth from "./screens/Maire/MaireLogin.jsx";

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminLogin from "./screens/AdminLogin/AdminLogin.jsx";
import CitoyenMailVerification from "./components/CitoyenResetPassword/CitoyenMailVerification.jsx";
import CitoyenResetPassword from "./components/CitoyenResetPassword/CitoyenResetPassword.jsx";
import CitoyenHome from "./screens/CitoyenHome/CitoyenHome.jsx";
import AddDeclaration from "./components/AddDeclaration/AddDeclaration.jsx";
import CitoyenDeclarations from "./screens/CitoyenDeclarations/CitoyenDeclarations.jsx";
import MaireDeclarations from "./components/MaireDeclarations/MaireDeclaration.jsx"
import CitoyenDeclarationInfo from "./components/CitoyenDeclarationInfo/CitoyenDeclarationInfo.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/account/reset-password/confirm/:uid/:token"
          component={CitoyenResetPassword}
        />
        <Route
          exact
          path="/mailVerification"
          component={CitoyenMailVerification}
        />
        <Route exact path="/maire" component={Maire} />
        <Route exact path="/maire/login" component={MaireAuth}/>
        <Route exact path="/maire/declaration/" component={() => <Maire active="declarations" childComponent={MaireDeclarations}/>} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/citoyen/profile" component={() => <CitoyenHome active="" childComponent={<CitoyenProfile/>}/>} />
        <Route exact path="/home" component={() => <CitoyenHome active="home"/>} />
        <Route exact path="/citoyen/declaration/" component={() => <CitoyenHome active ="declaration" childComponent={<CitoyenDeclarations/>} />}/>
       
        <Route
          exact
          path="/infos"
          component={(prop) => <CitoyenHome props={prop} childComponent={<CitoyenDeclarationInfo props={prop}/>} />}
        />
        <Route
          exact
          path="/add/declaration"
          component={() => <CitoyenHome childComponent={<AddDeclaration />} />}
        />
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
            <Admin active="profile" childComponent={<AdminProfile />} />
          )}
        />
        <Route
          exact
          path="/admin/dashboard"
          component={() => (
            <Admin active="dashboard" childComponent={<AdminDashboard />} />
          )}
        />
        <Route
          exact
          path="/admin/create/account"
          component={() => (
            <Admin active="account" childComponent={<AdminCreateAccount />} />
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
