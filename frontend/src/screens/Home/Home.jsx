import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomeHeader from "../../components/HomeHeader/HomeHeader.jsx";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";
import { change_language } from "../../actions/languageAction";
import { languages } from "../../language";
import { useEffect } from "react";
import axios from "axios";

const Home = (props) => {
  const { language } = props;
  // useEffect(() => {
  //   axios
  //   .get("https://www.madina-tic.ml/api/declaration_nested/", {
  //     headers : {
  //       "Content-type" : "application/json",
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   axios
  //   .get("https://www.madina-tic.ml/api/declarations-statistics/", {
  //     headers : {
  //       "Content-type" : "application/json",
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   axios
  //   .get("https://www.madina-tic.ml/api/users-statistics/", {
  //     headers : {
  //       "Content-type" : "application/json",
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   axios
  //   .get("https://www.madina-tic.ml/api/announce_nested/", {
  //     headers : {
  //       "Content-type" : "application/json",
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })

  // })
  return (
    <>
      <HomeHeader language={language}/>
      <HomeMain language={language}/>
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
