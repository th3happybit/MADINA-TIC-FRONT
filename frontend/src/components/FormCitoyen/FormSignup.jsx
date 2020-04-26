import React from "react";
import { Form, Button } from "semantic-ui-react";

const FormRegister = () => {
  return (
    <Form className="_citoyen_login_form _margin_vertical_md">
      <Form.Input
        placeholder="username"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Form.Input
        placeholder="Email"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Form.Input
        placeholder="Nationnal id"
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
      <Form.Input
        placeholder="Confirm Password"
        type="password"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Button className="button_primary _margin_vertical_md" type="submit">
        Signup
      </Button>
    </Form>
  );
};
export default FormRegister;
