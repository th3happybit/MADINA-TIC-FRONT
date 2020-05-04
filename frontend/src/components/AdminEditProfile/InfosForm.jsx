import React from "react";
import { Form, Input, Message } from "semantic-ui-react";

const InfosForm = (props) => {
  const {
    isShow,
    first_name,
    last_name,
    email,
    phone,
    address,
    birthday,
    handleInputChange,
    isErr,
  } = props;

  return (
    <>
      {typeof first_name !== "undefined" && (
        <Form error={isErr} className="_margin_vertical_lg">
          <Form.Group widths="equal">
            <Form.Field
              disabled={!isShow}
              id="first_name"
              control={Input}
              label="First name"
              placeholder="First name"
              value={first_name}
              onChange={handleInputChange}
            />

            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={last_name}
              id="last_name"
              control={Input}
              label="Last name"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              id="email"
              control={Input}
              value={email}
              label="Email"
              placeholder="Email"
            />
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={birthday}
              id="birthday"
              control={Input}
              label="Birthday"
              placeholder="Birthday"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={address}
              id="address"
              control={Input}
              label="Address"
              placeholder="Address"
            />
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={phone}
              id="phone"
              control={Input}
              label="Phone Number"
              placeholder="Phone Number"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              disabled={!isShow}
              id="form-input-control-fcb"
              control={Input}
              label="Facebok link"
              placeholder="Facebok link"
            />
            <Form.Field
              disabled={!isShow}
              id="form-input-control-google"
              control={Input}
              label="Google link"
              placeholder="Google link"
            />
          </Form.Group>
          <Message
            error
            content={
              first_name &&
              first_name.length > 0 &&
              last_name.length > 0 &&
              address.length > 0 &&
              email.length > 0 &&
              birthday.length > 0 &&
              phone.length > 0
                ? "Please make sur that all the data is valid"
                : "All the inputs are required to update the profile"
            }
          />
        </Form>
      )}
    </>
  );
};
export default InfosForm;
