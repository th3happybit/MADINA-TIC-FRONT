import React from "react";
import { Container, Grid, Form, Button, Divider } from "semantic-ui-react";

import "./CitoyenLogin.css";

//? import Logo
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const CitoyenLogin = () => {
  return (
    <Container fluid className="_citoyen_login">
      <Grid>
        <Grid.Column width={10} className="_citoyen_login_hero_section" />
        <Grid.Column width={6}>
          <div className="_login_citoyen_section">
            <div className="d-flex">
              <Logo className="_logo" />
              <div className="d-flex _margin_vertical_md small">
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
                having a trouble? <span className="underline">Click here</span>
              </p>
            </div>
          </div>
          <Divider horizontal className="text-gray-dark semi-bold extra-small">
            You are new here?
          </Divider>
          <div className="d-flex">
            <Button
              className="button_secondary _margin_vertical_md"
              type="submit"
            >
              Signup
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default CitoyenLogin;
