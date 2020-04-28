import React from "react";
import { Grid, Container } from "semantic-ui-react";

//? import css
import "./AdminProfile.css";

//? import components
import CardAdmin from "../../components/CardAdmin/CardAdmin.jsx";
import AdminEditProfile from "../../components/AdminEditProfile/AdminEditProfile.jsx";

const AdminProfile = () => {
  return (
    <div className="_admin_profile">
      <p className="extra-text text-active">Profile</p>
      <Container fluid>
        <Grid className="_admin_profile_grid">
          <Grid.Column className="_card">
            <CardAdmin />
          </Grid.Column>
          <Grid.Column className="_not_card">
            <AdminEditProfile />
          </Grid.Column>
        </Grid>
      </Container>
      <Container fluid className="mobile_profile">
        <CardAdmin />
      </Container>
    </div>
  );
};
export default AdminProfile;
