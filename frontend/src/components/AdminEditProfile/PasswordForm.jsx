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
            label="Mot de passe actuel"
            placeholder="Mot de passe actuel"
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
            label="nouveau mot de passe"
            placeholder="nouveau mot de passe"
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
            label="Confirmez le mot de passe"
            placeholder="Confirmez le mot de passe"
            onChange={handleInputChange}
          />
        </div>
      </Form.Group>{" "}
      <Message error content={messageErr} />
    </Form>
  );
};
export default PasswordForm;
