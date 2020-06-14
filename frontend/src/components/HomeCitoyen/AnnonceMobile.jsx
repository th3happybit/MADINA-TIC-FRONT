import React from "react";

import "./AnnonceMobile.css";

import { Segment, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { change_language } from "../../actions/languageAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AnnonceMobile = (props) => {
  const { language } = props;

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);


  window.onscroll = debounce(() => {
    if (Loading || !next) return;
    if (
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight ===
      document.documentElement.scrollTop
    ) {
      loadUsers();
    }
  }, 100);



  function getMonth(month) {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        break;
    }
  }
  function TimeExtract(date) {
    let ConvertedDate,
      year,
      month,
      day,
      hour,
      minute = "";
    year = date.slice(0, 4);
    month = date.slice(5, 7);
    day = date.slice(8, 10);
    hour = date.slice(11, 13);
    minute = date.slice(14, 16);
    ConvertedDate =
      year +
      " " +
      getMonth(month) +
      " " +
      day +
      " --- " +
      hour +
      ":" +
      minute +
      " +01 GMT";
    return ConvertedDate;
  }

  const loadUsers = () => {
    const headers = props.anonyme
      ? {
        "content-type": "application/json",
      }
      : {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      };

    const date = new Date();
    let now =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();


    setLoading(true);
    axios
      .get(
        Data.length > 0
          ? next
          : "https://www.madina-tic.ml/api/announce_nested/", {
        params: {
          status: "published",
          start_at_less: now,
          end_at_greater: now,
        },
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        console.log("hello");
        if (Data.lenght === 0) {
          setData(res.data.results);
          setNext(res.data.next);
        } else {
          let tempArr = Data;
          res.data.results.map((elm) => tempArr.push(elm));
          setData([...tempArr]);
          setNext(res.data.next);
        }
        setLoading(false);
        console.log(Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      alert("sds");
    }
  };

  return (
    <>
      <h3 className="text-default _grand_titre">
        {language.isFrench ? "Annonces actives" : "الإعلانات النشطة"}
  </h3>
      <Segment className={`gis ${language.isFrench ? "" : "rtl"}`}
        loading={Loading && Data.length === 0}>
        {Data &&
          Data.map((element, index) => {
            return (
              <Segment className="d-flex bg-white _container_declaration"
                key={index}>
                <>
                  <div className="_roww">
                    <div class="ui small image"
                      style={{
                        visibility: element.image ? "visible" : "hidden",
                      }}
                    >
                      <Image
                        className="pointer image_dcr"
                        src={element.image
                          // ? element.image
                          //   ? element.image.src
                          //   : ""
                          // : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="contentt1">
                      <h4 className="bold titre_annonce">{element.title}</h4>
                      <p className="contentt1">
                        {element.service.first_name +
                          " " +
                          element.service.last_name}
                      </p>
                      <p className="contentt1">{language.isFrench ? "Du : " : "من "}{TimeExtract(element.start_at)}</p>
                      <p className="contentt1">{language.isFrench ? "Au : " : "الى "}{TimeExtract(element.end_at)}</p>
                      <p className="contentt1">
                        {language.isFrench ? "Description" : "التفاصيل"} :<br /> {element.desc}
                      </p>
                    </div>
                  </div>
                </>
              </Segment>
            );
          })}
        {Loading && Data.length > 0 && (
          <Segment loading={Loading} className="_container_declaration x">
            {language.isFrench ? "Loading..." : "اصبر قليلا ..."}
          </Segment>
        )}
      </Segment>
    </>
  );
};

AnnonceMobile.propTypes = {
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, {change_language})(AnnonceMobile);
