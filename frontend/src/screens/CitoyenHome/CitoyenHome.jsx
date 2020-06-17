import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./CitoyenHome.css";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";
import { languages } from "../../language";

//? import components
import CitoyenHeader from "../../components/CitoyenHeader/CitoyenHeader.jsx";
import CitoyenSidebar from "../../components/CitoyenSidebar/CitoyenSidebar.jsx";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import SidebarCitoyenMobile from "../../components/SidebarCitoyenMobile/SidebarCitoyenMobile.jsx";
import Annonce from "../../components/AnnonceHome/AnnonceHome.jsx";

const CitoyenHome = (props) => {
  const { language, annonce, isDark } = props;

  const [visible, setVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [seen, setSeen] = useState(false);

  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
      axios
        .create({
          headers: {
            get: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          },
        })
        .request({
          url: "https://www.madina-tic.ml/api/user/",
          method: "get",
        })
        .then((res) => {
          setFullname(res.data.first_name + " " + res.data.last_name);
          setImage(res.data.image);
          setId(res.data.uid);
          setSeen(!res.data.notif_seen);
        })
        .catch((err) => {});
    } else {
      setIsLogin(false);
    }
  }, []);

  const [isLogin, setIsLogin] = useState(null);
  return (
    <>
      {isLogin ? (
        <>
          <>{visible && <Backdrop click={handleHide} />}</>
          <CitoyenHeader
            seen={seen}
            show={handleHide}
            login
            uid={id}
            fullname={fullname}
            image={image}
            isFrench={language.isFrench}
            isDark={isDark}
            change_mode={props.change_mode}
          />{" "}
          <CitoyenSidebar
            isFrench={language.isFrench}
            active={props.active}
            visible={visible}
            isDark={isDark}
          />{" "}
          <main
            style={{
              position: "relative",
              top: "70px",
              left: "0",
              minHeight: "100vh",
            }}
            className={isDark ? "dark" : ""}
          >
            {props.childComponent}
          </main>
          <SidebarCitoyenMobile
            isFrench={language.isFrench}
            fullname={fullname}
            image={image}
            visible={visible}
            active={props.active}
            click={handleHide}
            isDark={isDark}
            change_mode={props.change_mode}
            login
          />
          {annonce && (
            <div
              className={`_annonce_section ${language.isFrench ? "" : "rtl"}`}
            >
              <Annonce isFrench={language.isFrench} isDark={isDark} />
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
          }}
        >
          {" "}
          <Message negative>
            <Message.Header>
              {true
                ? "Nous sommes désolés que vous ne puissiez pas accéder à cette page"
                : "عذرًا ، لا يمكنك الوصول إلى هذه الصفحة"}
            </Message.Header>
            <p
              className="text-default title _margin_vertical_sm pointer "
              style={{
                ccolor: "#912d2b",
              }}
            >
              {true
                ? "Accéder à la page de connexion"
                : "انتقل إلى صفحة تسجيل الدخول"}
              ?<a href="/login">{true ? "cliquez ici" : "انقر هنا"}</a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};
CitoyenHome.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  CitoyenHome
);
