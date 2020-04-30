import React, { useState } from "react";
import { Segment, Form, Dropdown, Button } from "semantic-ui-react";

import "./AdminAddAccountForm.css";

const AdminAddAccountForm = () => {
  const options = [
    { key: "m", value: "maire", text: "Maire" },
    { key: "s", value: "service", text: "Service" },
    { key: "c", value: "client", text: "Client" },
  ];
  const [selectedRole, setSelectedRole] = useState("");
  const handleChangeRole = (e, { value }) => {
    setSelectedRole(value);
  };
  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "email":
        break;
      case "address":
        break;
      case "phone":
        break;
      case "password":
        break;
      default:
        break;
      //TODO fetch api of post /api/users/
    }
  };

  return (
    <div className="profile_seg ">
      <p className="extra-text text-active bold">Add Account</p>
      <Segment className="border-none shadow">
        <div className="seg_no_border">
          <div className="add_account_container">
            <Form>
              <div className="input_with_label">
                <label htmlFor="email">Email</label>
                <Form.Input
                  placeholder="Email"
                  size="big"
                  type="text"
                  id="email"
                />
              </div>

              <div className="input_with_label">
                <label htmlFor="phone">Phone Number</label>
                <Form.Input
                  size="big"
                  type="text"
                  id="phone"
                  placeholder="Phone"
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="address">Address</label>
                <Form.Input
                  placeholder="Address"
                  size="big"
                  type="text"
                  id="address"
                />
              </div>
              <div className="input_with_label">
                <label htmlFor="password">Password</label>
                <Form.Input
                  placeholder="Password"
                  size="big"
                  type="password"
                  id="password"
                />
              </div>
              <div className="input_with_label border-b">
                <label htmlFor="confirm_password">Confirm Password</label>
                <Form.Input
                  placeholder="Confirm password"
                  size="big"
                  type="password"
                  id="confirm_password"
                />
              </div>
            </Form>
          </div>
          <div className="col">
            <div className="input_with_label role _padding_vertical_lg">
              <p>Assign Role</p>
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
            </div>
            <div className="input_with_label role _padding_vertical_lg">
              <p>Functionnalities</p>
              <Dropdown
                placeholder="Functionnalities"
                fluid
                multiple
                selection
                options={options}
              />
            </div>
          </div>
        </div>
        <div className="_add_account_admin_btn">
          <Button className="button_primary">Add</Button>
        </div>
      </Segment>
    </div>
  );
};
export default AdminAddAccountForm;
