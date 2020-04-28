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
            className="_profile_input_admin_mobile"
            type="text"
            value="s.admin@esi-sba.dz"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="text"
            value="01/02/1999"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="text"
            value="Cité 300 logts, n 400"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="text"
            value="+213 566842544"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="text"
            value="www.facebook.com"
          />
          <Input
            className="_profile_input_admin_mobile"
            type="text"
            value="www.google.com"
          />
        </div>
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
