import React, { useState } from "react";
import { Menu, Form, Input, Button } from "semantic-ui-react";

//? import css
import "./AdminEditProfile.css";

const AdminEditProfile = () => {
  const [activeItem, setActiveItem] = useState("info");
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };
  return (
    <div className="_admin_edit_profile">
      <div className="_info_menu">
        <Menu pointing secondary>
          <Menu.Item
            data-name="info"
            name="Update Infos"
            active={activeItem === "info"}
            onClick={handleItemClick}
          />
          <Menu.Item
            data-name="password"
            name="Update Password"
            active={activeItem === "password"}
            onClick={handleItemClick}
          />
        </Menu>
        <div className="_form_profile_informations">
          {activeItem === "info" && (
            <Form className="_margin_vertical_lg">
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-first-name"
                  control={Input}
                  label="First name"
                  placeholder="First name"
                />
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  label="Last name"
                  placeholder="Last name"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-email"
                  control={Input}
                  label="Email"
                  placeholder="Email"
                />
                <Form.Field
                  id="form-input-control-birthday"
                  control={Input}
                  label="Birthday"
                  placeholder="Birthday"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-address"
                  control={Input}
                  label="Address"
                  placeholder="Address"
                />
                <Form.Field
                  id="form-input-control-phone"
                  control={Input}
                  label="Phone Number"
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  id="form-input-control-fcb"
                  control={Input}
                  label="Facebok link"
                  placeholder="Facebok link"
                />
                <Form.Field
                  id="form-input-control-google"
                  control={Input}
                  label="Google link"
                  placeholder="Google link"
                />
              </Form.Group>
            </Form>
          )}
          {activeItem === "password" && (
            <Form className="_margin_vertical_lg">
              <Form.Group className="_form_password">
                <Form.Input
                  type="texte"
                  label="Current Password"
                  placeholder="Current Password"
                />
              </Form.Group>{" "}
              <Form.Group className="_form_password">
                <Form.Input
                  type="texte"
                  label="New Password"
                  placeholder="New Password"
                />
              </Form.Group>{" "}
              <Form.Group className="_form_password">
                <Form.Input
                  type="texte"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                />
              </Form.Group>{" "}
            </Form>
          )}
          <div className="_button_edit_profile">
            <Button className="button_secondary ">Cancel</Button>
            <Button className="button_primary ">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminEditProfile;
