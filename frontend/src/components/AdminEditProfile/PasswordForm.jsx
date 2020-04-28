import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const PasswordForm = () => {
  //? value of passwords input in the form
  const [currentPassword, setCurrentPassword] = useState({
    value: "",
    isPassword: true,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    isPassword: true,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isPassword: true,
  });
  //? show or hide password input
  const handleShowPsw = (e) => {
    let id = e.currentTarget.attributes["data-id"].nodeValue;
    switch (id) {
      case "currentPassword":
        if (currentPassword.value.length > 0)
          setCurrentPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      case "newPassword":
        if (newPassword.value.length > 0)
          setNewPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      case "confirmPassword":
        if (confirmPassword.value.length > 0)
          setConfirmPassword((prevState) => {
            let isPass = !prevState.isPassword;
            return {
              ...prevState,
              isPassword: isPass,
            };
          });
        break;
      default:
        break;
    }
  };

  //? handle input value change
  const handleInputChangeValue = (event) => {
    let value = event.currentTarget.value;
    let id = event.currentTarget.id;
    switch (id) {
      case "currentPassword":
        setCurrentPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      case "newPassword":
        setNewPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      case "confirmPassword":
        setConfirmPassword((prevState) => {
          return {
            ...prevState,
            value,
          };
        });
        break;
      default:
        break;
    }
  };
  return (
    <Form className="_margin_vertical_lg">
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            id="currentPassword"
            value={currentPassword.value}
            type={currentPassword.isPassword ? "password" : "text"}
            label="Current Password"
            placeholder="Current Password"
            onChange={handleInputChangeValue}
          />
          <i
            className="eye icon pointer"
            data-id="currentPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>{" "}
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            id="newPassword"
            value={newPassword.value}
            type={newPassword.isPassword ? "password" : "text"}
            label="New Password"
            placeholder="New Password"
            onChange={handleInputChangeValue}
          />
          <i
            className="eye icon pointer"
            data-id="newPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>{" "}
      <Form.Group className="_form_password">
        <div className="input_p">
          <Form.Input
            id="confirmPassword"
            value={confirmPassword.value}
            type={confirmPassword.isPassword ? "password" : "text"}
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={handleInputChangeValue}
          />
          <i
            className="eye icon pointer"
            data-id="confirmPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>{" "}
    </Form>
  );
};
export default PasswordForm;
