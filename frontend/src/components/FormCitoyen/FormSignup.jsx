import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

//? import ValidationData
import ValidationData from "../../methods/ValidationData.js";

const FormRegister = () => {
  //? for loading while post request
  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);

  const [first_name, setfirst_name] = useState("");

  const [last_name, setlast_name] = useState("");

  const [birthday, setbirthday] = useState("");

  const [phone, setPhone] = useState("");

  const [addrress, setaddrres] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  //? function for changing data in inputs
  const handleChangeInput = (e) => {
    if (error) seterror(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "first_name":
        setfirst_name(e.currentTarget.value);
        break;
      case "last_name":
        setlast_name(e.currentTarget.value);
        break;
      case "email":
        setEmail(e.currentTarget.value);
        break;
      case "birthday":
        setbirthday(e.currentTarget.value);
        break;
      case "phone":
        setPhone(e.currentTarget.value);
        break;
      case "address":
        setaddrres(e.currentTarget.value);
        break;
      case "password":
        setPassword(e.currentTarget.value);
        break;
      case "confirm_password":
        setConfirmPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  //? function called when user submit the form
  const handleSumbit = () => {
    let login = false;
    //* initialation of errors if it gonna be the second time of submit
    if (error) seterror(null);
    if (success) setSuccess(null);

    //? validate inputs
    const errors = ValidationData({
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      birthday,
      addrress,
      phone,
      login,
    });

    if (errors.length > 0) {
      //*there is erros
      seterror(true);
    } else {
      //*there is no erros => fetch api
      //? message success
      setSuccess(true);
      //? post request
      RegisterUser();
    }
  };

  //? fetch api
  const RegisterUser = () => {
    setIsLoading(true);
    axios
      .post("http://13.92.195.8/api/registration/", {
        email: email,
        password1: password,
        password2: confirmPassword,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        date_of_birth: birthday,
        address: addrress,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      });
  };
  return (
    <Form
      success={success}
      error={error}
      className="_citoyen_login_form signup _margin_vertical_sm "
    >
      <Form.Input
        value={first_name}
        id="first_name"
        placeholder="First Name"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={last_name}
        id="last_name"
        placeholder="Last Name"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={email}
        id="email"
        placeholder="Email"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={birthday}
        id="birthday"
        placeholder="Birthday"
        type="date"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={phone}
        id="phone"
        placeholder="Phone Number"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={addrress}
        id="address"
        placeholder="Address"
        type="text"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        value={password}
        id="password"
        placeholder="Password"
        type="password"
        size="large"
        className="_margin_vertical_sm small"
        onChange={handleChangeInput}
      />
      <Form.Input
        onChange={handleChangeInput}
        value={confirmPassword}
        id="confirm_password"
        placeholder="Confirm Password"
        type="password"
        size="large"
        className="_margin_vertical_sm small"
      />
      <Message error content="Please make sur that all the data is valid" />
      <Message success content="check your email for validating your account" />
      <Button
        className="button_primary _margin_vertical_md pointer"
        type="submit"
        onClick={handleSumbit}
        loading={isLoading}
      >
        Signup
      </Button>
    </Form>
  );
};
export default FormRegister;
