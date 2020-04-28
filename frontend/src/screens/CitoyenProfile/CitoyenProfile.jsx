import React, { useState } from "react";
import { Grid, GridColumn, Container, Menu, Button} from "semantic-ui-react";

import InfosForm from "../../components/CitoyenInfosForm/CitoyenInfosForm.jsx"
import Card from "../../components/CitoyenCard/CitoyenCard.jsx";
import PasswordForm from "../../components/CitoyenPasswordForm/CitoyenPasswordForm.jsx"; 

import "./CitoyenProfile.css"



const CitoyenProfile = () => {
    const [activeItem, setActiveItem] = useState("info");
    const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
    };
    return (
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
                                <div id="subs" className="_margin_vertical_md">
                                    <Button className="button_secondary">Cancel</Button>
                                    <Button className="button_primary">Save</Button>
                                </div>
                            </div>
                        </div>
                    </GridColumn>
                </Grid>
            </Container>
            <Container fluid className="mobile-profile">
                <Card/>
            </Container>
        </main>
    );
};

export default CitoyenProfile;