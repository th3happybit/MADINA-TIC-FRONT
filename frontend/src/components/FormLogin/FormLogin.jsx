import React from "react";
import { Form, Button, Divider } from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

import "./FormLogin.css";

const FormLogin = () => {
  return (
    <div className="_form_login">
      <div className="_login_citoyen_section">
        <div className="d-flex">
          <Logo className="_logo" />
          <p className="title text-active bold ">MADINA TIC</p>
          <div className="d-flex _margin_vertical_md small text-gray-light">
            <p>Please enter your username</p>
            <p>and password to login</p>
          </div>
          <Form className="_citoyen_login_form _margin_vertical_md">
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
      <Divider horizontal className="text-gray-dark semi-bold extra-small">
        You are new here?
      </Divider>
      <div className="d-flex">
        <Button className="button_secondary _margin_vertical_md" type="submit">
          Signup
        </Button>
      </div>
    </div>
  );
};
export default FormLogin;
