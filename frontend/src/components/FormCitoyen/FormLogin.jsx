import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

const FormLogin = (props) => {
  const history = useHistory();
  const { isFrench } = props;

  //? for loading while post request
  const [isLoading, setIsLoading] = useState(false);
  const [nonApp, setNonApproved] = useState(false);
  const [isErr, setIsErr] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeInput = (e) => {
    let id = e.currentTarget.id;
    setIsErr(false);
    switch (id) {
      case "password":
        setPassword(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  //? fetch api login
  const LoginCitoyen = () => {
    setIsLoading(true);
    axios
      .post("https://madina-tic.ml/api/login/", {
        email,
        password,
      })
      .then((res) => {
        const key = res.data.key;
        axios
          .create({
            headers: {
              get: {
                "Content-Type": "application/json",
                Authorization: `Token ${key}`,
              },
            },
          })
          .request({
            url: "https://madina-tic.ml/api/user/",
            method: "get",
          })
          .then((res) => {
            const is_approved = res.data.is_approved;
            const role = res.data.role;
            if (is_approved) {
              if (role === "Client") {
                localStorage.setItem("token", key);
                setIsLoading(false);
                return history.push("/home");
              } else {
                setIsErr(true);
                setIsLoading(false);
              }
            } else {
              setIsErr(true);
              setNonApproved(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {});
      })
      .catch((err) => {
        setIsLoading(false);
        setIsErr(true);
      });
  };
  return (
    <Form
      error={isErr}
      className={
        isFrench
          ? "_citoyen_login_form _margin_vertical_md"
          : "_citoyen_login_form rtl _margin_vertical_md"
      }
    >
      <Form.Input
        onChange={handleChangeInput}
        value={email}
        id="email"
        placeholder={isFrench ? "Email" : "البريد الإلكتروني"}
        type="text"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Form.Input
        onChange={handleChangeInput}
        value={password}
        id="password"
        placeholder={isFrench ? "Mot de passe" : "كلمة السر"}
        type="password"
        size="large"
        className="_margin_vertical_sm small"
      />
      {!nonApp && (
        <Message
          error
          content={
            password.length === 0 && email.length === 0
              ? isFrench
                ? "Veuillez saisir votre e-mail et votre mot de passe pour vous connecter"
                : "تحقق من إدخالك للبريد الإلكتروني و كلمة السر لتسجيل الدخول"
              : isFrench
              ? "email ou mot de passe invalide"
              : "تحقق من صحة المعلومات"
          }
        />
      )}
      {nonApp && (
        <Message
          error
          content={
            isFrench
              ? "Votre compte n'est pas encore validé par l'administrateur"
              : "لم يتم قبول حسابك من طرف الإدارة بعد"
          }
        />
      )}
      <Button
        loading={isLoading}
        className="button_primary _margin_vertical_md"
        type="submit"
        onClick={LoginCitoyen}
      >
        {isFrench ? "S'identifier" : "تسجيل الدخول"}
      </Button>
    </Form>
  );
};
export default FormLogin;
