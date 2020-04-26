import React from "react";
import {Image, Grid, Icon, Divider} from "semantic-ui-react";
import pic from "./Untitled.png";


import "./Card.css";


const Card = () => {
    return(
        <div>
            <Image src={pic} id="pic" circular className="_margin_vertical_sm"/>
            <p className="_margin_vertical_md">Mister Citizen</p>
            <Divider horizontal>General Infos</Divider>
            <Grid className="_margin_vertical_md">
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="mail"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p id="name">Email</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>gmail@gmail.com</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="birthday cake"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>Birthday</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>21/01/2186</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="map marker alternate"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>Address</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>21,t3sdq3</p>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Icon rotated={"clockwise"}name="phone"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>Phone Number</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>23488323</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Icon name="id card"/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <p>National ID</p>
                    </Grid.Column>
                    <Grid.Column>
                    <p>124364949</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid verticalAlign={true} className="_margin_vertical_sm">
                <Grid.Column width={2}>
                    <Icon color={"blue"} name="facebook f" size={"large"}/>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Icon color={"red"} name="google plus g" size={"large"}/>
                </Grid.Column>
                <Grid.Column width={2}>
                    <Icon color={"blue"} name="twitter" size={"large"}/>
                </Grid.Column>    
            </Grid>
        </div>
    );
};

export default Card;