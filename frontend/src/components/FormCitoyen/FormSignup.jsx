import React, { useState } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import axios from "axios";

const FormRegister = () => {
  //? for loading while post request
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [birthday, setbirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [addrress, setaddrres] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //? for errors...
  const [emailError, setEmailError] = useState(null);
  const [first_nameError, setfirst_nameError] = useState(null);
  const [last_nameError, setlast_nameError] = useState(null);
  const [dateError, setdateError] = useState(null);
  const [addressError, setAddressErr] = useState(null);
  const [phoneError, setphoneError] = useState(null);
  const [passwordErr, setpasswordErr] = useState(null);
  //? for messages errors
  const [emailMessage, setEmailMessage] = useState("");
  const [birthdayMessage, setBirthdayMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [firstNameMessage, setFirstNameMessage] = useState("");
  const [lastNameMessage, setLastNameMessage] = useState("");
  //? function for changing data in inputs
  const handleChangeInput = (e) => {
    if (success) setSuccess(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "first_name":
        first_nameError && setfirst_nameError(null);
        setfirst_name(e.currentTarget.value);
        break;
      case "last_name":
        setlast_name(e.currentTarget.value);
        last_nameError && setlast_nameError(null);
        break;
      case "email":
        emailError && setEmailError(null);
        setEmail(e.currentTarget.value);
        break;
      case "birthday":
        dateError && setdateError(null);
        setbirthday(e.currentTarget.value);
        break;
      case "phone":
        phoneError && setphoneError(null);
        setPhone(e.currentTarget.value);
        break;
      case "address":
        addressError && setAddressErr(null);
        setaddrres(e.currentTarget.value);
        break;
      case "password":
        passwordErr && setpasswordErr(null);
        setPassword(e.currentTarget.value);
        break;
      case "confirm_password":
        passwordErr && setpasswordErr(null);
        setConfirmPassword(e.currentTarget.value);
        break;
      default:
        break;
    }
  };
  const checkPhoneNumber = (phone) => {
    const phonePattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/;
    return phonePattern.test(String(phone));
  };
  const checkDate = (date) => {
    if (!date) return false;
    let dateArray = date.split("-");
    let dt = new Date();
    return dt.getFullYear() - dateArray[0] >= 18;
  };
  //? function called when user submit the form
  const handleSumbit = () => {
    if (success) setSuccess(null);
    if (addrress.length <= 4 && addrress.length > 0) {
      setAddressErr(true);
    }
    if (!checkPhoneNumber(phone) && phone.length > 0) {
      setphoneError(true);
    } else if (birthday.length === 0) {
      RegisterUser();
    } else if (!checkDate(birthday)) {
      setdateError(true);
    } else {
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
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response)
          Object.entries(err.response.data).map((element) => {
            switch (element[0]) {
              case "email":
                setEmailError(true);
                setEmailMessage(element[1]);
                break;
              case "password1":
                setpasswordErr(true);
                setPasswordMessage(element[1]);
                break;
              case "password2":
                setpasswordErr(true);
                setPasswordMessage(element[1]);
                break;
              case "non_field_errors":
                setpasswordErr(true);
                setPasswordMessage(element[1]);
                break;
              case "first_name":
                setfirst_nameError(true);
                setFirstNameMessage(element[1]);
                break;
              case "last_name":
                setlast_nameError(true);
                setLastNameMessage(element[1]);
                break;
              case "phone":
                setphoneError(true);
                setPhoneMessage(element[1]);
                break;
              case "date_of_birth":
                if (!dateError) setdateError(true);
                if (!dateError) setBirthdayMessage(element[1]);
                break;
              case "address":
                setAddressErr(true);
                setAddressMessage(element[1]);
                break;
              default:
                break;
            }
            return true;
          });
        setIsLoading(false);
      });
  };
  return (
    <Form
      success={success}
      className="_citoyen_login_form signup _margin_vertical_sm"
    >
      <Form.Group>
        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <Form.Input
            value={first_name}
            id="first_name"
            placeholder="First Name"
            type="text"
            size="large"
            className={
              first_nameError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
            onChange={handleChangeInput}
          />
          {first_nameError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
              {firstNameMessage}
            </p>
          )}
        </div>
        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <Form.Input
            value={last_name}
            id="last_name"
            placeholder="Last Name"
            type="text"
            size="large"
            className={
              last_nameError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
            onChange={handleChangeInput}
          />
          {last_nameError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
              {lastNameMessage}
            </p>
          )}
        </div>
      </Form.Group>
      <Form.Group
        style={{
          width: "100%",
          margin: "0",
        }}
        className="special_email"
      >
        <div
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <Form.Input
            value={email}
            id="email"
            placeholder="Email"
            type="text"
            size="large"
            className={
              emailError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
            style={{
              padding: "0",
            }}
            onChange={handleChangeInput}
          />
          {emailError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
              {emailMessage}
            </p>
          )}
        </div>
      </Form.Group>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Form.Input
          value={birthday}
          id="birthday"
          placeholder="Birthday"
          type="date"
          size="large"
          className={
            dateError
              ? "input_err _margin_vertical_sm small"
              : "_margin_vertical_sm small"
          }
          onChange={handleChangeInput}
        />
        {dateError && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {birthday.length === 0 && birthdayMessage}
            {birthday.length > 0 &&
              !checkDate(birthday) &&
              "You are not a major person to have an account."}
          </p>
        )}
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Form.Input
          value={phone}
          id="phone"
          placeholder="Phone Number"
          type="text"
          size="large"
          className={
            phoneError
              ? "input_err _margin_vertical_sm small"
              : "_margin_vertical_sm small"
          }
          onChange={handleChangeInput}
        />
        {phoneError && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {checkPhoneNumber(phone)
              ? phoneMessage
              : "Please enter a valid phone number"}
          </p>
        )}
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Form.Input
          value={addrress}
          id="address"
          placeholder="Address"
          type="text"
          size="large"
          className={
            addressError
              ? "input_err _margin_vertical_sm small"
              : "_margin_vertical_sm small"
          }
          onChange={handleChangeInput}
        />
        {addressError && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {addrress.length > 4
              ? addressMessage
              : "Please enter a valid address"}
          </p>
        )}
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Form.Input
          value={password}
          id="password"
          placeholder="Password"
          type="password"
          size="large"
          className={
            passwordErr
              ? "input_err _margin_vertical_sm small"
              : "_margin_vertical_sm small"
          }
          onChange={handleChangeInput}
        />
        {passwordErr && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {passwordMessage}
          </p>
        )}
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Form.Input
          onChange={handleChangeInput}
          value={confirmPassword}
          id="confirm_password"
          placeholder="Confirm Password"
          type="password"
          size="large"
          className={
            passwordErr
              ? "input_err _margin_vertical_sm small"
              : "_margin_vertical_sm small"
          }
        />{" "}
        {passwordErr && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {passwordMessage}
          </p>
        )}
      </div>
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
