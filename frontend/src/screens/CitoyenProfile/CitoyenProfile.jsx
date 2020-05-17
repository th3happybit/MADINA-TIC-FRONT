import React, { useState, useEffect } from "react";
import { Grid, GridColumn, Container, Menu, Message } from "semantic-ui-react";
import axios from "axios";

import InfosForm from "../../components/CitoyenInfosForm/CitoyenInfosForm.jsx";
import Card from "../../components/CitoyenCard/CitoyenCard.jsx";
import PasswordForm from "../../components/CitoyenPasswordForm/CitoyenPasswordForm.jsx";

import "./CitoyenProfile.css";

const CitoyenProfile = () => {
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
        url: "http://157.230.19.233/api/user/",
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
        <main>
          <Container
            fluid
            id="container_profile"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid className="citoyen-profile">
              <GridColumn className="left">
                <Card
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
                        name="Update Infos"
                        active={activeItem === "info"}
                        onClick={handleItemClick}
                      />
                      <Menu.Item
                        data-name="password"
                        name="Update Password"
                        active={activeItem === "password"}
                        onClick={handleItemClick}
                      />
                    </Menu>
                    <div className="infos-form">
                      {activeItem === "info" && (
                        <InfosForm
                          cit_infos={Infos}
                          refresh={GetCitoyenInfos}
                          loading={isLoading}
                        />
                      )}
                      {activeItem === "password" && <PasswordForm />}
                    </div>
                  </div>
                </div>
              </GridColumn>
            </Grid>
          </Container>
          <Container fluid className="mobile-profile">
            <Card
              cit_infos={Infos}
              loading={isLoading}
              updateImage={updateImage}
              image={image}
              refresh={GetCitoyenInfos}
            />
          </Container>
        </main>
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
              We're sorry you are not logged in :(
            </Message.Header>
            <p
              className="text-default title _margin_vertical_sm pointer "
              style={{
                ccolor: "#912d2b",
              }}
            >
              Go to login page?<a href="/login">click here</a>
              You don't have account?<a href="/signup">click here</a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};

export default CitoyenProfile;
