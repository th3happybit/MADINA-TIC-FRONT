import React from "react";
import { Icon, List } from "semantic-ui-react";

import "./CitoyenSidebar.css";
const CitoyenSidebar = () => {
  return (
    <div className="_citoyen_sidebar">
      <a href="/add/declaration" className="add_declaration pointer">
        <Icon name="add" size="large" />
        <p>Add declaration</p>
      </a>
      <List className="sidebar_list_cit">
        <List.Item className="active">
          <List.Icon name="home" />
          <List.Content>Home</List.Content>
        </List.Item>
        <List.Item className="file text">
          <List.Icon name="file alternate" />
          <List.Content>Declarations</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="bullhorn" />
          <List.Content>Annoncement</List.Content>
        </List.Item>
      </List>
    </div>
  );
};

export default CitoyenSidebar;
