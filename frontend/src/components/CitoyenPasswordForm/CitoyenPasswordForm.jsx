import React, {useState} from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import ValidatePassword from "../../methods/ValidateDataUpdatePass.js";
import "./CitoyenPasswordForm.css";

const PasswordForm = () => {

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
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [errMessage, seterrMessage] = useState(null);

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

  const handleSumbit = () => {
    if (error) seterror(null);
    if (success) setSuccess(null);

    var errors = ValidatePassword([
      currentPassword, 
      newPassword,
      confirmPassword, 
    ]);

    if (errors.length > 0){
      seterror(true);
    }
    else{
      UpdatePasswordCitoyen();
    }
  };
  const UpdatePasswordCitoyen = () => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "http://13.92.195.8/api/password/change/",
        method: "post",
        data : {
        old_password : currentPassword,
        new_password1 : newPassword,
        new_password2 : confirmPassword
        },
      })
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((err) => {
        let resErrOldPassword = err.response.data.old_password ? err.response.data.old_password[0] : "";
        let resErrNewPassw = err.response.data.new_password2 ? err.response.data.new_password2[0] : "";
          if (resErrOldPassword !== "") {
            seterrMessage(resErrOldPassword);
          } else seterrMessage(resErrNewPassw);
        seterror(true);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Form
      success = {success}
      error = {error} 
      id="pform" 
      className="_margin_vertical_lg">
      <Form.Group className="input-password">
        <div className="input_p">
          <Form.Input
            id="currentPassword"
            value={currentPassword.value}
            type={currentPassword.isPassword ? "password" : "text"}
            label="Current Password"
            placeholder="Current Password"
            onChange={handleInputChangeValue}
            className="required"
          />
          <i
            className="eye icon pointer"
            data-id="currentPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>
      <Form.Group className="input-password">
        <div className="input_p">
          <Form.Input
            id="newPassword"
            value={newPassword.value}
            type={newPassword.isPassword ? "password" : "text"}
            label="New Password"
            placeholder="New Password"
            onChange={handleInputChangeValue}
            className="required"
          />
          <i
            className="eye icon pointer"
            data-id="newPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>
      <Form.Group className="input-password">
        <div className="input_p">
          <Form.Input
            id="confirmPassword"
            value={confirmPassword.value}
            type={confirmPassword.isPassword ? "password" : "text"}
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={handleInputChangeValue}
            className="required"
          />
          <i
            className="eye icon pointer"
            data-id="confirmPassword"
            onClick={handleShowPsw}
          />
        </div>
      </Form.Group>
      <div  className="_margin_vertical_md pbutt subs">
                <Button className="button_secondary"
                disabled={isLoading}
                >Cancel</Button>
                <Button 
                type="submit"
                onClick={handleSumbit}
                loading={isLoading}
                className="button_primary">Save</Button>
            </div>
            
            <Message error content={errMessage} />
            <Message success content="Your infos update request has been sent successfully" />
    </Form>
    </div>
  );
}

export default PasswordForm;