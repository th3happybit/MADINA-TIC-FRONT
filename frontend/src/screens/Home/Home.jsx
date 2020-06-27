import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import DeclarationAnonyme from "../../components/DeclarationsAnonyme/DeclarationAnonyme.jsx";
import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";
import Commune from "../../components/Commune/Commune.jsx";

import { change_language } from "../../actions/languageAction";
import { languages } from "../../language";

const Home = (props) => {
  let history = useHistory();
  const { language, content } = props;

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/home");
  });

  const [annonce, setAnnonce] = useState(false);
  const [active, setActive] = useState(
    language.isFrench
      ? props.active
      : props.active === "déclarations"
      ? "التصريحات"
      : props.active === "commune"
      ? "البلدية"
      : "الإعلانات"
  );

  const handle_declaration = () => {
    setAnnonce(false);
    language.isFrench ? setActive("déclarations") : setActive("التصريحات");
  };
  const handle_annonce = () => {
    setAnnonce(true);
    language.isFrench ? setActive("annonces") : setActive("الإعلانات");
  };

  return (
    <>
      <HomeHeader
        language={language}
        declaration={content === "declaration" || content === "commune"}
        handle_annonce={handle_annonce}
        handle_declaration={handle_declaration}
        active={active}
        change_language={change_language}
        languages={languages}
      />
      {content === "home" && <HomeMain language={language} />}
      {content === "declaration" && (
        <DeclarationAnonyme
          isFrench={language.isFrench}
          anonyme
          annonce={annonce}
        />
      )}
      {content === "commune" && <Commune isFrench={language.isFrench} />}
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
