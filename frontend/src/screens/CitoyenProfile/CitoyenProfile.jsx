import React from "react";
// import {Grid, GridColumn} from "semantic-ui-react";

import Header from "../../components/Header/Header.jsx";
import Card from "../../components/Card/Card.jsx";
import { Container } from "semantic-ui-react";


const CitoyenProfile = () => {
    return (
        <>
            <Header/>
            <main>
                <Container id="card">
                    <Card></Card>
                </Container>
            </main>
        </>
    );
};

export default CitoyenProfile;