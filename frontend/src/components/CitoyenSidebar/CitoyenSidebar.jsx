import React from "react";
import { Icon, List } from "semantic-ui-react";

import "./CitoyenSidebar.css";
const CitoyenSidebar = (props) => {
  return (
    <div className="_citoyen_sidebar">
      <a href="/add/declaration" className="add_declaration pointer">
        <Icon name="add" size="large" />
        <p>Add declaration</p>
      </a>
      <List className="sidebar_list_cit">
        <List.Item className={ props.active === "home" ? "active" : ""}>
          <List.Icon name="home" />
          <List.Content>Home</List.Content>
        </List.Item>
        <List.Item className={ props.active === "declaration" ? "active file text" : "file text"}>
          <List.Icon name="file alternate" />
          <List.Content>Declarations</List.Content>
        </List.Item>
        <List.Item className={ props.active === "announcement" ? "active" : ""}>
          <List.Icon name="bullhorn" />
          <List.Content>Annoncement</List.Content>
        </List.Item>
      </List>
    </div>
  );
};

export default CitoyenSidebar;
