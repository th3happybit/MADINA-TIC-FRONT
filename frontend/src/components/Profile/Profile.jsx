import React, { useState, useEffect } from "react";
import { Grid, GridColumn, Container, Menu, Message } from "semantic-ui-react";
import axios from "axios";

import InfosForm from "./InfosForm.jsx";
import Card from "./Card.jsx";
import PasswordForm from "./PasswordForm.jsx";

import "./Profile.css";

const Profile = (props) => {
  const [Infos, setInfos] = useState([]);
  const [activeItem, setActiveItem] = useState("info");
  const [isLogin, setIsLogin] = useState("null");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const updateImage = (img) => {
    setImage(img);
    updateImageP(img);
  };
  const { service, updateImageP } = props;

  useEffect(() => {
    if (!service) {
      if (localStorage.getItem("maire_token")) {
        setToken("maire_token");
        setIsLogin(true);
        GetInfos("maire_token");
      } else {
        setIsLogin(false);
      }
    } else {
      if ("service_token") {
        setToken("service_token");
        setIsLogin(true);
        GetInfos("service_token");
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };

  const GetInfos = (token) => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
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
            style={{
              display: "flex",
              justifyContent: "center",
              "min-height" : "90vh"
            }}
          >
            <Grid className="_profile">
              <GridColumn className="left">
                <Card
                  token={token}
                  cit_infos={Infos}
                  loading={isLoading}
                  updateImage={updateImage}
                  image={image}
                  refresh={GetInfos}
                  service={service}
                />
              </GridColumn>
              <GridColumn className="right">
                <div className="edit-profile shadow">
                  <div className="_info_menu">
                    <Menu pointing secondary>
                      <Menu.Item
                        data-name="info"
                        name="Mettre à jour les informations"
                        active={activeItem === "info"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        data-name="password"
                        name="Mettre à jour le mot de passe"
                        active={activeItem === "password"}
                        onClick={handleItemClick}
                      />
                    </Menu>
                    <div className="infos-form">
                      {activeItem === "info" && (
                        <InfosForm
                          service={service}
                          token={token}
                          cit_infos={Infos}
                          refresh={GetInfos}
                          loading={isLoading}
                        />
                      )}
                      {activeItem === "password" && (
                        <PasswordForm token={token} />
                      )}
                    </div>
                  </div>
                </div>
              </GridColumn>
            </Grid>
          </Container>
          <Container fluid className="mobile_profile">
            <Card
              service={service}
              token={token}
              cit_infos={Infos}
              loading={isLoading}
              updateImage={updateImage}
              refresh={GetInfos}
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
              Nous sommes désolés que vous ne soyez pas connecté :(
            </Message.Header>
            <p
              className="text-default title _margin_vertical_sm pointer "
              style={{
                ccolor: "#912d2b",
              }}
            >
              Aller à la page de connexion?<a href="/login">cliquez ici</a>
              Vous n'avez pas de compte?<a href="/signup">cliquez ici</a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};

export default Profile;
