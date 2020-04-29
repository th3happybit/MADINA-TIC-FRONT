import React, { useState } from "react";
import { Menu, Input, Form, Message } from "semantic-ui-react";

const MenuProfileMobile = (props) => {
  const { email, phone, address, birthday, handleInputChange, isErr } = props;
  const [activeItem, setActiveItem] = useState("info");
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };
  return (
    <div className="row mobile_menu">
      <Menu pointing secondary>
        <Menu.Item
          name="Update Infos"
          data-name="info"
          active={activeItem === "info"}
          onClick={handleItemClick}
          className="pointer"
        />
        <Menu.Item
          name="Update Password"
          data-name="password"
          className="pointer"
          active={activeItem === "password"}
          onClick={handleItemClick}
        />
      </Menu>
      {activeItem === "info" && (
        <Form error={isErr}>
          <div className="col_mobile">
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
            />
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              value={birthday}
              onChange={handleInputChange}
              placeholder="birthday"
            />
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              placeholder="address"
              value={address}
              onChange={handleInputChange}
            />
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              value={phone}
              placeholder="phone"
              onChange={handleInputChange}
            />
            <Input
              onChange={handleInputChange}
              className="_profile_input_admin_mobile"
              type="text"
              placeholder="facebook link"
              value="www.facebook.com"
            />
            <Input
              onChange={handleInputChange}
              className="_profile_input_admin_mobile"
              type="text"
              placeholder="google link"
              value="www.google.com"
            />
          </div>
          <Message
            error
            content="All the inputs are required to update the profile"
          />{" "}
        </Form>
      )}
      {activeItem === "password" && (
        <div className="col_mobile">
          <Input
            className="_profile_input_admin_mobile"
            type="password"
            placeholder="Current password"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="password"
            placeholder="New password"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="password"
            placeholder="Confirm password"
          />
        </div>
      )}
    </div>
  );
};
export default MenuProfileMobile;
