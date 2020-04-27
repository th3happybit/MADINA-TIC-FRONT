import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";

//? import css
import "./AdminEditProfile.css";

//? import components
import PasswordForm from "./PasswordForm.jsx";
import InfosForm from "./InfosForm.jsx";

const AdminEditProfile = () => {
  //? for the active item of the menu ... by the default the info is the active one
  const [activeItem, setActiveItem] = useState("info");

  //? change the active element of the menu on clicking
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
          {activeItem === "info" && <InfosForm />}
          {activeItem === "password" && <PasswordForm />}
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
