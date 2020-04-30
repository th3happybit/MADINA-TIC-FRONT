import React from "react";
import { Form, Input } from "semantic-ui-react";

const InfosForm = () => {
  return (
    <Form className="_margin_vertical_lg">
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-first-name"
          control={Input}
          label="First name"
          placeholder="First name"
        />
        <Form.Field
          id="form-input-control-last-name"
          control={Input}
          label="Last name"
          placeholder="Last name"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-email"
          control={Input}
          label="Email"
          placeholder="Email"
        />
        <Form.Field
          id="form-input-control-birthday"
          control={Input}
          label="Birthday"
          placeholder="Birthday"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-address"
          control={Input}
          label="Address"
          placeholder="Address"
        />
        <Form.Field
          id="form-input-control-phone"
          control={Input}
          label="Phone Number"
          placeholder="Phone Number"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-fcb"
          control={Input}
          label="Facebok link"
          placeholder="Facebok link"
        />
        <Form.Field
          id="form-input-control-google"
          control={Input}
          label="Google link"
          placeholder="Google link"
        />
      </Form.Group>
    </Form>
  );
};
export default InfosForm;
