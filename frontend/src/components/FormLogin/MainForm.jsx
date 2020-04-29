import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

//? import logo
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

const MainForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, seterror] = useState(null);

  //? function for changing data in inputs
  const handleChangeInput = (e) => {
    if (error) seterror(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "username":
        setUsername(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };
  const Login = () => {
    console.log("login");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .post(
        "http://13.92.195.8/api/admin/",
        { username, password },
        axiosConfig
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Logo className="_logo" />
      <p className="title text-active bold ">MADINA TIC</p>
      <Form error={error} className="_admin_login_form _margin_vertical_md">
        <Form.Input
          id="username"
          onChange={handleChangeInput}
          placeholder="username"
          type="text"
          size="large"
          className="_margin_vertical_sm small"
          value={username}
        />
        <Form.Input
          id="password"
          onChange={handleChangeInput}
          placeholder="Password"
          type="password"
          size="large"
          className="_margin_vertical_sm small"
          value={password}
        />
        <Message error content="Please make sur that all the data is valid" />
        <Button
          onClick={Login}
          className="button_primary _margin_vertical_md"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </>
  );
};
export default MainForm;
