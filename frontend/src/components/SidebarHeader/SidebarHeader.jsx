import React from "react";
import { List } from "semantic-ui-react";
import "./SidebarHeader.css";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//? import toggle
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

const SidebarHeader = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/logout/",
        method: "post",
        // data: { email, password },
      })
      .then(() => {
        localStorage.setItem(("admin_token", ""));
        return history.push("/admin/login");
      })
      .catch((err) => {});
  };
  const download = () => {
    const link = document.createElement("a");
    link.href = "https://madina-tic.ml/api/download-csv-file/";
    link.click();
  };
  const { visible } = props;
  return (
    <div className={visible ? "_sidebar active" : "_sidebar"}>
      <Toggle className="_header_logo pointer" onClick={props.click} />
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
            Dashboard
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
            Citoyens
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
            Ajouter un compte
          </Link>
        </List.Item>
        <List.Item>
          <a
            href="/admin/profile"
            className={
              props.active === "profile"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Profile
          </a>
        </List.Item>{" "}
        <List.Item>
          <Link
            onClick={download}
            className={
              props.active === "notifications"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Télécharger données
          </Link>
        </List.Item>
      </List>
      <div className="_logout_header _margin_vertical_sm">
        <p
          onClick={handleLogout}
          className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg pointer"
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default SidebarHeader;
