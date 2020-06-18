import React from "react";
import { Button, Divider } from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

import FormLogin from "./FormLogin.jsx";
import FormSignup from "./FormSignup.jsx";

import "./Form.css";

const FormCitoyen = (props) => {
  const { islogin, isFrench } = props;
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
          <p className="title text-active bold ">
            {isFrench ? "MADINA TIC" : "مدينة تيك"}
          </p>
          {islogin ? (
            <div className="d-flex _margin_vertical_md small text-gray-light">
              <p>
                {isFrench
                  ? "Veuillez saisir votre email"
                  : "أدخل بريدك الإلكتروني"}
              </p>
              <p>
                {isFrench
                  ? "et mot de passe pour se connecter"
                  : "و كلمة السر لتسجيل الدخول"}
              </p>
            </div>
          ) : (
            <div className="d-flex _margin_vertical_md small text-gray-light">
              <p>
                {isFrench
                  ? "Bienvenue dans Madina-Tic"
                  : "مرحبا بك في مدينة تيك"}
              </p>
            </div>
          )}
          {islogin ? (
            <FormLogin isFrench={isFrench} />
          ) : (
            <FormSignup isFrench={isFrench} />
          )}
          {islogin && (
            <p
              className={
                isFrench
                  ? "text-gray-dark semi-bold small"
                  : "text-gray-dark small"
              }
            >
              {isFrench ? "Mot de passe oublié ?" : "هل نسيت كلمة السر ؟"}{" "}
              <a href="/mailVerification" className="text-gray-dark">
                {" "}
                <spaan className="underline pointer">
                  {isFrench ? "Cliquez ici" : "انقر هنا"}
                </spaan>
              </a>
            </p>
          )}

          <Divider
            horizontal
            className={
              isFrench
                ? "text-gray-dark semi-bold extra-small _margin_vertical_lg"
                : "text-gray-dark extra-small _margin_vertical_lg"
            }
          >
            {islogin
              ? isFrench
                ? "Vous êtes nouveau ici ?"
                : "هل أنت جديد هنا ؟"
              : isFrench
              ? "Vous avez déjà un compte ?"
              : "هل تملك حسابا ؟"}
          </Divider>
          <div className="d-flex ">
            <Button className="button_secondary" type="submit">
              <a
                href={!islogin ? "/login" : "/signup"}
                className="text-white medium-text"
              >
                {!islogin
                  ? isFrench
                    ? "S'identifier"
                    : "تسجيل الدخول"
                  : isFrench
                  ? "S'inscrire"
                  : "أنشئ حسابا"}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormCitoyen;
