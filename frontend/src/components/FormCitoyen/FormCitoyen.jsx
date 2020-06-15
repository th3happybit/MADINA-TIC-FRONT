import React from "react";
import { Button, Divider } from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

import FormLogin from "./FormLogin.jsx";
import FormSignup from "./FormSignup.jsx";

import "./Form.css";

const FormCitoyen = (props) => {
  const { islogin } = props;
  return (
    <div className="_form_login">
      <div className="_login_citoyen_section">
        <div
          className="d-flex"
          style={{
            minHeight: !islogin ? "1100px" : "auto",
          }}
        >
          <Logo className="_logo" />
          <p className="title text-active bold ">MADINA TIC</p>
          {islogin ? (
            <div className="d-flex _margin_vertical_md small text-gray-light">
              <p>Veuillez saisir votre email</p>
              <p>et mot de passe pour se connecter</p>
            </div>
          ) : (
            <div className="d-flex _margin_vertical_md small text-gray-light">
              <p>Bienvenue sur notre plateforme</p>
            </div>
          )}
          {islogin ? <FormLogin /> : <FormSignup />}
          {islogin && (
            <p className="text-gray-dark semi-bold small">
              Mot de passe oublié?{" "}
              <a href="/mailVerification" className="text-gray-dark">
                {" "}
                <spaan className="underline pointer">Cliquez ici</spaan>
              </a>
            </p>
          )}

          <Divider
            horizontal
            className="text-gray-dark semi-bold extra-small _margin_vertical_lg"
          >
            {islogin ? "Vous êtes nouveau ici?" : "Vous avez déjà un compte"}
          </Divider>
          <div className="d-flex ">
            <Button className="button_secondary" type="submit">
              <a
                href={!islogin ? "/login" : "/signup"}
                className="text-white medium-text"
              >
                {!islogin ? "S'identifier" : "S'inscrire"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormCitoyen;
