import React from "react";
import { List } from "semantic-ui-react";
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
        url: "http://157.230.19.233/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.removeItem("maire_token");
        return history.push("/maire/login");
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const { visible } = props;
  return (
    <div className={visible ? "_sidebar active" : "_sidebar"}>
      <Toggle className="_header_logo pointer" onClick={props.click} />
      <List className="_sidebar_list">
        <List.Item>
          <Link
            to="/maire/dashboard"
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
            to="/maire/declaration/"
            className={
              props.active === "declarations"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Declarations
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/maire/announce"
            className={
              props.active === "announce"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Annoucements
          </Link>
        </List.Item>
        <List.Item>
          <a
            href="/citoyen/profile"
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
            to="/maire/notifications"
            className={
              props.active === "notifications"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Notifications
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
