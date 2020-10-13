import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Radio } from "semantic-ui-react";
import { useHistory } from "react-router";
import axios from "axios";
import "./SidebarCitoyenMobile.css";
import Avatar from "../../assets/images/avatar.png";

const SidebarCitoyenMobile = (props) => {
  const { fullname, image, isDark } = props;
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
        url: "https://madina-tic.ml/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.clear();
        return history.push("/login");
      })
      .catch((err) => {});
  };
  return (
    <div
      className={
        props.visible
          ? `_sidebar citoyen active ${isDark ? "dark" : ""} ${
              props.isFrench ? "" : "rtl"
            }`
          : `_sidebar citoyen ${isDark ? "dark" : ""} ${
              props.isFrench ? "" : "rtl"
            }`
      }
    >
      <Link to="/citoyen/profile">
        <div className="profile_citoyen_mobile_x">
          <Image src={image ? image : Avatar} />
          <p style={{ color: !isDark ? "black" : "var(--primary_text_dark)" }}>
            {fullname}
          </p>
        </div>
      </Link>
      <List className={`_sidebar_list ${props.isFrench ? "" : "rtl"}`}>
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
          <Link to="/add/declaration" className={"medium-text text-default"}>
            {props.isFrench ? "Ajouter déclaration" : "إضافة تصريح"}
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
            {props.isFrench ? "déclarations" : "التصريحات"}
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/home/annonce"
            className={
              props.active === "annonce"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            {props.isFrench ? "annonces" : "الإعلانات"}
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/citoyen/commune"
            className={
              props.active === "commune"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            {props.isFrench ? "commune" : "البلدية"}
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/citoyen/profile"
            className={
              props.active === "profile"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            {props.isFrench ? "Compte" : "الحساب"}
          </Link>
        </List.Item>
        <List.Item className="_dark_trigger">
          <p>{props.isFrench ? "Mode Sombre" : "الوضع المظلم"}</p>
          <Radio toggle checked={props.isDark} onClick={props.change_mode} />
        </List.Item>
      </List>
      <div className="_logout_header _margin_vertical_sm">
        <p
          className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg pointer"
          onClick={handleLogout}
        >
          {props.isFrench ? "Déconnecter" : "الخروج"}
        </p>
      </div>
    </div>
  );
};

export default SidebarCitoyenMobile;
