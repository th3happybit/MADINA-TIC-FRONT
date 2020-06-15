import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./MaireSideBar.css";
import { ReactComponent as Dashboard } from "../../assets/icons/dashboard.svg";
import { ReactComponent as Reports } from "../../assets/icons/rapport_icon.svg";
import { ReactComponent as Declarations } from "../../assets/icons/Declarations.svg";
import { ReactComponent as Announcements } from "../../assets/icons/annonce_icon.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";

const MaireSideBar = (props) => {
  return (
    <div className="_sidebar_maire">
      <div className="row">
        <Link to="/maire/dashboard" style={{ width: "100%" }}>
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
              to="/maire/dashboard"
              name="Dashboard"
              className={props.active === "dashboard" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Declarations
              className={
                props.active === "declarations"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/maire/declaration"
              name="Declarations"
              className={props.active === "declarations" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Reports
              className={
                props.active === "rapports"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/maire/rapports/"
              name="Rapports"
              className={props.active === "rapports" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Announcements
              className={
                props.active === "announce"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/maire/announce/"
              name="Annonces"
              className={props.active === "announce" ? "active" : ""}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default MaireSideBar;
