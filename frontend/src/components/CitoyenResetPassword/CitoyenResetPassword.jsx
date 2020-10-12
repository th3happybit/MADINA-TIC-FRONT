import { Form, Button, Message } from "semantic-ui-react";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import "./CitoyenMailVerification.css";
import axios from "axios";

//?import Validatondata
import CheckingPassword from "../../methods/CheckingPassword";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CitoyenResetpassword = (props) => {
  const {
    match: { params },
  } = props;
  const [isLoanding, setIsLoanding] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(" ");
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
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/password/reset/confirm/",
          method: "post",
          data: {
            new_password1: New_Password,
            new_password2: Confirm_New_Password,
            uid: params.uid,
            token: params.token,
          },
        })
        .then((res) => {
          setIsLoanding(false);
          setMessageSuccess(res.data.detail);
          setSuccess(true);
        })
        .catch((err) => {
          setIsLoanding(false);
        });
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
              Salut encore{" "}
            </p>
            <p className="text-gray-dark semi-bold small _second">
              Modifiez votre mot de passe{" "}
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
              placeholder="nouveau mot de passe"
              type="password"
              size="large"
              className="_margin_vertical_sm small"
              onChange={handleChangeInput}
            />
            <Form.Input
              value={Confirm_New_Password}
              id="Confirm_New_Password"
              placeholder="Confirmer le nouveau mot de passe"
              type="password"
              size="large"
              className="_margin_vertical_sm small"
              onChange={handleChangeInput}
            />
            <Message error content={messageError} />
            <Message success content={messageSuccess} />
            {!success && (
              <Button
                className="_button_confirm button_primary _margin_vertical_md "
                type="submit"
                onClick={handleSubmit}
                loading={isLoanding}
              >
                Confirmer
              </Button>
            )}
            {success && (
              <Link to="/login">
                <Button
                  className="_button_confirm button_primary _margin_vertical_md "
                  type="submit"
                  onClick={handleSubmit}
                  loading={isLoanding}
                >
                  Connectez-vous
                </Button>
              </Link>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CitoyenResetpassword;
