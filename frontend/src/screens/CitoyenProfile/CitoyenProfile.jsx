import React, { useState, useEffect } from "react";
import { Grid, GridColumn, Container, Menu, Message} from "semantic-ui-react";

import InfosForm from "../../components/CitoyenInfosForm/CitoyenInfosForm.jsx"
import Card from "../../components/CitoyenCard/CitoyenCard.jsx";
import PasswordForm from "../../components/CitoyenPasswordForm/CitoyenPasswordForm.jsx"; 

import "./CitoyenProfile.css"

const CitoyenProfile = () => {
    const [activeItem, setActiveItem] = useState("info");
    const [isLogin, setIsLogin] = useState("null");
    useEffect(() => {
    //   console.log(localStorage);
      if (localStorage.getItem("token")) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }, []);
    
    const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
    };


    return (
        <>
        {isLogin ? (
        <main>
            
            <Container fluid>
                <Grid className="citoyen-profile">
                    <GridColumn className="left">
                        <Card/>
                    </GridColumn>
                    <GridColumn className="right">
                        <div className="edit-profile">
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
                                    {(activeItem==="info" && <InfosForm></InfosForm>)}
                                    {(activeItem==="password" && <PasswordForm></PasswordForm>)}
                                </div>
                            </div>
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
            <Container fluid className="mobile-profile">
                <Card/>
            </Container>
        
        </main> )
            : 
        (<div
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
                We're sorry you can't access this route
              </Message.Header>
              <p
                className="text-default title _margin_vertical_sm pointer "
                style={{
                  ccolor: "#912d2b",
                }}
              >
                Go to login page?<a href="/login">click here</a>
              </p>
            </Message>
          </div>)}
        </>
    );
};

export default CitoyenProfile;