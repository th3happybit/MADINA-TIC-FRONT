import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

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
      </div>
    </div>
  );
};
export default AdminEditProfile;
