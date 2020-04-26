import React from "react";
import { Menu } from "semantic-ui-react";

//? import css
import "./SidebarAdmin.css";

//? import icons
import { ReactComponent as Dashboard } from "../../assets/icons/dashboard.svg";
import { ReactComponent as Roles } from "../../assets/icons/role_icon.svg";
import { ReactComponent as Citoyens } from "../../assets/icons/group.svg";

//? import logo
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

const SidebarAdmin = () => {
  return (
    <div className="_sidebar_admin">
      <div className="row">
        <div className="part_top">
          <Logo className="logo_h" />
          <p className="extra-text text-active">MADINA TIC</p>
        </div>
        <Menu text vertical>
          <div className="d-flex">
            <Dashboard className="_sidebar_icons active" />
            <Menu.Item name="Dashboard" className="active" />
          </div>
          <div className="d-flex">
            <Roles className="_sidebar_icons" />
            <Menu.Item name="Rôles" />
          </div>
          <div className="d-flex">
            <Citoyens className="_sidebar_icons" />
            <Menu.Item name="Citoyens" />
          </div>
        </Menu>
      </div>
    </div>
  );
};
export default SidebarAdmin;
