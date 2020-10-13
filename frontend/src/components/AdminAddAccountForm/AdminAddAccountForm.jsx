import React, { useState } from "react";
import { Segment, Form, Button, Message } from "semantic-ui-react";
import Axios from "axios";

import "./AdminAddAccountForm.css";

const AdminAddAccountForm = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const handleChangeRole = (e, { value }) => {
    setSelectedRole(value);
  };

  const handleChange = (e, { id, value }) => {
    if (roleError) setRoleError(null);
    if (emailError) setEmailError(null);
    if (addressError) setAddressError(null);
    if (phoneError) setPhoneError(null);
    setSucces(false);
    setError(false);
    switch (id) {
      case "email":
        setMail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "first_name":
        setFirstName(value);
        break;
      default:
        break;
    }
  };

  const handleCreateAccount = () => {
    setIsLoading(true);
    Axios.create({
      headers: {
        post: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("admin_token")}`,
        },
      },
    })
      .request({
        url: "https://madina-tic.ml/api/users/",
        method: "post",
        data: {
          email,
          address,
          phone,
          role: selectedRole,
          first_name,
          last_name,
        },
      })
      .then((res) => {
        setSucces(true);
        setIsLoading(false);
        setMail("");
        setPhone("");
        setAddress("");
        setSelectedRole("");
        setFirstName("");
        setLastName("");
      })
      .catch((err) => {
        setIsLoading(false);
        Object.entries(err.response.data).map((element) => {
          switch (element[0]) {
            case "email":
              setEmailError(element[1][0]);
              break;
            case "phone":
              setPhoneError(element[1][0]);
              break;
            case "address":
              setAddressError(element[1][0]);
              break;
            case "role":
              setRoleError("Veuillez choisir un role");
              break;
            default:
              break;
          }
          return true;
        });
        setError(true);
      });
  };
  return (
    <div className="profile_seg ">
      <p className="extra-text text-active bold">Ajouter un compte</p>
      <Segment className="border-none shadow">
        <div className="seg_no_border">
          <div className="add_account_container">
            <Form success={succes} error={error}>
              <div className="input_with_label">
                <label htmlFor="email">Email</label>
                <Form.Input
                  error={emailError}
                  placeholder="Email"
                  size="big"
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="phone">Numero telephone</label>
                <Form.Input
                  error={phoneError}
                  size="big"
                  type="text"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="address">Adresse</label>
                <Form.Input
                  error={addressError}
                  placeholder="Address"
                  size="big"
                  type="text"
                  id="address"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="first_name">Nom</label>
                <Form.Input
                  placeholder="First name"
                  size="big"
                  type="text"
                  id="first_name"
                  value={first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="last_name">Prenom</label>
                <Form.Input
                  placeholder="Last name"
                  size="big"
                  type="text"
                  id="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="_succes_add">
                <Message success content="Compte ajouté avec succée" />
              </div>
            </Form>
          </div>
          <div
            className="col"
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div className="input_with_label role _padding_vertical_lg">
              <p>Donner un Rôle</p>
              <Form error={roleError !== null}>
                <Form.Group inline className="select_box text-default">
                  <Form.Radio
                    className="text-default"
                    label="Maire"
                    value="Maire"
                    checked={selectedRole === "Maire"}
                    onClick={handleChangeRole}
                  />
                  <Form.Radio
                    className="text-default"
                    label="Service"
                    value="Service"
                    checked={selectedRole === "Service"}
                    onClick={handleChangeRole}
                  />
                </Form.Group>
                <Message error className="role_err">
                  <span
                    style={{
                      padding: "0",
                    }}
                  >
                    {roleError}{" "}
                  </span>
                </Message>
              </Form>
            </div>
          </div>{" "}
        </div>

        <div className="_add_account_admin_btn">
          <Button
            loading={isLoading}
            className="button_primary"
            onClick={handleCreateAccount}
          >
            Confirmer
          </Button>
        </div>
      </Segment>
    </div>
  );
};
export default AdminAddAccountForm;
