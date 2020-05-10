import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";
import { useHistory } from "react-router";
import axios from "axios";
import "./SidebarCitoyenMobile.css";

const SidebarCitoyenMobile = (props) => {
  const { fullname, image } = props;
  const history = useHistory();

  const handleLogout = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.clear();
        return history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={props.visible ? "_sidebar citoyen active" : "_sidebar citoyen"}
    >
      <div className="profile_citoyen_mobile_x">
        <Image src={image} />
        <p>{fullname}</p>
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
        <p
          className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default SidebarCitoyenMobile;
