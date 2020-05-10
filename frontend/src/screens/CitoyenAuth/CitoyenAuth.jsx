import React, { useState, useEffect } from "react";
import { Container, Grid, GridRow, GridColumn, Image } from "semantic-ui-react";

//?import css
import "./CitoyenAuth.css";

//? import logo
import Logo from "../../assets/images/logo_hero.png";

//? import Form
import FormCitoyen from "../../components/FormCitoyen/FormCitoyen.jsx";

//? import header
import CitoyenHeader from "../../components/CitoyenHeader/CitoyenHeader.jsx";

const CitoyenAuth = (props) => {
  const [isLoading, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded((prevState) => !prevState);
  }, []);
  const { islogin } = props; //* if screen is for Login or Signup
  return (
    <>
      <CitoyenHeader login={false} />
      {isLoading ? (
        <>
          <Container fluid className="_citoyen_login">
            <Grid style={{ height: "100%" }}>
              <GridRow style={{ paddingBottom: 0 }}>
                <GridColumn width={10} className="_citoyen_login_hero_section">
                  <Image src={Logo} className="_logo_hero_section" />
                  <div className="slogan blue">
                    <p className="text-white bold">A Simple Service</p>
                  </div>
                  <div className="slogan orange top">
                    <p className=" text-white ">For Better Society</p>
                  </div>
                </GridColumn>
                <GridColumn className="p-0 bg-default h-full" width={6}>
                  <FormCitoyen islogin={islogin} />
                </GridColumn>
              </GridRow>
            </Grid>
          </Container>
          <Container
            fluid
            className={
              islogin
                ? "_citoyen_login mobile m-0"
                : "_citoyen_login mobile full m-0"
            }
            style={{ height: "100%" }}
          >
            <div className="slogan blue">
              <p className="title text-white ">A Simple Service</p>
            </div>
            <div className="slogan orange">
              <p className="title text-white bold">For Better Society</p>
            </div>
            <div className="citoyen_mobile_container">
              <div className="row">
                <FormCitoyen islogin={islogin} />
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};
export default CitoyenAuth;
