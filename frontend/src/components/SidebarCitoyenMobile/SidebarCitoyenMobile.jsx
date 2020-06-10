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
        url: "https://www.madina-tic.ml/api/logout/",
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
            to="/home"
            className={
              props.active === "home"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            {props.isFrench ? "Accueil" : "الصفحة الرئيسية"}
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/add/declaration"
            className={
              props.active === "declaration"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Add declaration
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/citoyen/declaration"
            className={
              props.active === "declaration"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            {props.isFrench ? "déclarations" : "تصريحات"}
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
            {props.isFrench ? "annonces" : "إعلانات"}
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
            {props.isFrench ? "Notifications" : "إشعارات"}
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
