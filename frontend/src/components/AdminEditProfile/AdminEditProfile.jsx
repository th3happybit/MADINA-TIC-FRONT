import React, { useState, useEffect } from "react";
import { Menu, Button } from "semantic-ui-react";

//? import css
import "./AdminEditProfile.css";

//? import components
import PasswordForm from "./PasswordForm.jsx";
import InfosForm from "./InfosForm.jsx";
import Axios from "axios";

const AdminEditProfile = (props) => {
  const { data_user } = props;

  //? for the active item of the menu ... by the default the info is the active one
  const [activeItem, setActiveItem] = useState("info");
  const [isShow, setisShow] = useState(false);
  //? data inputs
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageErr, setMessageErr] = useState("");

  //! componentdidmount
  useEffect(() => {
    setFirstName(data_user.first_name);
    setLastName(data_user.last_name);
    setEmail(data_user.email);
    setPhone(data_user.phone);
    setAddress(data_user.address);
    setBirthday(data_user.date_of_birth);
  }, [data_user]);

  //? handle input changes
  const handleInputChange = (e) => {
    if (isErr) setIsErr(false);
    let value = e.currentTarget.value;
    let id = e.currentTarget.attributes.id.value;

    switch (id) {
      case "first_name":
        setFirstName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "new_password":
        setNewPassword(value);
        break;
      case "confirm_password":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  //? change the active element of the menu on clicking
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };
  const handleEditShowing = () => {
    if (password !== "") setPassword("");
    if (setNewPassword !== "") setNewPassword("");
    if (setConfirmPassword !== "") setConfirmPassword("");
    if (isErr) {
      setIsErr(false);
      setFirstName(data_user.first_name);
      setLastName(data_user.last_name);
      setEmail(data_user.email);
      setPhone(data_user.phone);
      setAddress(data_user.address);
      setBirthday(data_user.date_of_birth);
    } else {
      if (first_name !== data_user.first_name)
        setFirstName(data_user.first_name);
      if (last_name !== data_user.last_name) setLastName(data_user.last_name);
      if (data_user.email !== email) setEmail(data_user.email);
      if (phone !== data_user.phone) setPhone(data_user.phone);
      if (address !== data_user.address) setAddress(data_user.address);
      if (birthday !== data_user.date_of_birth)
        setBirthday(data_user.date_of_birth);
    }
    setisShow((prevState) => !prevState);
  };

  const handleUpdate = () => {
    setIsLoading(true);
    if (activeItem === "info") {
      Axios.create({
        headers: {
          put: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
        .request({
          url: "https://madina-tic.ml/api/user/",
          method: "put",
          data: {
            first_name,
            last_name,
            email,
            address,
            phone,
            date_of_birth: birthday,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setisShow((prevState) => !prevState);
          props.refresh();
        })
        .catch((err) => {
          setIsLoading(false);
          setIsErr(true);
        });
    } else {
      Axios.create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
        .request({
          url: "https://madina-tic.ml/api/password/change/",
          method: "post",
          data: {
            new_password1: newPassword,
            new_password2: confirmPassword,
            old_password: password,
          },
        })
        .then((res) => {
          setIsLoading(false);
          handleEditShowing();
          props.refresh();
        })
        .catch((err) => {
          let resErrOldPassword = err.response.data.old_password
            ? err.response.data.old_password[0]
            : "";
          let resErrNewPassw = err.response.data.new_password2
            ? err.response.data.new_password2[0]
            : "";
          if (resErrOldPassword !== "") {
            setMessageErr(resErrOldPassword);
          } else setMessageErr(resErrNewPassw);
          setIsErr(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="_admin_edit_profile shadow">
      <div className="_info_menu">
        <Menu pointing secondary>
          <Menu.Item
            data-name="info"
            name="Mettre à jour les informations"
            active={activeItem === "info"}
            onClick={handleItemClick}
          />
          <Menu.Item
            data-name="password"
            name="Mettre à jour le mot de passe"
            active={activeItem === "password"}
            onClick={handleItemClick}
          />
        </Menu>
        <div className="_form_profile_informations">
          {activeItem === "info" && (
            <InfosForm
              isShow={isShow}
              first_name={first_name}
              last_name={last_name}
              email={email}
              phone={phone}
              address={address}
              birthday={birthday}
              handleInputChange={handleInputChange}
              isErr={isErr}
            />
          )}
          {activeItem === "password" && (
            <PasswordForm
              isShow={isShow}
              password={password}
              confirmPassword={confirmPassword}
              newPassword={newPassword}
              handleInputChange={handleInputChange}
              isErr={isErr}
              messageErr={messageErr}
            />
          )}
          {isShow && (
            <div className="_button_edit_profile">
              <Button className="button_secondary " onClick={handleEditShowing}>
                Annuler
              </Button>
              <Button
                loading={isLoading}
                className="button_primary"
                onClick={handleUpdate}
              >
                Confirmer
              </Button>
            </div>
          )}
          {!isShow && (
            <div className="_button_edit_profile" onClick={handleEditShowing}>
              <Button className="button_primary ">Editer</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminEditProfile;
