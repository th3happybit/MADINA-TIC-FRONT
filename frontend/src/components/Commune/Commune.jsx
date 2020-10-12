import React from "react";
import GoogleMapReact from "google-map-react";

import "./Commune.css";
import { Segment } from "semantic-ui-react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const Commue = (props) => {
  const [Data, setData] = useState({});
  const [lang, setLang] = useState(null);
  const [lat, setLat] = useState(null);
  const [logged, setLogged] = useState(localStorage.getItem("token"));
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://madina-tic.ml/api/city", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
        let arr = res.data[0].cord.split(",");
        setLat(parseFloat(arr[0].slice(1, arr[0].length)));
        setLang(parseFloat(arr[1].slice(1, arr[1].length - 2)));
        //35.190922 , -00.635230
      });
  }, []);

  const { language, isDark } = props;

  const items = [
    language.isFrench ? "Commune" : "البلدية",
    language.isFrench ? "En Tamazight" : "بالأمازيغية",
    language.isFrench ? "Wilaya" : "الولاية",
    language.isFrench ? "Daira" : "الدائرة",
    language.isFrench ? "Maire" : "رئيس البلدية",
    language.isFrench ? "Surface" : "المساحة",
    language.isFrench ? "Population" : "عدد السكان",
    language.isFrench ? "Altitude" : "الارتفاع عن سطح البحر",
    language.isFrench ? "Indicatif" : "بداية الهاتف الثابت",
    language.isFrench ? "Description" : "الوصف",
  ];

  const Dataitems = [
    language.isFrench ? "name" : "name_ar",
    "name_am",
    "wilaya",
    "daira",
    "maire_fullname",
    "surface",
    "population",
    "altitude",
    "indicatif",
    "description",
  ];
  return (
    <div
      className={`_commune ${language.isFrench ? "" : "rtl"} ${
        isDark && logged ? "dark" : ""
      }`}
    >
      <Segment loading={Loading}>
        <section className="_infos">
          {items.map((elm, index) => {
            return (
              <span className="row">
                <h4>{elm + " :"}&nbsp;</h4>
                <p>
                  {Data[Dataitems[index]]}&nbsp;
                  {Dataitems[index] === "population"
                    ? language.isFrench
                      ? "Habitants"
                      : "نسمة"
                    : ""}
                  {Dataitems[index] === "surface"
                    ? language.isFrench
                      ? "Km ²"
                      : "كم ²"
                    : ""}
                  {Dataitems[index] === "altitude"
                    ? language.isFrench
                      ? "mètres"
                      : "متر"
                    : ""}
                </p>
              </span>
            );
          })}
        </section>
        <section className="_map">
          <GoogleMapReact
            defaultCenter={{ lng: lang, lat: lat }}
            center={{ lng: lang, lat: lat }}
            defaultZoom={12}
          ></GoogleMapReact>
        </section>
      </Segment>
    </div>
  );
};

Commue.propTypes = {
  isDark: PropTypes.bool.isRequired,
  language: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps)(Commue);
