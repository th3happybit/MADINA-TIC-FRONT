import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

const FormLogin = () => {
  const history = useHistory();

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
      .post("http://157.230.19.233/api/login/", {
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
            url: "http://157.230.19.233/api/user/",
            method: "get",
          })
          .then((res) => {
            const is_approved = res.data.is_approved;
            if (is_approved) {
              localStorage.setItem("token", key);
              setIsLoading(false);
              return history.push("/home");
            } else {
              setIsErr(true);
              setNonApproved(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsErr(true);
      });
  };
  return (
    <Form error={isErr} className="_citoyen_login_form _margin_vertical_md">
      <Form.Input
        onChange={handleChangeInput}
        value={email}
        id="email"
        placeholder="Email"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Form.Input
        onChange={handleChangeInput}
        value={password}
        id="password"
        placeholder="Password"
        type="password"
        size="large"
        className="_margin_vertical_sm small"
      />
      {!nonApp && (
        <Message
          error
          content={
            password.length === 0 && email.length === 0
              ? "Please enter your email and password to login"
              : "Invalid email or password"
          }
        />
      )}
      {nonApp && (
        <Message
          error
          content="Your account is not validated yet by the admin"
        />
      )}
      <Button
        loading={isLoading}
        className="button_primary _margin_vertical_md"
        type="submit"
        onClick={LoginCitoyen}
      >
        Login
      </Button>
    </Form>
  );
};
export default FormLogin;
