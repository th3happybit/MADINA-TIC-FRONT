import React from "react";
import { Form, Message } from "semantic-ui-react";

const PasswordForm = (props) => {
  const {
    isShow,
    isErr,
    password,
    newPassword,
    confirmPassword,
    handleInputChange,
    messageErr,
  } = props;

  return (
    <Form error={isErr} className="_margin_vertical_lg">
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            disabled={!isShow}
            id="password"
            type="password"
            value={password}
            label="Current Password"
            placeholder="Current Password"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>{" "}
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            disabled={!isShow}
            id="new_password"
            type="password"
            value={newPassword}
            label="New Password"
            placeholder="New Password"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>{" "}
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            disabled={!isShow}
            type="password"
            id="confirm_password"
            value={confirmPassword}
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>{" "}
      <Message error content={messageErr} />
    </Form>
  );
};
export default PasswordForm;
