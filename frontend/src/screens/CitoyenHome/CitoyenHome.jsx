import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import axios from "axios";

//? beams pusher
import * as PusherPushNotifications from "@pusher/push-notifications-web";

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
  const { language, annonce } = props;
  //!TODO FOR MONCEF
  //? bah tjib isDark ...
  // console.log(props.isDark);
  //? bah tmodifi isDark
  //console.log(props.change_mode());
  //? ida kan isDark true ywali false w l3ks

  const [visible, setVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
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
          let tokenProvider = new PusherPushNotifications.TokenProvider({
            url: "https://madina-tic.ml/api/beams_auth/",
          });

          PusherPushNotifications.init({
            instanceId: "65b0754a-0713-4b71-bc41-4d2abae63fc6",
          })
            .then((beamsClient) => beamsClient.start())
            .then((beamsClient) =>
              beamsClient.setUserId(res.data.uid, tokenProvider)
            )
            .catch(console.error);
        })
        .catch((err) => {});
    } else {
      setIsLogin(false);
    }
  }, []);

  const [isLogin, setIsLogin] = useState("null");

  return (
    <>
      {isLogin ? (
        <>
          <>{visible && <Backdrop click={handleHide} />}</>
          <CitoyenHeader
            show={handleHide}
            login
            fullname={fullname}
            image={image}
            isFrench={language.isFrench}
          />{" "}
          <CitoyenSidebar
            isFrench={language.isFrench}
            active={props.active}
            visible={visible}
          />{" "}
          <main
            style={{
              position: "relative",
              top: "70px",
              left: "0",
            }}
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
            login
          />
          {annonce && (
            <div className="_annonce_section">
              <Annonce isFrench={language.isFrench} />
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
              {languages.isFrench
                ? "Nous sommes désolés que vous ne puissiez pas accéder à cette page"
                : "عذرًا ، لا يمكنك الوصول إلى هذه الصفحة"}
            </Message.Header>
            <p
              className="text-default title _margin_vertical_sm pointer "
              style={{
                ccolor: "#912d2b",
              }}
            >
              {languages.isFrench
                ? "Accéder à la page de connexion"
                : "انتقل إلى صفحة تسجيل الدخول"}
              ?
              <a href="/login">
                {languages.isFrench ? "cliquez ici" : "انقر هنا"}
              </a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};

//? hadou lzm dirhom bah typage ykn s7i7
//? bal3arbya ida isDArk maknch bool marahch yji
CitoyenHome.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

//? w hedi bah state te3 reducer li reh f redux diro props l hed component
const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
  language: state.language,
});

export default connect(mapStateToProps, { change_mode, change_language })(
  CitoyenHome
);
