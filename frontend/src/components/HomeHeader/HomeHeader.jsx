import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/images/logo_vectorized.svg";
import { ReactComponent as LogoI } from "../../assets/images/logo_inverted.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";
import Backdrop from "../Backdrop/Backdrop.jsx";

import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";
import "./HomeHeader.css";

const HomeHeader = () => {
  const [white, setWhite] = useState(true);
  const [visible, setVisible] = useState(false);

  const handle_visible = () => {
    setVisible((prevState) => !prevState);
  };

  window.onscroll = function () {
    window.pageYOffset > 75 ? setWhite(false) : setWhite(true);
  };

  const items = [
    { link: "#", text: "accueil" },
    { link: "#", text: "déclarations" },
    { link: "#", text: "contact" },
    { link: "/signup", text: "s'inscrire" },
    { link: "/login", text: "se connecter" },
  ];

  return (
    <header className={`_home_header ${!white ? "white" : ""}`}>
      {visible && <Backdrop onClick={handle_visible} />}
      <nav className="_home_nav">
        <Link className="pointer logo">
          {white ? <LogoI className="logo_h" /> : <Logo className="logo_h" />}
          <p className={`extra-text ${white ? "white-text" : "text-active"}`}>
            MADINA-TIC
          </p>
        </Link>
        <div className="_menu_area">
          {items.map((element) => {
            return (
              <Link to={element.link}>
                <p className={white ? "" : "black-text"}>{element.text}</p>
              </Link>
            );
          })}
        </div>
      </nav>
      <nav className="_mobile_nav">
        <div className="_header_sidebar">
          <div className="_toggle_home">
            <Toggle onClick={handle_visible} />
          </div>
          <div className="logo">
            {white ? <LogoI height="40px" /> : <Logo height="40px" />}
            <p className={`extra-text ${white ? "white-text" : "text-active"}`}>
              MADINA-TIC
            </p>
          </div>
        </div>
        <div className={`_home_sidebar ${visible ? "active" : ""}`}>
          <div className="_toggle_sidebar">
            <Toggle onClick={handle_visible} />
          </div>
          <List className="_sidebar_list">
            {items.map((element) => {
              return <Link className="text-default" to={element.link}>{element.text}</Link>;
            })}
          </List>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
