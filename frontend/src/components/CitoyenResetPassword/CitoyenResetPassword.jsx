import React from 'react';
import { Container, Grid, Form, Button } from "semantic-ui-react";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import "./CitoyenMailVerification.css"

const CitoyenResetpassword = () => {
 return (
   <div className="_form_reset_password ">
     <Container className="_reset_password_section">
       <div className="d-flex shadow _card_mail_verification">
         <Logo className="_logo" />
         <p className="title text-active bold ">MADINA TIC</p>
         <Form className="_reset_password_form _margin_vertical_md">
           <Form.Input
             placeholder="New Password"
             type="password"
             size="large"
             className="_margin_vertical_sm small"
           />
           <Form.Input
             placeholder="Confirm New Password"
             type="text"
             size="large"
             className="_margin_vertical_sm small"
           />
           <Button className="_button_confirm button_primary _margin_vertical_md " type="submit">
             Confirm
        </Button>
         </Form>

       </div>
     </Container>
   </div>
 );
};

export default CitoyenResetpassword;