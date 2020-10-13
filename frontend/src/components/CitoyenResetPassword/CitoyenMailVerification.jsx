import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

import ValidationEmail from "../../methods/ValidationEmail.js";

import "./CitoyenMailVerification.css";

const CitoyenMailVerification = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [succes, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageSuccess, setMessageSucces] = useState("");

  const handleClick = () => {
    if (!ValidationEmail(email)) {
      setError(true);
    } else {
      setIsLoading(true);
      axios
        .create({
          headers: {
            post: {
              "Content-Type": "application/json",
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/password/reset/",
          method: "post",
          data: { email },
        })
        .then((res) => {
          setIsLoading(false);
          setSuccess(true);
          setMessageSucces(res.data.detail);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
        });
    }
  };
  const handleInputChange = (e, { value }) => {
    if (succes) setSuccess(false);
    if (error) setError(false);
    setEmail(value);
  };

  return (
    <div className="_form_reset_password ">
      <div className="_reset_password_section">
        <div className="d-flex shadow _card_mail_verification">
          <Logo className="_logo" />
          <p className="title text-active bold ">MADINA TIC</p>
          <p className="text-active _titre">Réinitialisez votre mot de passe</p>
          <div className="_sous_titre">
            <p
              className="text-gray-dark semi-bold small"
              style={{
                textAlign: "center",
              }}
            >
              entrez votre adresse e-mail et nous
            </p>
            <p
              style={{
                textAlign: "center",
              }}
              className="text-gray-dark semi-bold small"
            >
              {" "}
              vous envoyer un lien de réinitialisation de mot de passe
            </p>
          </div>
          <Form
            error={error}
            success={succes}
            className="_reset_password_form mail_verif _margin_vertical_md"
          >
            <Form.Input
              placeholder="Email"
              type="text"
              value={email}
              size="large"
              onChange={handleInputChange}
              className="_margin_vertical_sm small"
            />{" "}
            <Message success content={messageSuccess} />
            <Message
              error
              content="veuillez indiquer une adresse e-mail valide"
            />
            <Button
              loading={isLoading}
              className="_button_confirm button_primary _margin_vertical_md "
              type="submit"
              onClick={handleClick}
            >
              Confirmer
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CitoyenMailVerification;
