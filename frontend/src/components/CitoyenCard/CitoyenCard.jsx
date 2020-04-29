import React ,{useState} from "react";
import {Image, Icon, Divider, Button, Input, Menu, Message, Form} from "semantic-ui-react";
import axios from "axios";

import pic from "./Untitled.png";

import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

import "./CitoyenCard.css";

import ValidateDataUpdateProfile from "../../methods/ValidateDataUpdateProfile.js";
import ValidateUpdatePassword from "../../methods/ValidateDataUpdatePass.js"; 


const Card = (props) => {

    const [isEdit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, seterror] = useState(null);
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [birthday, setbirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setaddress] = useState("");
    const [email, setEmail] = useState("");
    const [national_id, setnational_id] = useState("");
    const [currentPassword, setCurrentPassword] = useState({
        value: "",
        isPassword: true,
      });
      const [newPassword, setNewPassword] = useState({
        value: "",
        isPassword: true,
      });
      const [confirmPassword, setConfirmPassword] = useState({
        value: "",
        isPassword: true,
      });
      const handleShowPsw = (e) => {
        let id = e.currentTarget.attributes["data-id"].nodeValue;
        switch (id) {
          case "currentPassword":
            if (currentPassword.value.length > 0)
              setCurrentPassword((prevState) => {
                let isPass = !prevState.isPassword;
                return {
                  ...prevState,
                  isPassword: isPass,
                };
              });
            break;
          case "newPassword":
            if (newPassword.value.length > 0)
              setNewPassword((prevState) => {
                let isPass = !prevState.isPassword;
                return {
                  ...prevState,
                  isPassword: isPass,
                };
              });
            break;
          case "confirmPassword":
            if (confirmPassword.value.length > 0)
              setConfirmPassword((prevState) => {
                let isPass = !prevState.isPassword;
                return {
                  ...prevState,
                  isPassword: isPass,
                };
              });
            break;
          default:
            break;
        }
      };

      const handleInputChangeValue = (event) => {
        let value = event.currentTarget.value;
        let id = event.currentTarget.id;
        switch (id) {
          case "currentPassword":
            setCurrentPassword((prevState) => {
              return {
                ...prevState,
                value,
              };
            });
            break;
          case "newPassword":
            setNewPassword((prevState) => {
              return {
                ...prevState,
                value,
              };
            });
            break;
          case "confirmPassword":
            setConfirmPassword((prevState) => {
              return {
                ...prevState,
                value,
              };
            });
            break;
          default:
            break;
        }
      };

    const handleEdit = () => {
        setEdit((prevState) => !prevState);
    };
    
    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
    };

    const [activeItem, setActiveItem] = useState("info");
    const handleItemClick = (e) => {
        setActiveItem(e.currentTarget.attributes["data-name"].value);
    };

    const handleChangeInput = (e) => {
        if (error) seterror(false);
        let id = e.currentTarget.id;
        switch (id) {
          case "first_name":
            setfirst_name(e.currentTarget.value);
            break;
          case "last_name":
            setlast_name(e.currentTarget.value);
            break;
          case "email":
            setEmail(e.currentTarget.value);
            break;
          case "birthday":
            setbirthday(e.currentTarget.value);
            break;
          case "phone":
            setPhone(e.currentTarget.value);
            break;
          case "address":
            setaddress(e.currentTarget.value);
            break;
          case "national_id":
            setnational_id(e.currentTarget.value);
            break;
          default:
            break;
        }
      };

      const handleSumbit = () => {
        // let login = false;
        if (error) seterror(null);
        if (success) setSuccess(null);

        if (activeItem==="info"){
    
            var errorsPr = ValidateDataUpdateProfile({
                first_name,
                last_name,
                email,
                birthday,
                address,
                phone,
                national_id,
            });
        
            if (errorsPr.length > 0) {
            seterror(true);
            } else {
            setSuccess(true);
            UpdateInfosCitoyen();
            }
        }
        else {
            var errorsPa = ValidateUpdatePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            })

            if (errorsPa.length > 0){
                seterror(true);
            }
            else {
                setSuccess(true)
                UpdatePasswordCitoyen();
            }
        }
      };

    const UpdateInfosCitoyen = () => {
        setIsLoading(true);
        axios
          .post("http://13.92.195.8/api/", {
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            date_of_birth: birthday,
            address: address,
          })
          .then((res) => {
            setIsLoading(false);
          });
      };

    const UpdatePasswordCitoyen = () => {
        setIsLoading(true);
        axios
            .post("http://13.92.195.8/api/", {
                passowrd1 : currentPassword,
                password2 : newPassword,
            })
            .then((res) => {
                setIsLoading(false)
            });
    }

    return(
        <div
        className="card-citoyen">
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
                <Button className="secondary" onClick={handleEdit} disabled={isLoading}>
                    Cancel
                </Button>
                <Button className="primary" onClick={handleSumbit} loading={isLoading} type="submit">
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
                {!isEdit && <p className="_margin_vertical_sm title">User Citizen</p>}
                {isEdit && (
                    <div className="name-input margin_vertical_sm">
                    <Input
                    className="_profile_input_admin_mobile mobile-input name-field"
                    id = "first_name"
                    type="text"
                    value={first_name}
                    onChange={handleChangeInput}
                    placeholder ="First Name..."
                    />
                    <Input
                    id = "last_name"
                    className="_profiel_input_admin_mobile mobile-input name-field"
                    type = "text"
                    value={last_name}
                    onChange={handleChangeInput}
                    placeholder = "Family Name..."
                    />
                    </div>
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
                            <p className="small">u.user@esi-sba.dz</p>
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
                            <p className="small">123456789</p>
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
            {isEdit && <div className="row mobile_menu">
                            <Menu pointing secondary>
                                <Menu.Item
                                name="Update Infos"
                                data-name="info"
                                active={activeItem === "info"}
                                onClick={handleItemClick}
                                className="pointer"
                                />
                                <Menu.Item
                                name="Update Password"
                                data-name="password"
                                className="pointer"
                                active={activeItem === "password"}
                                onClick={handleItemClick}
                                />
                            </Menu>
                            {activeItem === "info" && (
                                <div className="col_mobile">
                                <Form
                                success = {success}
                                error = {error}>
                                <Input
                                    className="mobile-input"
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={handleChangeInput}
                                    placeholder="Email ..."
                                />
                                <Input
                                    className="mobile-input"
                                    type="text"
                                    id="birthday"
                                    value={birthday}
                                    onChange={handleChangeInput}
                                    placeholder = "Birthday ..."
                                />
                                <Input
                                    className="mobile-input"
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={handleChangeInput}
                                    placeholder="Address ..."
                                />
                                <Input
                                    className="mobile-input"
                                    type="text"
                                    id="phone"
                                    value={phone}
                                    onChange={handleChangeInput}
                                    placeholder = "Phone Number ..."
                                />
                                <Input
                                    className="mobile-input"
                                    type="text"
                                    id="national_id"
                                    value={national_id}
                                    onChange={handleChangeInput}
                                    placeholder = "National ID ..."
                                />
                                <Message error content="Please make sur to enter a valid data" />
                                <Message success content="Your infos update request has been sent successfully" />
                                </Form>
                                </div>
                            )}
                            {activeItem === "password" && (
                                <Form
                                success = {success}
                                error = {error}
                                >
                                    <div className="col_mobile">
                                        <div className="input_p">
                                        <Input
                                            id="currentPassword"
                                            className="mobile-input"
                                            value={currentPassword.value}
                                            type={currentPassword.isPassword ? "password" : "text"}
                                            onChange={handleInputChangeValue}
                                            placeholder="Current password"
                                        />
                                        <i
                                            className="eye icon pointer"
                                            data-id="currentPassword"
                                            onClick={handleShowPsw}
                                        />
                                        </div>
                                        <div className="input_p">
                                        <Input
                                            id="newPassword"
                                            className="mobile-input"
                                            value={newPassword.value}
                                            type={newPassword.isPassword ? "password" : "text"}
                                            onChange={handleInputChangeValue}
                                            placeholder="New password"
                                        />
                                        <i
                                            className="eye icon pointer"
                                            data-id="currentPassword"
                                            onClick={handleShowPsw}
                                        />
                                        </div>
                                        <div className="input_p">
                                        <Input
                                            id="confirpassword"
                                            className="mobile-input"
                                            value={confirmPassword.value}
                                            type={confirmPassword.isPassword ? "password" : "text"}
                                            onChange={handleInputChangeValue}
                                            placeholder="Confirm password"
                                        />
                                        <i
                                            className="eye icon pointer"
                                            data-id="currentPassword"
                                            onClick={handleShowPsw}
                                        />
                                        </div>
                                        <Message error content="Please make sur to enter a valid data" />
                                        <Message success content="Your infos update request has been sent successfully" />
                                    </div>
                                </Form>            
                            )}
                            
                </div>}
        </div>	    
    );
};

export default Card;