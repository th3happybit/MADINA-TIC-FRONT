import React from "react";
import { Container, Grid } from "semantic-ui-react";
import FormLogin from "../../components/FormLogin/FormLogin.jsx"
import "../../index.css"
import "./AdminLogin.css"


const AdminLogin = () =>  {
 return(
  <>
  <Container className="_admin_login">
   <Grid className="h-full">
    <Grid.Column className="p-0 bg-default h-full" width={15}>
     <FormLogin />
    </Grid.Column>
   </Grid>
  </Container>
  </>
 );
};
export default AdminLogin;