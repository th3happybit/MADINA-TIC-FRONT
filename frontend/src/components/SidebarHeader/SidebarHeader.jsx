import React from "react";
import { List } from "semantic-ui-react";
import "./SidebarHeader.css";
import SearchInput from "../SearchInput/SearchInput.jsx";

//? import toggle
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

const SidebarHeader = (props) => {
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
        <a
          href="/login"
          className="_logout_button_header _margin_horizontal_md  button_primary  medium-text border-radius-bg"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default SidebarHeader;
