import React from "react";
import { Form, Button, Container } from "semantic-ui-react";
import "./AdminLogin.css";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

const AdminLogin = () => {
  return (
    <div className="_admin_login">
      <Container>
        <div className="_admin_card">
          <div className="row">
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
          </div>
        </div>
      </Container>
    </div>
  );
};
export default AdminLogin;
