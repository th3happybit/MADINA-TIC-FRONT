import React from "react";
import { Grid, Container, Segment } from "semantic-ui-react";

//? import css
import "./AdminDashboard.css";

//? import components
import AdminNewAccounts from "../../components/AdminNewAccounts/AdminNewAccounts.jsx";

const AdminDashboard = () => {
  return (
    <div className="_admin_profile">
      <Container fluid>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <AdminNewAccounts />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {" "}
              <Segment>TODO later</Segment>
            </Grid.Column>
            <Grid.Column>
              {" "}
              <Segment>TODO later</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
export default AdminDashboard;
