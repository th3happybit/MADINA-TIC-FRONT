import React from 'react';
import { Container, Grid, Form, Button } from "semantic-ui-react";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import "./CitoyenResetPassword.css"

const CitoyenResetpassword = () => {
 return (
  <>
  <div className="_reset_section">
  <Container fluid className="_citoyen_login _taille">
   <div className="d-flex">
    
     {/* the form for the reset password*/ }
   
      <div className="_form_login _form">
       <div className="_login_admin_section">
        <div className="d-flex shadow _reset_card">
         
         <Logo className="_logo" />
         <p className="title text-active bold ">MADINA TIC</p>
         <Form className="_admin_login_form _margin_vertical_md _new_password_form">
          <Form.Input
           placeholder="New Password"
           type="password"
           size="large"
           className="_margin_vertical_sm small"
          />
          <Form.Input
           placeholder="Confirm New Password"
           type="password"
           size="large"
           className="_margin_vertical_sm small"
          />
          <Button className="button_primary _margin_vertical_md" type="submit">
           Confirm
        </Button>
         </Form>
        </div>
       </div>
      </div>

  
   </div>
</Container>
</div>

       {/* responsive one*/}
       <div className="_reset_mobile_section">
  <Container fluid className="_citoyen_login mobile m-0">
  
   <div className="citoyen_mobile_container">
    <div className="row">
     
      {/* the form for the reset password repsonsive one*/}
      <div className="_form_login">
       <div className="_login_admin_section">
        <div className="d-flex">

         <Logo className="_logo" />
         <p className="title text-active bold ">MADINA TIC</p>
         <Form className="_admin_login_form _margin_vertical_md _new_password_form">
          <Form.Input
           placeholder="New Password"
           type="password"
           size="large"
           className="_margin_vertical_sm small"
          />
          <Form.Input
           placeholder="Confirm New Password"
           type="password"
           size="large"
           className="_margin_vertical_sm small"
          />
          <Button className="button_primary _margin_vertical_md" type="submit">
           Confirm
        </Button>
         </Form>
        </div>
       </div>
      </div>


    </div>
   </div>
  </Container>
  </div>
  </>
 );
};

export default CitoyenResetpassword;