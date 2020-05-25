import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./ServiceSideBar.css";
import { ReactComponent as Dashboard } from "../../assets/icons/dashboard.svg";
import { ReactComponent as Declarations } from "../../assets/icons/Declarations.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Rapport } from "../../assets/icons/rapport_icon.svg";
import { ReactComponent as Annonce } from "../../assets/icons/annonce_icon.svg";

const ServiceSideBar = (props) => {
  return (
    <div className="_sidebar_service">
      <div className="row">
        <Link to="/service" style={{ width: "100%" }}>
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
              to="/service/dashboard/"
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
              to="/service/declaration"
              name="Declarations"
              className={props.active === "declarations" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Rapport
              className={
                props.active === "rapports"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/service/rapports/"
              name="Rapports"
              className={props.active === "rapports" ? "active" : ""}
            />
          </div>
          <div className="d-flex">
            <Annonce
              className={
                props.active === "annonce"
                  ? "_sidebar_icons active"
                  : "_sidebar_icons"
              }
            />
            <Menu.Item
              as={Link}
              to="/service/annonce/"
              name="Announcement"
              className={props.active === "annonce" ? "active" : ""}
            />
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default ServiceSideBar;
