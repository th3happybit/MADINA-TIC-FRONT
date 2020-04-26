import React from "react";
import { Form, Button } from "semantic-ui-react";

const FormLogin = () => {
  return (
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
      <Button className="button_primary _margin_vertical_md" type="submit">
        Login
      </Button>
    </Form>
  );
};
export default FormLogin;
