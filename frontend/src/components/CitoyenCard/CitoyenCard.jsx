import React from "react";
import {Image, Icon, Divider} from "semantic-ui-react";
import pic from "./Untitled.png";


import { ReactComponent as Edit } from "../../assets/icons/edit.svg";



import "./CitoyenCard.css";


const Card = () => {
    return(
        <div className="card-citoyen">
            <div className="citoyen-profile-pic">
                <div className="profile">
                    <Image circular src={pic} alt="" />
                    <div className="edit-profile-pic pointer">
                        <label htmlFor="myInput" className="pointer">
                        <Edit className="pointer" />
                        </label>
                        <input
                        id="myInput"
                        style={{ display: "none" }}
                        type={"file"}
                        className="pointer"
                        />
                    </div>
                </div>
                    <p className="title _margin_vertical_sm">cherkess Lite</p>
                </div>
                <Divider horizontal>Citizen Informations</Divider>
                <div className="row">
                    <div className="col">
                        <span className="small">
                            <Icon name="mail" className="icon_card" /> Email
                        </span>
                        <p className="small">cherkess@esi-sba.dz</p>
                    </div>
                    <div className="col">
                        <span className="small">
                            <Icon name="birthday" className="icon_card" /> Birthday
                        </span>
                        <p className=" small">30/02/0001</p>
                    </div>
                    <div className="col">
                        <span className=" small">
                            <Icon name="location arrow" className="icon_card" /> Address
                        </span>
                        <p className="small">Homeless</p>
                    </div>
                    <div className="col">
                        <span className="small">
                            <Icon name="phone" flipped={"horizontally"} className="icon_card" /> Phone
                        </span>
                        <p className="small">+213 547895421</p>
                    </div>
                    <div className="col">
                        <span className="small">
                            <Icon name="id card" className="icon_card" /> National ID
                        </span>
                        <p className="small">6969696969</p>
                    </div>
                </div>
                <div className="social_media_profile">
                    <Icon
                    name="facebook f"
                    size="big"
                    style={{
                        color: "#385898",
                    }}
                    className="_margin_horizontal_sm"
                    />
                    <Icon
                    name="google plus g"
                    size="big"
                    style={{
                        color: "#DD4B39",
                    }}
                    className="_margin_horizontal_sm"
                    />
                    <Icon
                    name="twitter"
                    size="big"
                    style={{
                        color: "#1da1f2",
                    }}
                    className="_margin_horizontal_sm"
                    />
                </div>
                </div>
    );
};

export default Card;