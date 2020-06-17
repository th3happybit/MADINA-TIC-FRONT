import React from "react";
import { Form, Input, Message } from "semantic-ui-react";

const InfosForm = (props) => {
  const {
    isShow,
    first_name,
    last_name,
    email,
    phone,
    address,
    birthday,
    handleInputChange,
    isErr,
  } = props;

  return (
    <>
      {typeof first_name !== "undefined" && (
        <Form error={isErr} className="_margin_vertical_lg">
          <Form.Group widths="equal">
            <Form.Field
              disabled={!isShow}
              id="first_name"
              control={Input}
              label="Prénom"
              placeholder="Prénom"
              value={first_name}
              onChange={handleInputChange}
            />

            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={last_name}
              id="last_name"
              control={Input}
              label="Nom"
              placeholder="Nom"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              id="email"
              control={Input}
              value={email}
              label="Email"
              placeholder="Email"
            />
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={birthday}
              id="birthday"
              control={Input}
              label="Anniversaire"
              placeholder="Anniversaire"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={address}
              id="address"
              control={Input}
              label="Adresse"
              placeholder="Adresse"
            />
            <Form.Field
              onChange={handleInputChange}
              disabled={!isShow}
              value={phone}
              id="phone"
              control={Input}
              label="Numéro de téléphone"
              placeholder="Numéro de téléphone"
            />
          </Form.Group>

          <Message
            error
            content={
              first_name &&
              first_name.length > 0 &&
              last_name.length > 0 &&
              address.length > 0 &&
              email.length > 0 &&
              birthday.length > 0 &&
              phone.length > 0
                ? "Veuillez vous assurer que toutes les données sont valides"
                : "Toutes les entrées sont nécessaires pour mettre à jour le profil"
            }
          />
        </Form>
      )}
    </>
  );
};
export default InfosForm;
