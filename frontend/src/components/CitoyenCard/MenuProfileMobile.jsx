import React, { useState } from "react";
import { Menu, Input } from "semantic-ui-react";

const MenuProfileMobile = () => {
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
        <div className="col_mobile">
          <Input
            className="mobile-input"
            type="text"
            placeholder="Email ..."
          />
          <Input
            className="mobile-input"
            type="text"
            placeholder = "Birthday ..."
          />
          <Input
            className="mobile-input"
            type="text"
            placeholder="Address ..."
          />
          <Input
            className="mobile-input"
            type="text"
            placeholder = "Phone Number ..."
          />
          <Input
            className="mobile-input"
            type="text"
            placeholder = "National ID ..."
          />
        </div>
      )}
      {activeItem === "password" && (
        <div className="col_mobile">
          <Input
            className="mobile-input"
            type="password"
            placeholder="Current password"
          />
          <Input
            className="mobile-input"
            type="password"
            placeholder="New password"
          />
          <Input
            className="mobile-input"
            type="password"
            placeholder="Confirm password"
          />
        </div>
      )}
    </div>
  );
};
export default MenuProfileMobile;