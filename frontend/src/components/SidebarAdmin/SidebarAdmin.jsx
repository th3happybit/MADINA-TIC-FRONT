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
import { Link } from "react-router-dom";

const SidebarAdmin = (props) => {
  return (
    <div className="_sidebar_admin">
      <div className="row">
        <Link to="/admin" style={{ width: "100%" }}>
          <div className="part_top pointer">
            <Logo className="logo_h" />
            <p className="extra-text text-active">MADINA TIC</p>
          </div>
        </Link>
        <Menu text vertical>
          <div className="d-flex">
            <Dashboard
              className={
                props.active === "dashboard"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/admin/dashboard"
              name="Dashboard"
              className={props.active === "dashboard" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Roles
              className={
                props.active === "roles"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              name="Rôles"
              className={props.active === "roles" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Citoyens
              className={
                props.active === "citoyens"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              name="Citoyens"
              className={props.active === "citoyens" ? "active" : ""}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
};
export default SidebarAdmin;
