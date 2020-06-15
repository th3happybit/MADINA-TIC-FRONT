import React from "react";
import { Segment, Image, Popup, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import "./HomeCitoyen.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Status from "../CitoyenDeclarationInfo/StatusLabel.jsx";
import debounce from "lodash.debounce";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { change_language } from "../../actions/languageAction";

const HomeCitoyen = (props) => {
  const { filter, language } = props;

  const [Data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [Filter, setFilter] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [referenceNode, setReferenceNode] = useState();
  const [notifData, setNotifData] = useState("");
  window.onscroll = debounce(() => {
    if (isLoading || !next) return;
    if (
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight <=
      document.documentElement.scrollTop + 1
    ) {
      loadUsers();
    }
  }, 100);
  const loadUsers = () => {
    setLoading(true);

    const headers = !props.anonyme
      ? {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        }
      : {
          "content-type": "application/json",
        };
    axios
      .get(
        Data.length > 0
          ? next
          : "http://www.madina-tic.ml/api/declarations/?status=validated&status=treated&status=under_treatment&ordering=-created_on",
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (Data.length === 0) {
          setData(res.data.results);
          setNext(res.data.next);
        } else {
          let tempArr = Data;
          res.data.results.map((elm) => tempArr.push(elm));
          setData([...tempArr]);
          setNext(res.data.next);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    getTypes();
    setFilter(filter);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const getTypes = () => {
    if (!props.anonyme)
      axios
        .get("http://www.madina-tic.ml/api/declarations_types/", {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setTypes(res.data);
          // console.log(res)
        });
  };

  function getStatus(st) {
    var ret = { status: "", color: "" };
    switch (st) {
      case "not_validated":
        ret["status"] = language.isFrench ? "Pas validée" : "تصريح جديد";
        ret["color"] = "blue";
        return ret;
      case "lack_of_info":
        ret["status"] = language.isFrench ? "Manque d'informations" : "معلومات غير كافية";
        ret["color"] = "orange";
        return ret;
      case "validated":
        ret["status"] = language.isFrench ? "Validée" : "تم التحقق من صحتها";
        ret["color"] = "green";
        return ret;
      case "refused":
        ret["status"] = language.isFrench ? "Refusée" : "مرفوضة";
        ret["color"] = "red";
        return ret;
      case "under_treatment":
        ret["status"] = language.isFrench ? "In progress" : "في تقدم";
        ret["color"] = "yellow";
        return ret;
      case "treated":
        ret["status"] = language.isFrench ? "Treated" : "معالجة";
        ret["color"] = "pink";
        return ret;
      case "archived":
        ret["status"] = language.isFrench ? "Archived" : "مؤرشفة";
        ret["color"] = "black";
        return ret;
      case "draft":
        ret["status"] = language.isFrench ? "Draft" : "مسودة";
        ret["color"] = "gray";
        return ret;
      default:
        break;
    }
  }

  const editType = (tid) => {
    for (let i = 0; i < types.length; i++) {
      if (tid === types[i].dtid) {
        return types[i].name;
      }
    }
  };
  const handleScroll = (event) => {
    const target = event.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      alert("sds");
    }
  };
  return (
    <Segment
      className={`gis ${language.isFrench ? "" : "rtl"}`}
      loading={isLoading && Data.length === 0}
    >
      {Data &&
        Data.map((element, index) => {
          return (
            <Segment
              className="d-flex bg-white _container_declaration"
              key={index}
            >
              <>
                <div className="_row_mobile">
                  <div class="ui small image">
                    {element.attachments &&
                      element.attachments.map((element, index) => {
                        return (
                          element.filetype === "image" && (
                            <Image
                              onClick={() => {
                                window.open(element.src);
                              }}
                              src={element.src}
                              key={index}
                              rounded
                              className="pointer _pic"
                            />
                          )
                        );
                      })}
                  </div>
                </div>

                <div className="roww">
                  <div
                    class="ui small image"
                    style={{
                      visibility: element.attachments ? "visible" : "hidden",
                    }}
                  >
                    <Image
                      className="pointer image_dcr"
                      src={
                        element.attachments
                          ? element.attachments[0]
                            ? element.attachments[0].src
                            : ""
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="_row">
                  <div className="_contentt">
                    <p className="bold titre">{element.title}</p>
                    {element.status && (
                      <Status
                        className="_label_status"
                        content={getStatus(element.status).status}
                        color={getStatus(element.status).color}
                      />
                    )}
                  </div>
                  {!props.anonyme && (
                    <div className="_contentt">
                      <p className="text-gray-light _contentt">
                        - {editType(element.dtype)} problem -
                      </p>
                    </div>
                  )}
                  <p className=" _contenttt">
                    {language.isFrench ? "Date de dépot" : "تاريخ الإضافة"} :{" "}
                    {element.created_on && element.created_on.slice(0, 10)}
                  </p>
                  <p className="_contenttt">
                    {language.isFrench ? "Adresse" : "العنوان"} :{" "}
                    {element.address}
                  </p>
                  <p className="_contenttt">
                    {language.isFrench ? "Description" : "التفاصيل"} :<br />{" "}
                    {element.desc}
                  </p>
                </div>
                {!props.anonyme && (
                  <div className="_roww">
                    <Link
                      to={{
                        pathname: "/InfosScreen",
                        state: { id: element.did },
                      }}
                    >
                      <Popup
                        content={language.isFrench ? "Infos" : "تفاصيل"}
                        trigger={
                          <Button
                            icon
                            id="infos_btn"
                            className="shadow _hide_on_mobile _infos_btn_desktop"
                          >
                            <Icon name="info" color="black" />
                          </Button>
                        }
                      />
                    </Link>
                  </div>
                )}
              </>
            </Segment>
          );
        })}
      {isLoading && Data.length > 0 && (
        <Segment loading={isLoading} className="_container_declaration x">
          {language.isFrench ? "Loading..." : "اصبر قليلا ..."}
        </Segment>
      )}
    </Segment>
  );
};

HomeCitoyen.propTypes = {
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, { change_language })(HomeCitoyen);