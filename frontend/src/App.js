import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//? redux
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

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
import ServiceAuth from "./screens/Service/ServiceLogin.jsx";
import Service from "./screens/Service/Service.jsx";
import Consultations from "./screens/Consultations/Consultations.jsx";
import ConsultationsAnnonce from "./screens/ConsultationsAnnonce/ConsultationsAnnonce.jsx";
import Home from "./screens/Home/Home.jsx";
import AdminTypes from "./components/AdminTypes/AdminTypes.jsx";

//? import slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminLogin from "./screens/AdminLogin/AdminLogin.jsx";
import CitoyenMailVerification from "./components/CitoyenResetPassword/CitoyenMailVerification.jsx";
import CitoyenResetPassword from "./components/CitoyenResetPassword/CitoyenResetPassword.jsx";
import CitoyenHome from "./screens/CitoyenHome/CitoyenHome.jsx";
import AddDeclaration from "./components/AddDeclaration/AddDeclaration.jsx";
import CitoyenDeclarations from "./screens/CitoyenDeclarations/CitoyenDeclarations.jsx";
import MaireDeclarations from "./components/MaireDeclarations/MaireDeclaration.jsx";
import CitoyenDeclarationInfo from "./components/CitoyenDeclarationInfo/CitoyenDeclarationInfo.jsx";
import ComplementDeclaration from "./components/ComplementDeclaration/ComplementDeclaration.jsx";
import UpdateDeclaration from "./components/UpdateDeclaration/UpdateDeclaration.jsx";
import ServiceDeclaration from "./components/ServiceDeclaration/ServiceDeclaration.jsx";
import MaireRapports from "./components/MaireRapports/MaireRapports.jsx";
import DeposeRapport from "./components/ServiceDeposeRapport/ServiceDeposeRapport.jsx";
import UpdateRapport from "./components/ServiceUpdateReport/UpdateReport.jsx";
import ComplementRapport from "./components/ServiceComplementReport/ComplementReport.jsx";
import DeposerAnnonces from "./components/DeposerAnnonces/DeposerAnnonces.jsx";
import UpdateAnnounces from "./components/UpdateAnnounces/UpdateAnnounces.jsx";
import ComplementAnnounces from "./components/ComplementAnnounces/ComplementAnnounces.jsx";
import MaireAnnonce from "./components/MaireAnnonce/MaireAnnonce.jsx";
import Profile from "./components/Profile/Profile.jsx";
import DashboardMaire from "./components/DashboardMaire/DashboardMaire.jsx";
import HomeCitoyen from "./components/HomeCitoyen/HomeCitoyen.jsx";
import InfosScreen from "./components/HomeCitoyen/InfosScreen.jsx";
import Infos from "./components/ServiceMaireDeclarationInfos/DeclarationInfo.jsx";
import AdminCommune from "./components/AdminCommune/AdmineCommune.jsx";
import Commune from "./components/Commune/Commune.jsx";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
            <Route exact path="/maire/login" component={MaireAuth} />
            <Route
              exact
              path="/maire/profile/"
              component={() => (
                <Maire active="profile" childComponent={Profile} />
              )}
            />
            <Route
              exact
              path="/maire/declaration/"
              component={() => (
                <Maire
                  active="declarations"
                  childComponent={MaireDeclarations}
                />
              )}
            />
            <Route
              exact
              path="/maire/declaration/infos"
              component={(prop) => (
                <Maire
                  props={prop}
                  active="declarations"
                  childComponent={Infos}
                />
              )}
            />
            <Route
              exact
              path="/maire/dashboard/"
              component={() => (
                <Maire active="dashboard" childComponent={DashboardMaire} />
              )}
            />
            <Route
              exact
              path="/maire/announce/"
              component={() => (
                <Maire active="announce" childComponent={MaireAnnonce} />
              )}
            />
            <Route
              exact
              path="/maire/rapports/"
              component={() => (
                <Maire active="rapports" childComponent={MaireRapports} />
              )}
            />
            <Route
              exact
              path="/service/profile"
              component={() => (
                <Service active="profile" childComponent={Profile} />
              )}
            />
            <Route
              exact
              path="/service/rapports/"
              component={() => (
                <Service active="rapports" childComponent={Consultations} />
              )}
            />
            <Route
              exact
              path="/service/annonce/"
              component={() => (
                <Service
                  active="annonce"
                  childComponent={ConsultationsAnnonce}
                />
              )}
            />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/login" component={AdminLogin} />
            <Route
              exact
              path="/citoyen/profile"
              component={() => (
                <CitoyenHome
                  active="profile"
                  childComponent={<CitoyenProfile />}
                />
              )}
            />
            <Route
              exact
              path="/home"
              component={() => (
                <CitoyenHome
                  annonce
                  active="home"
                  childComponent={<HomeCitoyen />}
                />
              )}
            />
            <Route
              exact
              path="/home/annonce"
              component={() => <CitoyenHome annonce active="annonce" />}
            />
            <Route
              exact
              path="/citoyen/commune"
              component={() => (
                <CitoyenHome active="commune" childComponent={<Commune />} />
              )}
            />
            <Route
              exact
              path="/infosScreen"
              component={(prop) => (
                <CitoyenHome
                  props={prop}
                  childComponent={<InfosScreen props={prop} />}
                />
              )}
            />
            <Route
              exact
              path="/citoyen/declaration/"
              component={() => (
                <CitoyenHome
                  active="declaration"
                  childComponent={<CitoyenDeclarations />}
                />
              )}
            />
            <Route
              exact
              path="/infos"
              component={(prop) => (
                <CitoyenHome
                  props={prop}
                  childComponent={<CitoyenDeclarationInfo props={prop} />}
                />
              )}
            />
            <Route
              exact
              path="/add/declaration"
              component={() => (
                <CitoyenHome childComponent={<AddDeclaration />} />
              )}
            />
            <Route
              exact
              path="/update/declaration/"
              component={(prop) => (
                <CitoyenHome
                  props={prop}
                  childComponent={<UpdateDeclaration props={prop} />}
                />
              )}
            />
            <Route
              exact
              path="/complement/declaration/"
              component={(prop) => (
                <CitoyenHome
                  props={prop}
                  childComponent={<ComplementDeclaration props={prop} />}
                />
              )}
            />
            <Route exact path="/service/login" component={ServiceAuth} />
            <Route exact path="/service" component={Service} />
            <Route
              exact
              path="/service/declaration"
              component={() => (
                <Service
                  active="declarations"
                  childComponent={ServiceDeclaration}
                />
              )}
            />
            <Route
              exact
              path="/service/declaration/infos"
              component={(prop) => (
                <Service
                  props={prop}
                  active="declarations"
                  childComponent={Infos}
                />
              )}
            />
            <Route
              exact
              path="/add/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={DeposeRapport}
                />
              )}
            />
            <Route
              exact
              path="/update/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={UpdateRapport}
                />
              )}
            />
            <Route
              exact
              path="/complement/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={ComplementRapport}
                />
              )}
            />
            <Route
              exact
              path="/add/annonce"
              component={(prop) => (
                <Service
                  props={prop}
                  active="annonce"
                  childComponent={DeposerAnnonces}
                />
              )}
            />
            <Route
              exact
              path="/update/annonce"
              component={(prop) => (
                <Service
                  props={prop}
                  active="annonce"
                  childComponent={UpdateAnnounces}
                />
              )}
            />
            <Route exact path="/service/login" component={ServiceAuth} />
            <Route exact path="/service" component={Service} />
            <Route
              exact
              path="/service/declaration"
              component={() => (
                <Service
                  active="declarations"
                  childComponent={ServiceDeclaration}
                />
              )}
            />
            <Route
              exact
              path="/add/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={DeposeRapport}
                />
              )}
            />
            <Route
              exact
              path="/update/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={UpdateRapport}
                />
              )}
            />
            <Route
              exact
              path="/complement/rapport"
              component={(prop) => (
                <Service
                  props={prop}
                  active="rapports"
                  childComponent={ComplementRapport}
                />
              )}
            />
            <Route
              exact
              path="/add/annonce"
              component={(prop) => (
                <Service
                  props={prop}
                  active="annonce"
                  childComponent={DeposerAnnonces}
                />
              )}
            />
            <Route
              exact
              path="/update/annonce"
              component={(prop) => (
                <Service
                  props={prop}
                  active="annonce"
                  childComponent={UpdateAnnounces}
                />
              )}
            />
            <Route
              exact
              path="/complement/annonce"
              component={(prop) => (
                <Service
                  props={prop}
                  active="annonce"
                  childComponent={ComplementAnnounces}
                />
              )}
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
                <Admin
                  active="account"
                  childComponent={<AdminCreateAccount />}
                />
              )}
            />
            <Route
              exact
              path="/admin/commune"
              component={() => (
                <Admin active="commune" childComponent={<AdminCommune />} />
              )}
            />
            <Route
              path="/login"
              component={() => <CitoyenAuth islogin={true} />}
            />
            <Route
              path="/signup"
              component={() => <CitoyenAuth islogin={false} />}
            />
            <Route
              exact
              path="/"
              component={() => <Home content="home" active="accueil" />}
            />
            <Route
              exact
              path="/declaration"
              component={() => (
                <Home content="declaration" active="déclarations" />
              )}
            />
            <Route
              exact
              path="/commune"
              component={() => <Home content="commune" active="commune" />}
            />
            <Route
              exact
              path="/admin/declarations/types"
              component={() => (
                <Admin active="types" childComponent={<AdminTypes />} />
              )}
            />
            <Redirect to="/home" />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
