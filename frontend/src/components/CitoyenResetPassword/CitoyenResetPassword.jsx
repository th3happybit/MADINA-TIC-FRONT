import { Form, Button, Message } from "semantic-ui-react";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import "./CitoyenMailVerification.css";
import axios from "axios";

//?import Validatondata
import CheckingPassword from "../../methods/CheckingPassword";
import React, { useState } from "react";

const CitoyenResetpassword = () => {
  const [isLoanding, setIsLoanding] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);

  const [New_Password, setNew_Password] = useState("");
  const [Confirm_New_Password, setConfirm_New_Password] = useState("");

  const handleChangeInput = (e) => {
    if (error) seterror(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "New_Password":
        setNew_Password(e.currentTarget.value);
        break;
      case "Confirm_New_Password":
        setConfirm_New_Password(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (error) seterror(null);
    if (success) setSuccess(null);
    let reset_password_errors = CheckingPassword(
      New_Password,
      Confirm_New_Password
    );
    if (reset_password_errors.length > 0) {
      seterror(true);
      setMessageError(reset_password_errors);
    } else {
      setIsLoanding(true);
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
          url: "http://13.92.195.8/api/password/reset/confirm/",
          method: "post",
          data: { New_Password, Confirm_New_Password },
        })
        .then((res) => {
          setIsLoanding(false);
          setSuccess(true);
          console.log(res);
        })
        .catch((err) => console.log(err.response));
    }
  };

  return (
    <div className="_form_reset_password ">
      <div className="_reset_password_section">
        <div className="d-flex shadow _card_mail_verification">
          <Logo className="_logo" />
          <p className="title text-active bold ">MADINA TIC</p>
          <div className="_titre ">
            <p className="text-gray-dark semi-bold small _first">
              Welcome back !
            </p>
            <p className="text-gray-dark semi-bold small _second">
              Modify your Password
            </p>
          </div>
          <Form
            style={{
              minHeight: "316px",
            }}
            success={success}
            error={error}
            className="_reset_password_form _margin_vertical_md"
          >
            <Form.Input
              value={New_Password}
              id="New_Password"
              placeholder="New Password"
              type="password"
              size="large"
              className="_margin_vertical_sm small"
              onChange={handleChangeInput}
            />
            <Form.Input
              value={Confirm_New_Password}
              id="Confirm_New_Password"
              placeholder="Confirm New Password"
              type="password"
              size="large"
              className="_margin_vertical_sm small"
              onChange={handleChangeInput}
            />
            <Message error content={messageError} />
            <Message
              success
              content="Your password has been changed succesfuly"
            />
            <Button
              className="_button_confirm button_primary _margin_vertical_md "
              type="submit"
              onClick={handleSubmit}
              loading={isLoanding}
            >
              Confirm
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CitoyenResetpassword;
