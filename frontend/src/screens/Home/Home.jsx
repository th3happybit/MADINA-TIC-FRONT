import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import DeclarationAnonyme from "../../components/DeclarationsAnonyme/DeclarationAnonyme.jsx";
import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";

import { change_language } from "../../actions/languageAction";
import { useEffect } from "react";

const Home = (props) => {
  let history = useHistory();
  const { language, content } = props;

  // useEffect(() => {
  //   if (localStorage.getItem("token"))
  //   history.push("/home")
  // })

  return (
    <>
      <HomeHeader language={language} declaration={content === "declaration"} />
      {content === "home" ? (
        <HomeMain language={language} />
      ) : (
        <DeclarationAnonyme isFrench={language.isFrench} anonyme />
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
