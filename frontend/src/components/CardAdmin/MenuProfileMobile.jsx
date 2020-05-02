import React from "react";
import { Menu, Input, Form, Message } from "semantic-ui-react";

const MenuProfileMobile = (props) => {
  const {
    email,
    phone,
    address,
    birthday,
    handleInputChange,
    activeItem,
    isErr,
    handleItemClick,
    password,
    newPassword,
    confirmPassword,
    messageErr,
  } = props;

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
              id="birthday"
              value={birthday}
              onChange={handleInputChange}
              placeholder="birthday"
            />
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              id="address"
              placeholder="address"
              value={address}
              onChange={handleInputChange}
            />
            <Input
              className="_profile_input_admin_mobile"
              type="text"
              value={phone}
              id="phone"
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
        <Form error={isErr}>
          <div className="col_mobile">
            <Input
              className="_profile_input_admin_mobile"
              type="password"
              id="password"
              onChange={handleInputChange}
              value={password}
              placeholder="Current password"
            />
            <Input
              className="_profile_input_admin_mobile"
              type="password"
              placeholder="New password"
              id="new_password"
              onChange={handleInputChange}
              value={newPassword}
            />
            <Input
              className="_profile_input_admin_mobile"
              type="password"
              id="confirm_password"
              onChange={handleInputChange}
              value={confirmPassword}
              placeholder="Confirm password"
            />
          </div>
          <Message error content={messageErr} />{" "}
        </Form>
      )}
    </div>
  );
};
export default MenuProfileMobile;
