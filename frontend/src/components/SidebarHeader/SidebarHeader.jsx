import React from "react";
import { List } from "semantic-ui-react";
import "./SidebarHeader.css";
import SearchInput from "../SearchInput/SearchInput.jsx";
import axios from "axios";
import { useHistory } from "react-router";

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
        url: "http://13.92.195.8/api/logout/",
        method: "post",
        // data: { email, password },
      })
      .then(() => {
        localStorage.setItem(("admin_token", ""));
        return history.push("/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { visible } = props;
  return (
    <div className={visible ? "_sidebar active" : "_sidebar"}>
      <Toggle className="_header_logo pointer" onClick={props.click} />
      <List className="_sidebar_list">
        <List.Item>
          <SearchInput />
        </List.Item>
        <List.Item>
          <a href="/" className="medium-text text-default text-active">
            Dashboard
          </a>
        </List.Item>
        <List.Item>
          <a href="/" className="medium-text text-default ">
            Citoyens
          </a>
        </List.Item>
        <List.Item>
          <a href="/" className="medium-text text-default ">
            Rôles
          </a>
        </List.Item>
        <List.Item>
          <a href="/" className="medium-text text-default ">
            Profile
          </a>
        </List.Item>{" "}
        <List.Item>
          <a href="/" className="medium-text text-default">
            Notification
          </a>
        </List.Item>
      </List>
      <div className="_logout_header _margin_vertical_sm">
        <p
          onCLick={handleLogout}
          className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg"
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default SidebarHeader;
