import React, { useState } from "react";
import { Segment, Form, Dropdown, Button, Message } from "semantic-ui-react";
import Axios from "axios";

import "./AdminAddAccountForm.css";

const AdminAddAccountForm = () => {
  const options = [
    { key: "m", value: "maire", text: "Maire" },
    { key: "s", value: "service", text: "Service" },
    { key: "c", value: "client", text: "Client" },
  ];
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [functionnalities, setF] = useState(null);
  const [succes, setSucces] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [roleError, setRoleError] = useState(null);

  const handleChangeRole = (e, { value }) => {
    setSelectedRole(value);
  };

  const handleChange = (e, { id, value }) => {
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
      default:
        break;
    }
  };
  const handleFunctions = (e, { value }) => {
    setF(value);
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
        url: "http://13.92.195.8/api/users/",
        method: "post",
        data: {
          email,
          address,
          phone,
          role: selectedRole,
        },
      })
      .then((res) => {
        setSucces(true);
        setIsLoading(false);
        setMail("");
        setPhone("");
        setAddress("");
        setSelectedRole("");
        setF([]);
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
              setRoleError(element[1][0]);
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
      <p className="extra-text text-active bold">Add Account</p>
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
                <label htmlFor="phone">Phone Number</label>
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
                <label htmlFor="address">Address</label>
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
              <div className="_succes_add">
                <Message success content="Congrats ,account added" />
              </div>
            </Form>
          </div>
          <div className="col">
            <div className="input_with_label role _padding_vertical_lg">
              <p>Assign Role</p>
              <Form error={roleError !== null}>
                <Form.Group inline className="select_box">
                  <Form.Radio
                    label="Client"
                    value="Client"
                    checked={selectedRole === "Client"}
                    onClick={handleChangeRole}
                  />
                  <Form.Radio
                    label="Maire"
                    value="Maire"
                    checked={selectedRole === "Maire"}
                    onClick={handleChangeRole}
                  />
                  <Form.Radio
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
            <div className="input_with_label role _padding_vertical_lg">
              <p>Functionnalities</p>
              <Dropdown
                placeholder="Functionnalities"
                fluid
                multiple
                selection
                onChange={handleFunctions}
                options={options}
                value={functionnalities}
              />
            </div>
          </div>{" "}
        </div>

        <div className="_add_account_admin_btn">
          <Button
            loading={isLoading}
            className="button_primary"
            onClick={handleCreateAccount}
          >
            Add
          </Button>
        </div>
      </Segment>
    </div>
  );
};
export default AdminAddAccountForm;
