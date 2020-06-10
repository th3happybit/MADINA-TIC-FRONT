import React, { useState, useEffect } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";

import axios from "axios";

import ValidationDataUpdateProfile from "../../methods/ValidateDataUpdateProfile.js";

const InfosForm = (props) => {
  const { cit_infos, loading, service, token } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isEditing, setEditing] = useState(true);
  const [error, seterror] = useState(null);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [birthday, setbirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [national_id, setnational_id] = useState("");
  const [errorMessage, seterrorMessage] = useState(null);

  useEffect(() => {
    setfirst_name(cit_infos.first_name);
    setlast_name(cit_infos.last_name);
    setbirthday(cit_infos.date_of_birth);
    setaddress(cit_infos.address);
    setnational_id(cit_infos.national_id);
    setPhone(cit_infos.phone);
    setEmail(cit_infos.email);
  }, [cit_infos]);
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
        setaddress(e.currentTarget.value);
        break;
      case "national_id":
        setnational_id(e.currentTarget.value);
        break;
      default:
        break;
    }
  };
  const handleSumbit = () => {
    if (error) seterror(null);
    if (success) setSuccess(null);
    if (errorMessage) seterrorMessage(null);

    const errors = ValidationDataUpdateProfile({
      first_name,
      last_name,
      email,
      birthday,
      address,
      phone,
      national_id,
    });
    if (errors.length > 0) {
      seterror(true);
      seterrorMessage(errors[0].error);
    } else {
      UpdateInfosCitoyen();
    }
  };
  const UpdateInfosCitoyen = () => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: "https://www.madina-tic.ml/api/user/",
        method: "patch",
        data: {
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          date_of_birth: birthday,
          address: address,
          national_id: national_id,
        },
      })
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
        handelEditClick();
        props.refresh(token);
      })
      .catch((err) => {
        seterror(true);
        seterrorMessage("Something went wrong during your request.");
        setIsLoading(false);
      });
  };
  const handelEditClick = () => {
    if (email !== cit_infos.email) setEmail(cit_infos.email);
    if (first_name !== cit_infos.first_name)
      setfirst_name(cit_infos.first_name);
    if (last_name !== cit_infos.last_name) setlast_name(cit_infos.last_name);
    if (national_id !== cit_infos.national_id)
      setnational_id(cit_infos.national_id);
    if (birthday !== cit_infos.date_of_birth)
      setbirthday(cit_infos.date_of_birth);
    if (address !== cit_infos.address) setaddress(cit_infos.address);
    if (phone !== cit_infos.phone) setPhone(cit_infos.phone);
    if (error) seterror(false);
    setEditing((prevState) => !prevState);
  };
  return (
    <Form
      loading={loading}
      success={success}
      error={error}
      id="iform"
      className="_margin_vertical_lg"
    >
      <Form.Group widths="equal">
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>First Name</label>
          <Input
            fluid
            placeholder={"First Name..."}
            id="first_name"
            value={first_name}
            onChange={handleChangeInput}
          />
        </Form.Field>
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Last Name</label>
          <Input
            fluid
            id="last_name"
            value={last_name}
            onChange={handleChangeInput}
            placeholder={"Last Name..."}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Email</label>
          <Input
            fluid
            id="email"
            value={email}
            onChange={handleChangeInput}
            placeholder={"Email ..."}
          />
        </Form.Field>
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Address</label>
          <Input
            fluid
            id="address"
            value={address}
            onChange={handleChangeInput}
            placeholder={"Address ..."}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Phone Number</label>
          <Input
            fluid
            id="phone"
            value={phone}
            onChange={handleChangeInput}
            placeholder={"Phone number ..."}
          />
        </Form.Field>
        {!service && (
          <Form.Field required={!isEditing} disabled={isEditing}>
            <label>Birthday</label>
            <Input
              fluid
              id="birthday"
              type="date"
              value={birthday}
              onChange={handleChangeInput}
              placeholder={"Birthday..."}
            />
          </Form.Field>
        )}
      </Form.Group>
      {!service && (
        <Form.Group>
          <Form.Field disabled={isEditing}>
            <label>National ID</label>
            <Input
              fluid
              id="national_id"
              value={national_id}
              onChange={handleChangeInput}
              placeholder={"National ID ..."}
            />
          </Form.Field>
        </Form.Group>
      )}
      {!isEditing && (
        <div className="_margin_vertical_md subs">
          <Button
            className="button_secondary"
            disabled={isLoading}
            onClick={handelEditClick}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSumbit}
            loading={isLoading}
            className="button_primary"
          >
            Save
          </Button>
        </div>
      )}
      {isEditing && (
        <div className="subs">
          <Button onClick={handelEditClick} className="button_primary">
            Edit
          </Button>
        </div>
      )}
      <Message error content={errorMessage} />
      <Message
        success
        content="Your infos update request has been sent successfully"
      />
    </Form>
  );
};

export default InfosForm;
