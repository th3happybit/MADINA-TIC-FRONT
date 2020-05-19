import React from "react";
import { List } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

//? import toggle
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

const ServiceHeaderSideBar = (props) => {
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
        localStorage.removeItem("service_token");
        return history.push("/service/login");
      })
      .catch((err) => {
      });
  };
  const { visible } = props;
  return (
    <div className={visible ? "_sidebar active" : "_sidebar"}>
      <Toggle className="_header_logo pointer" onClick={props.click} />
      <List className="_sidebar_list">
        <List.Item>
          <Link
            to="/service/dashboard"
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
            to="/service/declaration/"
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
            to="/service/rapport"
            className={
              props.active === "rapport"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Rapports
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/service/announcement"
            className={
              props.active === "annonce"
                ? "medium-text text-default text-active"
                : "medium-text text-default"
            }
          >
            Rapports
          </Link>
        </List.Item>
        <List.Item>
          <Link
            to="/service/notifications"
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

export default ServiceHeaderSideBar;