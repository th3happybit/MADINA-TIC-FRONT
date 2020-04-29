import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

const FormLogin = () => {
  //? for loading while post request
  const [isLoading, setIsLoading] = useState(false);

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
      .post("http://13.92.195.8/api/login/", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.key);
        //getItem
        setIsLoading(false);
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
      <Message
        error
        content={
          password.length === 0 && email.length === 0
            ? "Please enter your email and password to login"
            : "Invalid email or password"
        }
      />
      <Button
        loading={isLoading}
        className="button_primary _margin_vertical_md"
        type="submit"
        onClick={LoginCitoyen}
      >
        Login
      </Button>
      <p
        className="pointer"
        onClick={() => {
          axios
            .get("http://13.92.195.8/api/userinstance/", {
              headers: {
                Authorization: `Token  ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        test
      </p>
    </Form>
  );
};
export default FormLogin;
