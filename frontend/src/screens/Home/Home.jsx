import React from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import DeclarationAnonyme from "../../components/DeclarationsAnonyme/DeclarationAnonyme.jsx";
import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";

import { change_language } from "../../actions/languageAction";
import { useEffect } from "react";
import { useState } from "react";

const Home = (props) => {
  let history = useHistory();
  const { language, content } = props;

  // useEffect(() => {
  //   if (localStorage.getItem("token"))
  //   history.push("/home")
  // })

  const [annonce, setAnnonce] = useState(false);
  const [active, setActive] = useState(props.active)

  const handle_declaration = () => {
    setAnnonce(false);
    setActive("déclarations")
  };
  const handle_annonce = () => {
    setAnnonce(true);
    setActive("annonces")
  };

  return (
    <>
      <HomeHeader
        language={language}
        declaration={content === "declaration"}
        handle_annonce={handle_annonce}
        handle_declaration={handle_declaration}
        active={active}
      />
      {content === "home" ? (
        <HomeMain language={language} />
      ) : (
        <DeclarationAnonyme
          isFrench={language.isFrench}
          anonyme
          annonce={annonce}
        />
      )}
    </>
  );
};

Home.prototype = {
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps, { change_language })(Home);
