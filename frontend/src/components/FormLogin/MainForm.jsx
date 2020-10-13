import React, { useState, useEffect } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
//? import logo
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

const MainForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setISLoading] = useState(false);
  const [error, seterror] = useState(null);

  //? function for changing data in inputs
  const handleChangeInput = (e) => {
    if (error) seterror(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };
  const Login = () => {
    setISLoading(true);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/login/",
        method: "post",
        data: { email, password },
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
            if (res.data.role === "Admin") {
              localStorage.setItem("admin_token", key);
              setISLoading(false);
              return history.push("/admin/dashboard");
            } else {
              seterror(true);
              setISLoading(false);
            }
          })
          .catch((err) => {});
      })
      .catch(() => {
        setISLoading(false);
        seterror(true);
      });
  };
  return (
    <>
      <Logo className="_logo" />
      <p className="title text-active bold ">MADINA TIC</p>
      <Form error={error} className="_admin_login_form _margin_vertical_md">
        <Form.Input
          id="email"
          onChange={handleChangeInput}
          placeholder="email"
          type="text"
          size="large"
          className="_margin_vertical_sm small"
          value={email}
        />
        <Form.Input
          id="password"
          onChange={handleChangeInput}
          placeholder=" Mot de passe"
          type="password"
          size="large"
          className="_margin_vertical_sm small"
          value={password}
        />
        <Message error content="Invalid username or password" />
        <Button
          loading={isLoading}
          onClick={Login}
          className="button_primary _margin_vertical_md"
          type="submit"
        >
          S'identifier
        </Button>
      </Form>
    </>
  );
};
export default MainForm;
