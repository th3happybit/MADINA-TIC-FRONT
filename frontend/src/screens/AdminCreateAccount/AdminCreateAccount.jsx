import React from "react";
import { Grid, Container } from "semantic-ui-react";

//? import components
import AdminAddAccountForm from "../../components/AdminAddAccountForm/AdminAddAccountForm.jsx";

const AdminCreateAccount = () => {
  return (
    <div className="_admin_profile">
      <Container fluid>
        <Grid columns="equal">
          <Grid.Row className="p-0">
            <Grid.Column>
              <AdminAddAccountForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};
export default AdminCreateAccount;
