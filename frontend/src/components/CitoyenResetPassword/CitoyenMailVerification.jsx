import React, { Component } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import "./CitoyenMailVerification.css";

class CitoyenMailVerification extends Component {
handleClick(){
 alert("a reset password link has been sent to you !")
}
render() {
 return(
  <div className="_form_reset_password ">
   <Container className="_reset_password_section">
    <div className="d-flex shadow _card_mail_verification">
     <Logo className="_logo" />
     <p className="title text-active bold ">MADINA TIC</p>
     <p className="text-active _titre">
      Reset your Password</p>
      <p className="text-gray-dark semi-bold small" >enter your Email adress and we will</p>
     <p className="text-gray-dark semi-bold small"> send you a reset password link</p>
     <Form className="_reset_password_form _margin_vertical_md">
      <Form.Input
       placeholder="Email"
       type="text"
       size="large"
       className="_margin_vertical_sm small"
      />
      <Button className="_button_confirm button_primary _margin_vertical_md " type="submit" onClick={this.handleClick} >
       Confirm
        </Button>
     </Form>
    
    </div>
   </Container>
  </div>
 )
}
}
export default CitoyenMailVerification;