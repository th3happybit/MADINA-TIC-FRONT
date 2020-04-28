import React ,{useState} from "react";
import {Image, Icon, Divider, Button, Input} from "semantic-ui-react";

import pic from "./Untitled.png";

import MenuProfileMobile from "./MenuProfileMobile.jsx";

import { ReactComponent as Edit } from "../../assets/icons/edit.svg";



import "./CitoyenCard.css";





const Card = (props) => {

    const [isEdit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit((prevState) => !prevState);
    };
    
    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
    };

    return(
        <div className="card-citoyen">
            <div className={
                    !isEdit
                        ? "edit-profile-pic mobile  pointer"
                        : "edit-profile-pic mobile hide pointer"
                    }
                    onClick={handleEdit}
                >
                    <Icon name="edit" size="big" />
            </div>
            <div className={isEdit ? "_buttons_mobile " : "_buttons_mobile hide"}>
                <Button className="secondary" onClick={handleEdit}>
                    Cancel
                </Button>
                <Button className="primary" onClick={handleEdit}>
                    Done
                </Button>
            </div>
            <div
                className="citoyen-profile-pic"
                style={{
                border: isEdit ? "0" : "auto",
                }}
            >
            <div className="profile">
                <Image circular src={pic} alt="" />
                <div
                    className={
                    isEdit
                    ? "edit-profile-pic pointer"
                        : "edit-profile-pic hide pointer"
                    }
                >
                    <label htmlFor="myInput" className="pointer">
                        <Edit className="pointer" />
                    </label>
                    <input
                    id="myInput"
                    style={{ display: "none" }}
                    type={"file"}
                    className="pointer"
                    onChange={fileSelectedHandler}
                    />
                </div>
            </div>
                {!isEdit && <p className="_margin_vertical_sm title">Cherkess Lite</p>}
                {isEdit && (
                    <Input
                    className="_profile_input_admin_mobile"
                    type="text"
                    value="Cherkess LIte"
                    />
                )}
            </div>
            <Divider horizontal>Citizen Informations</Divider>
            {!isEdit && (
                <>
                    <div className="row">
                        <div className="col">
                            <span className="small">
                                <Icon name="mail" className="icon_card" /> Email
                            </span>
                            <p className="small">l.cherkess@esi-sba.dz</p>
                        </div>
                        <div className="col">
                            <span className="small">
                                <Icon name="birthday" className="icon_card" /> Birthday
                            </span>
                            <p className=" small">30/02/0001</p>
                        </div>
                        <div className="col">
                            <span className=" small">
                                <Icon name="map marker alternate" className="icon_card" /> Address
                            </span>
                            <p className="small">Homeless</p>
                        </div>
                        <div className="col">
                            <span className="small">
                                <Icon name="phone" flipped={"horizontally"}className="icon_card" /> Phone Number
                            </span>
                            <p className="small">+213 123456789</p>
                        </div>
                        <div className="col">
                            <span className="small">
                                <Icon name="id card" className="icon_card" /> National ID
                            </span>
                            <p className="small">6969696969</p>
                        </div>
                    </div>
                    <div className="social-media">
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
                </>
            )}
            {isEdit && <MenuProfileMobile />}
        </div>	    
    );
};

export default Card;