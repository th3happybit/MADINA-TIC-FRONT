import React from "react";
import { Form, Button} from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

import "./FormLogin.css";
import "../../index.css";

const FormLogin = () => {
 return (
 <div className="_form_login">
 <div className="_login_admin_section">
  <div className="d-flex">
   <Logo className="_logo" />
   <p className="title text-active bold ">MADINA TIC</p>
   <Form className="_admin_login_form _margin_vertical_md">
    <Form.Input
     placeholder="Email or username"
     type="text"
     size="large"
     className="_margin_vertical_sm small"
    />
    <Form.Input
     placeholder="Password"
     type="password"
     size="large"
     className="_margin_vertical_sm small"
    />
    <Button
     className="button_primary _margin_vertical_md"
     type="submit"
    >
     Login
            </Button>
   </Form>
   <p className="text-gray-dark semi-bold small">
    having a trouble?{" "}
    <spaan className="underline pointer">Click here</spaan>
   </p>
  </div>
 </div>
 </div>
 );
};
export default FormLogin;