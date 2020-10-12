import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Image, Icon, Segment } from "semantic-ui-react";
import Status from "./StatusLabel.jsx";

import "./CitoyenDeclarationInfo.css";
import { Link, useHistory } from "react-router-dom";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";

const CitoyenDeclarationInfo = (props) => {
  const { languages } = props;
  const [Data, setData] = useState([]);
  const [Reason, setReason] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [id, setId] = useState(null);
  let history = useHistory();

  const deleteDecla = () => {
    axios
      .delete("https://madina-tic.ml/api/declarations/" + id + "/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        history.push("/citoyen/declaration");
      })
      .catch((err) => {});
  };

  const getData = (did) => {
    if (did)
      axios
        .get(
          "https://madina-tic.ml/api/declarations/" + String(did) + "/",
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
          if (res.data.status === "lack_of_info")
            axios
              .get(
                `https://madina-tic.ml/api/declarations_complement_demand/`,
                {
                  params: {
                    declaration: did,
                    ordering: "-created_on",
                  },
                  headers: {
                    "content-type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((ress) => {
                setReason(ress.data.results[0].reason);
              })
              .catch((errr) => {});
        })
        .catch((err) => {});
  };

  const getTypes = () => {
    axios
      .get("https://madina-tic.ml/api/declarations_types/", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTypes(res.data);
      });
  };

  const UpdateState = (status) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/declarations/" + id + "/", {
        method: "patch",
        data: {
          title: Data.title,
          desc: Data.desc,
          citizen: Data.citizen,
          status: status,
          dtype: Data.dtype,
        },
      })
      .then((res) => {
        history.push("/citoyen/declaration");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (props.props.location.state) {
      setId(props.props.location.state.id);
      getData(id);
      getTypes();
    } else {
      setLoading(false);
    }
  }, [id]);

  const editType = (tid) => {
    for (let i = 0; i < types.length; i++) {
      if (tid === types[i].dtid) {
        return types[i].name;
      }
    }
  };

  function getStatus(st) {
    var ret = { status: "", color: "" };
    switch (st) {
      case "not_validated":
        ret["status"] = languages.isFrench ? "Pas validée" : "تصريح جديد";
        ret["color"] = "blue";
        return ret;
      case "lack_of_info":
        ret["status"] = languages.isFrench
          ? "Manque d'informations"
          : "معلومات غير كافية";
        ret["color"] = "orange";
        return ret;
      case "validated":
        ret["status"] = languages.isFrench ? "Validée" : "تم التحقق من صحتها";
        ret["color"] = "green";
        return ret;
      case "refused":
        ret["status"] = languages.isFrench ? "Refusée" : "مرفوضة";
        ret["color"] = "red";
        return ret;
      case "under_treatment":
        ret["status"] = languages.isFrench ? "En cours" : "في تقدم";
        ret["color"] = "yellow";
        return ret;
      case "treated":
        ret["status"] = languages.isFrench ? "Traitée" : "معالجة";
        ret["color"] = "green";
        return ret;
      case "archived":
        ret["status"] = languages.isFrench ? "Archivée" : "مؤرشفة";
        ret["color"] = "black";
        return ret;
      case "draft":
        ret["status"] = languages.isFrench ? "Brouillons" : "مسودة";
        ret["color"] = "gray";
        return ret;
      default:
        break;
    }
  }

  return (
    <Segment
      loading={Loading}
      className={`bg-white _container_declaration_info ${
        props.isDark ? "dark" : ""
      } ${languages.isFrench ? "" : "rtl"}`}
    >
      {id ? (
        <>
          <p className="text-gray-dark _intitulé extra-text">
            {" "}
            {languages.isFrench ? "Détails de la déclaration" : "تفاصيل تصريح"}
          </p>
          <div className="d-flex _info_container">
            <div className="_row1">
              <div className="d-flex _content">
                <p className="bold">{Data.title}</p>
                {Data.status && (
                  <Status
                    content={getStatus(Data.status).status}
                    color={getStatus(Data.status).color}
                  />
                )}
              </div>
              <p className="text-gray-light _content2">
                {languages.isFrench
                  ? `- ${editType(Data.dtype)} problème -`
                  : `- مشكل ${editType(Data.dtype)} -`}
              </p>
              <p className=" _content2">
                {languages.isFrench ? "Date de dépot :" : "تاريخ الإضافة :"}{" "}
                &nbsp;{Data.created_on && Data.created_on.slice(0, 10)}
              </p>
              <p className="_content2">
                {languages.isFrench ? "Adresse :" : "العنوان :"} {Data.address}
              </p>
              {Data.status &&
                getStatus(Data.status).status === "Lack of infos" && (
                  <p className="_content2">
                    {languages.isFrench
                      ? "Cause du demande :"
                      : "سبب طلب التكملة :"}{" "}
                    &nbsp;{Reason}
                  </p>
                )}
              <p className="_content3">
                {languages.isFrench ? "Description :" : "التفاصيل :"}
                <br /> {Data.desc}
              </p>
            </div>

            <div className="_row2">
              <div class="ui small image">
                {Data.attachments &&
                  Data.attachments.map((element, index) => {
                    return (
                      element.filetype === "image" && (
                        <Image
                          onClick={() => {
                            window.open(element.src);
                          }}
                          src={element.src}
                          key={index}
                          rounded
                          className="pointer"
                        />
                      )
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="_button1">
            {Data.status &&
              (Data.status === "not_validated" || Data.status === "draft") && (
                <Link
                  to={{
                    pathname: "/update/declaration",
                    state: { data: Data },
                  }}
                >
                  <Button animated color="black" className="action_button">
                    <Button.Content
                      visible
                      content={languages.isFrench ? "modifier" : "تعديل"}
                    />
                    <Button.Content hidden icon>
                      <Icon name="pencil alternate" />
                    </Button.Content>
                  </Button>
                  <Button
                    className="action_button_mobile"
                    icon={{ name: "pencil alternate" }}
                    color="black"
                  />
                </Link>
              )}
            {Data.status && Data.status === "refused" && (
              <Button animated color="yellow" className="action_button">
                <Button.Content
                  visible
                  content={languages.isFrench ? "Renvoyer" : "إعادة إرسال"}
                />
                <Button.Content hidden icon>
                  <Icon name="sync alternate" />
                </Button.Content>
              </Button>
            )}
            {Data.status && Data.status === "lack_of_info" && (
              <Link
                to={{
                  pathname: "/complement/declaration",
                  state: { data: Data },
                }}
              >
                <Button animated color="green" className="action_button">
                  <Button.Content
                    visible
                    content={languages.isFrench ? "Completer" : "اكتمال"}
                  />
                  <Button.Content hidden icon>
                    <Icon name="add" />
                  </Button.Content>
                </Button>
                <Button
                  className="action_button_mobile"
                  icon={{ name: "add" }}
                  color="green"
                />
              </Link>
            )}
            {Data.status && Data.status === "draft" && (
              <>
                <Button
                  animated
                  color="yellow"
                  className="action_button"
                  onClick={() => UpdateState("not_validated")}
                >
                  <Button.Content
                    visible
                    content={languages.isFrench ? "Envoyer" : "إرسال"}
                  />
                  <Button.Content hidden icon>
                    <Icon name="paper plane alternate" />
                  </Button.Content>
                </Button>
                <Button
                  className="action_button_mobile"
                  icon={{ name: "paper plane alternate" }}
                  color="yellow"
                  onClick={() => UpdateState("not_validated")}
                />
              </>
            )}
            {Data.status && Data.status === "treated" && (
              <>
                <Button
                  animated
                  color="black"
                  className="action_button"
                  onClick={() => UpdateState("archived")}
                >
                  <Button.Content
                    visible
                    content={languages.isFrench ? "Archiver" : "أرشيف"}
                  />
                  <Button.Content hidden icon>
                    <Icon name="archive" />
                  </Button.Content>
                  <Button
                    className="action_button_mobile"
                    icon={{ name: "archive" }}
                    color="black"
                    onClick={() => UpdateState("archived")}
                  />
                </Button>
              </>
            )}
            {Data.status &&
              (Data.status === "not_validated" ||
                Data.status === "refused" ||
                Data.status === "archived" ||
                Data.status === "draft") && (
                <>
                  <Button
                    animated
                    color="red"
                    type="submit"
                    className="action_button delete_button"
                    onClick={deleteDecla}
                  >
                    <Button.Content
                      visible
                      content={languages.isFrench ? "Supprimer" : "حذف"}
                    />
                    <Button.Content icon hidden>
                      {" "}
                      <Icon name="times" />{" "}
                    </Button.Content>
                  </Button>

                  <Button
                    className="action_button_mobile"
                    icon={{ name: "times" }}
                    color="red"
                    onClick={deleteDecla}
                  />
                </>
              )}
          </div>
        </>
      ) : (
        <p className="text-gray-dark _intitulé extra-text">
          {languages.isFrench ? "Un erreur s'est produit ..." : "حدث خطأ ما"}
        </p>
      )}
    </Segment>
  );
};

CitoyenDeclarationInfo.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  languagse: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  languages: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  CitoyenDeclarationInfo
);
