import React from "react";
import { Icon, List } from "semantic-ui-react";

import "./CitoyenSidebar.css";
const CitoyenSidebar = (props) => {
  const { isDark } = props;

  return (
    <div
      className={`_citoyen_sidebar ${props.isFrench ? "" : "rtl"} ${
        isDark ? "dark" : ""
      }`}
    >
      <a href="/add/declaration" className="add_declaration pointer">
        <Icon name="add" size="large" />
        <p
          style={{
            fontWeight: "600",
          }}
        >
          {props.isFrench ? "Ajouter une déclaration" : "إضافة تصريح"}
        </p>
      </a>
      <List className="sidebar_list_cit">
        <List.Item
          className={props.active === "home" ? "active file text" : "file text"}
          as="a"
          href="/home"
        >
          <List.Icon name="home" />
          <List.Content>
            {props.isFrench ? "Accueil" : "الصفحة الرئيسية"}
          </List.Content>
        </List.Item>
        <List.Item
          as="a"
          href="/citoyen/declaration"
          className={
            props.active === "declaration" ? "active file text" : "file text"
          }
        >
          <List.Icon
            name="file alternate"
            className={props.active === "declaration" ? "active_ico" : ""}
          />
          <List.Content
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {props.isFrench ? "Mes déclarations" : "تصريحاتي"}
          </List.Content>
        </List.Item>
        <List.Item
          as="a"
          href="/citoyen/commune"
          className={
            props.active === "commune" ? "active file text" : "file text"
          }
        >
          <List.Icon
            name="university"
            className={props.active === "commune" ? "active_ico" : ""}
          />
          <List.Content
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {props.isFrench ? "Commune" : "البلدية"}
          </List.Content>
        </List.Item>
      </List>
    </div>
  );
};

export default CitoyenSidebar;
