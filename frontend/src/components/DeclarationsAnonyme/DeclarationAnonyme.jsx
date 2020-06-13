import React from "react";

import "./DeclarationAnonyme.css";

import AnnonceHome from "../AnnonceHome/AnnonceHome.jsx";
import Declarations from "../HomeCitoyen/HomeCitoyen.jsx";

const DeclarationAnonyme = (props) => {
  return (
    <>
      <div className="_home_declaration_anonyme">
        <Declarations anonyme />
      </div>
      <div className="_annonce_section">
        <AnnonceHome anonyme isFrench={props.isFrench} />
      </div>
    </>
  );
};

export default DeclarationAnonyme;
