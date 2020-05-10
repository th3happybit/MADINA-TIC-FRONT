import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

import "./SidebarCitoyenMobile.css";
import Alex from "../../assets/images/alex.jpg";

const SidebarCitoyenMobile = (props) => {
  return (
    <div
      className={props.visible ? "_sidebar citoyen active" : "_sidebar citoyen"}
    >
      <div className="profile_citoyen_mobile_x">
        <Image src={Alex} />
        <p>Bengoudifa Oussama</p>
      </div>
      <List className="_sidebar_list">
        <List.Item>
          <Link
            to="/admin/dashboard"
            className={
              props.active === "dashboard"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Home
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/admin/citoyen"
            className={
              props.active === "citoyens"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Declarations
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/admin/create/account"
            className={
              props.active === "account"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Annonces
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/admin/notifications"
            className={
              props.active === "notifications"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Notification
          </Link>
        </List.Item>
      </List>
      <div className="_logout_header _margin_vertical_sm">
        <p className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg pointer">
          Logout
        </p>
      </div>
    </div>
  );
};

export default SidebarCitoyenMobile;
