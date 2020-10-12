import React, { useState, useEffect } from "react";
import { Grid, GridColumn, Container, Menu, Message } from "semantic-ui-react";
import axios from "axios";

import InfosForm from "../../components/CitoyenInfosForm/CitoyenInfosForm.jsx";
import Card from "../../components/CitoyenCard/CitoyenCard.jsx";
import PasswordForm from "../../components/CitoyenPasswordForm/CitoyenPasswordForm.jsx";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_mode } from "../../actions/darkAction";
import { change_language } from "../../actions/languageAction";

import "./CitoyenProfile.css";

const CitoyenProfile = (props) => {
  const { languages } = props;
  const [Infos, setInfos] = useState([]);
  const [activeItem, setActiveItem] = useState("info");
  const [isLogin, setIsLogin] = useState("null");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const updateImage = (img) => {
    setImage(img);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
      GetCitoyenInfos();
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };

  const GetCitoyenInfos = () => {
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
        url: "https://madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setInfos(res.data);
        setImage(res.data.image);
        setIsLoading(false);
      })
      .catch((err) => {});
  };
  return (
    <>
      {isLogin ? (
        <>
          <Container
            fluid
            id="container_profile"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              className={`citoyen-profile ${props.isDark ? "dark" : ""} ${
                languages.isFrench ? "" : "rtl"
              }`}
            >
              <GridColumn className="left">
                <Card
                  isFrench={languages.isFrench}
                  cit_infos={Infos}
                  loading={isLoading}
                  updateImage={updateImage}
                  image={image}
                  refresh={GetCitoyenInfos}
                />
              </GridColumn>
              <GridColumn className="right">
                <div className="edit-profile shadow">
                  <div className="_info_menu">
                    <Menu pointing secondary>
                      <Menu.Item
                        data-name="info"
                        name={
                          languages.isFrench
                            ? "Mettre à jour les informations"
                            : "تحديث معلومات"
                        }
                        active={activeItem === "info"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        data-name="password"
                        name={
                          languages.isFrench
                            ? "Mettre à jour le mot de passe"
                            : "تحديث كلمة السر"
                        }
                        active={activeItem === "password"}
                        onClick={handleItemClick}
                      />
                    </Menu>
                    <div className="infos-form">
                      {activeItem === "info" && (
                        <InfosForm
                          isFrench={languages.isFrench}
                          cit_infos={Infos}
                          refresh={GetCitoyenInfos}
                          loading={isLoading}
                        />
                      )}
                      {activeItem === "password" && (
                        <PasswordForm isFrench={languages.isFrench} />
                      )}
                    </div>
                  </div>
                </div>
              </GridColumn>
            </Grid>
          </Container>
          <Container fluid className="mobile-profile">
            <Card
              isDark={props.isDark}
              isFrench={languages.isFrench}
              cit_infos={Infos}
              loading={isLoading}
              updateImage={updateImage}
              image={image}
              refresh={GetCitoyenInfos}
              change_language={props.change_language}
            />
          </Container>
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
                {" "}
                {languages.isFrench ? "cliquez ici" : "انقر هنا"}
              </a>
              {languages.isFrench
                ? "Vous n'avez pas de compte"
                : "ليس لديك حساب"}
              ?
              <a href="/signup">
                {languages.isFrench ? "cliquez ici" : "انقر هنا"}e
              </a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};

CitoyenProfile.propTypes = {
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
  CitoyenProfile
);
