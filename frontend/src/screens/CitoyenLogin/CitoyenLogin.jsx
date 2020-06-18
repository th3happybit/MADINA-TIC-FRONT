import React, { useEffect } from "react";
import { Container, Grid, Image } from "semantic-ui-react";

import "./CitoyenLogin.css";

//? import Header
import Header from "../../components/Header/Header.jsx";

//? import Form
import FormLogin from "../../components/FormLogin/FormLogin.jsx";

import Logo from "../../assets/images/logo_hero.png";
const CitoyenLogin = () => {
  return (
    <>
      <Header />
      <main
        style={{
          height: "100vh",
        }}
      >
        <Container fluid className="_citoyen_login">
          <Grid className="h-full">
            <Grid.Column width={10} className="_citoyen_login_hero_section">
              <Image src={Logo} className="_logo_hero_section" />
              <div className="slogan blue">
                <p className="text-white bold">Un Service Simple</p>
              </div>
              <div className="slogan orange top">
                <p className=" text-white ">Pour Une Société Meilleure</p>
              </div>
            </Grid.Column>
            <Grid.Column className="p-0 bg-default h-full" width={6}>
              <FormLogin />
            </Grid.Column>
          </Grid>
        </Container>
        <Container fluid className="_citoyen_login mobile m-0">
          <div className="slogan blue">
            <p className="title text-white ">Un Service Simple</p>
          </div>
          <div className="slogan orange">
            <p className="title text-white bold">Pour Une Société Meilleure</p>
          </div>
          <div className="citoyen_mobile_container">
            <div className="row">
              <FormLogin />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};
export default CitoyenLogin;
