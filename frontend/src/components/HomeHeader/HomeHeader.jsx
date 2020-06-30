import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, Dropdown, Flag, Radio } from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/logo_vectorized.svg";
import { ReactComponent as LogoI } from "../../assets/images/logo_inverted.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";
import "./HomeHeader.css";
import Backdrop from "../Backdrop/Backdrop.jsx";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_language } from "../../actions/languageAction";
import { languages } from "../../language";

const HomeHeader = (props) => {
  const { language, declaration } = props;
  const [white, setWhite] = useState(true);
  const [visible, setVisible] = useState(false);

  const handle_visible = () => {
    setVisible((prevState) => !prevState);
  };

  window.onscroll = function () {
    window.pageYOffset > 75 ? setWhite(false) : setWhite(true);
  };
  const items = [
    { link: "/", text: language.isFrench ? "accueil" : "الصفحة الرئيسية" },
    {
      link: "/declaration",
      text: language.isFrench ? "déclarations" : "التصريحات",
    },
    { link: "/commune", text: language.isFrench ? "commune" : "البلدية" },
    { link: "/signup", text: language.isFrench ? "s'inscrire" : "أنشئ حسابا" },
    {
      link: "/login",
      text: language.isFrench ? "se connecter" : "تسجيل الدخول",
    },
  ];
  const itemsMobile = [
    { link: "/", text: language.isFrench ? "accueil" : "الصفحة الرئيسية" },
    {
      link: "/declaration",
      onClick: props.handle_declaration,
      text: language.isFrench ? "déclarations" : "التصريحات",
    },
    {
      link: "/declaration",
      onClick: props.handle_annonce,
      text: language.isFrench ? "annonces" : "الإعلانات",
    },
    { link: "/commune", text: language.isFrench ? "commune" : "البلدية" },
    { link: "/signup", text: language.isFrench ? "s'inscrire" : "أنشئ حسابا" },
    {
      link: "/login",
      text: language.isFrench ? "se connecter" : "تسجيل الدخول",
    },
  ];
  return (
    <header
      className={`_home_header ${!white && !declaration ? "white" : ""} ${
        language.isFrench ? "" : "rtl"
      } ${declaration ? "white_declaration" : ""}`}
    >
      {visible && <Backdrop onClick={handle_visible} />}
      <nav className="_home_nav">
        <Link className="pointer logo">
          {declaration ? (
            <Logo className="logo_h" />
          ) : white ? (
            <LogoI className="logo_h" />
          ) : (
            <Logo className="logo_h" />
          )}
          <p
            className={`extra-text ${
              declaration ? "text-active" : white ? "white-text" : "text-active"
            }`}
          >
            MADINA-TIC
          </p>
        </Link>
        <div className="_menu_area">
          {items.map((element) => {
            return (
              <Link to={element.link}>
                <p
                  className={
                    declaration ? "black-text" : white ? "" : "black-text"
                  }
                >
                  {element.text}
                </p>
              </Link>
            );
          })}
          <Dropdown
            icon={null}
            pointing
            trigger={
              <p
                className={
                  declaration ? "black-text" : white ? "" : "black-text"
                }
              >
                {language.isFrench ? "Langue" : "اللغة"}
              </p>
            }
          >
            <Dropdown.Menu
              style={{ position: "absolute", top: "50px", right: "20px" }}
            >
              <Dropdown.Item
                onClick={() => props.change_language(languages.arabe)}
              >
                <div className="_language">
                  <Flag name="dz" />
                  {language.isFrench ? "Arabe" : "العربية"}
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.change_language(languages.french)}
              >
                <div className="_language">
                  <Flag name="fr" />
                  {language.isFrench ? "Français" : "الفرنسية"}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
      <nav className="_mobile_nav">
        <div className="_header_sidebar">
          <div className="_toggle_home">
            <Toggle
              onClick={handle_visible}
              className={declaration ? "blue" : ""}
            />
          </div>
          <div className="logo">
            {declaration ? (
              <Logo height="40px" />
            ) : white ? (
              <LogoI height="40px" />
            ) : (
              <Logo height="40px" />
            )}
            <p
              className={`extra-text ${
                declaration
                  ? "text-active"
                  : white
                  ? "white-text"
                  : "text-active"
              }`}
            >
              MADINA-TIC
            </p>
          </div>
        </div>
        <div className={`_home_sidebar ${visible ? "active" : ""}`}>
          <div className="_toggle_sidebar">
            <Toggle onClick={handle_visible} />
          </div>
          <List className="_sidebar_list">
            {itemsMobile.map((element) => {
              return (
                <Link
                  className={`text-default ${
                    props.active === element.text ? "text-active" : ""
                  }`}
                  to={element.link}
                  onClick={() => {
                    if (element.onClick) element.onClick();
                  }}
                >
                  {element.text}
                </Link>
              );
            })}
            <span onClick={() => props.change_language(languages.arabe)}>
              <Radio checked={!language.isFrench} />
              <p className="text-default">
                {language.isFrench ? "Arabe" : "العربية"}
              </p>
            </span>
            <span onClick={() => props.change_language(languages.french)}>
              <Radio checked={language.isFrench} />
              <p className="text-default">
                {language.isFrench ? "Français" : "الفرنسية"}
              </p>
            </span>
          </List>
        </div>
      </nav>
    </header>
  );
};
HomeHeader.propTypes = {
  change_mode: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps, { change_language })(HomeHeader);
