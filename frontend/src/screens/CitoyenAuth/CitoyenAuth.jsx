import React, { useState, useEffect } from "react";
import { Container, Grid, GridRow, GridColumn, Image } from "semantic-ui-react";

import { useHistory } from "react-router";
//?import css
import "./CitoyenAuth.css";

//? import logo
import Logo from "../../assets/images/logo_hero.png";

//? import Form
import FormCitoyen from "../../components/FormCitoyen/FormCitoyen.jsx";

//? import header
import CitoyenHeader from "../../components/CitoyenHeader/CitoyenHeader.jsx";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { change_language } from "../../actions/languageAction";

const CitoyenAuth = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    }
  }, []);
  const [isLoading, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded((prevState) => !prevState);
  }, []);
  const { islogin } = props; //* if screen is for Login or Signup
  return (
    <>
      <CitoyenHeader login={false} isFrench={props.language.isFrench}/>
      {isLoading ? (
        <div
          style={{
            paddingTop: "66px",
          }}
        >
          <Container
            fluid
            className={
              props.language.isFrench ? "_citoyen_login" : "_citoyen_login rtl"
            }
          >
            <Grid style={{ height: "100%" }}>
              <GridRow style={{ paddingBottom: 0 }}>
                <GridColumn width={10} className="_citoyen_login_hero_section">
                  <Image src={Logo} className="_logo_hero_section" />
                  <div className="slogan blue">
                    <p className="text-white bold">
                      {props.language.isFrench
                        ? "Un Service Simple"
                        : "خدمة بسيطة"}
                    </p>
                  </div>
                  <div className="slogan orange top">
                    <p className=" text-white ">
                      {props.language.isFrench
                        ? "Pour Une Société Meilleure"
                        : "من أجل مجتمع أفضل"}
                    </p>
                  </div>
                </GridColumn>
                <GridColumn className="p-0 bg-default h-full" width={6}>
                  <FormCitoyen islogin={islogin} isFrench={props.language.isFrench}/>
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
              <p className="title text-white ">
                {props.language.isFrench ? "Un Service Simple" : "خدمة بسيطة"}
              </p>
            </div>
            <div className="slogan orange">
              <p className="title text-white bold">
                {props.language.isFrench
                  ? "Pour Une Société Meilleure"
                  : "من أجل مجتمع أفضل"}
              </p>
            </div>
            <div className="citoyen_mobile_container">
              <div className="row">
                <FormCitoyen islogin={islogin} />
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
};
CitoyenAuth.propTypes = {
  language: PropTypes.object.isRequired,
  change_language: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps, { change_language })(CitoyenAuth);
