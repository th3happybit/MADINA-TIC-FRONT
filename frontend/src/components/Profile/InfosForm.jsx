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

    const errors = !service
      ? ValidationDataUpdateProfile({
          first_name,
          last_name,
          email,
          birthday,
          address,
          phone,
          national_id,
        })
      : ValidationDataUpdateProfile({
          first_name,
          last_name,
          email,
          address,
          phone,
          national_id,
          service,
        });
    if (errors.length > 0) {
      seterror(true);
      seterrorMessage(errors[0].error);
    } else {
      UpdateInfosCitoyen();
    }
  };
  const UpdateInfosCitoyen = () => {
    const data = service
      ? {
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          address: address,
          national_id: national_id,
        }
      : {
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          address: address,
          national_id: national_id,
          date_of_birth : birthday
        };
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
        url: "https://madina-tic.ml/api/user/",
        method: "patch",
        data: data,
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
          <label>Prénom</label>
          <Input
            fluid
            id="first_name"
            value={first_name}
            onChange={handleChangeInput}
          />
        </Form.Field>
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Nom de famille</label>
          <Input
            fluid
            id="last_name"
            value={last_name}
            onChange={handleChangeInput}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Email</label>
          <Input fluid id="email" value={email} onChange={handleChangeInput} />
        </Form.Field>
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Adresse</label>
          <Input
            fluid
            id="address"
            value={address}
            onChange={handleChangeInput}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field required={!isEditing} disabled={isEditing}>
          <label>Numéro de téléphone</label>
          <Input fluid id="phone" value={phone} onChange={handleChangeInput} />
        </Form.Field>
        {!service && (
          <Form.Field required={!isEditing} disabled={isEditing}>
            <label>Anniversaire</label>
            <Input
              fluid
              id="birthday"
              type="date"
              value={birthday}
              onChange={handleChangeInput}
            />
          </Form.Field>
        )}
      </Form.Group>
      {!service && (
        <Form.Group>
          <Form.Field disabled={isEditing}>
            <label>carte d'identité</label>
            <Input
              fluid
              id="national_id"
              value={national_id}
              onChange={handleChangeInput}
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
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={handleSumbit}
            loading={isLoading}
            className="button_primary"
          >
            Sauvegarder
          </Button>
        </div>
      )}
      {isEditing && (
        <div className="subs">
          <Button onClick={handelEditClick} className="button_primary">
            Éditer
          </Button>
        </div>
      )}
      <Message error content={errorMessage} />
      <Message
        success
        content="Votre demande de mise à jour des informations a été envoyée avec succès"
      />
    </Form>
  );
};

export default InfosForm;
