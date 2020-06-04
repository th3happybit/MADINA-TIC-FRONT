import React, { useState, useEffect } from "react";
import {
  Image,
  Icon,
  Divider,
  Button,
  Input,
  Menu,
  Message,
  Form,
  Segment,
} from "semantic-ui-react";
import axios from "axios";

import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

import "./Card.css";

import ValidateDataUpdateProfile from "../../methods/ValidateDataUpdateProfile.js";
import ValidateUpdatePassword from "../../methods/ValidateDataUpdatePass.js";

const Card = (props) => {
  const { cit_infos, loading, service, token } = props;
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("info");
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const [errMessage, seterrMessage] = useState(null);
  const [image, setimage] = useState(null);
  const [upload, setUpload] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [updated, setupdated] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [birthday, setbirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [imageP, setimageP] = useState("");
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
  useEffect(() => {
    setfirst_name(cit_infos.first_name);
    setlast_name(cit_infos.last_name);
    setnational_id(cit_infos.national_id);
    setbirthday(cit_infos.date_of_birth);
    setEmail(cit_infos.email);
    setaddress(cit_infos.address);
    setPhone(cit_infos.phone);
    setimageP(cit_infos.image);
  }, [cit_infos, updated]);
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
    if (error) seterror(false);
    if (success) setSuccess(false);
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
    if (currentPassword.value !== "")
      setCurrentPassword({
        value: "",
        isPassword: true,
      });
    if (newPassword.value !== "")
      setNewPassword({
        value: "",
        isPassword: true,
      });
    if (confirmPassword.value !== "")
      setConfirmPassword({
        value: "",
        isPassword: true,
      });
    if (email !== cit_infos.email) setEmail(cit_infos.email);
    if (first_name !== cit_infos.first_name)
      setfirst_name(cit_infos.first_name);
    if (last_name !== cit_infos.last_name) setlast_name(cit_infos.last_name);
    if (national_id !== cit_infos.national_id)
      setnational_id(cit_infos.national_id);
    if (birthday !== cit_infos.date_of_birth)
      setbirthday(cit_infos.date_of_birth);
    if (address !== cit_infos.address) setaddress(cit_infos.address);
    if (phone !== cit_infos.phone) setPhone(cit_infos.phone);
    setEdit((prevState) => !prevState);
  };
  const fileSelectedHandler = (event) => {
    setimage(event.target.files[0]);
    setUpload((prevState) => !prevState);
  };
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };
  const handleChangeInput = (e) => {
    if (error) seterror(false);
    if (success) setSuccess(false);
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
    const formData = new FormData();
    if (image) formData.append("image", image, image.name);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("date_of_birth", birthday);
    formData.append("national_id", national_id);
    formData.append("phone", phone);

    if (error) seterror(null);
    if (success) setSuccess(null);

    if (activeItem === "info") {
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
        seterrMessage(errorsPr[0].value);
      } else {
        setIsLoading(true);
        axios
          .create({
            headers: {
              patch: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${localStorage.getItem(token)}`,
              },
            },
          })
          .request({
            url: "http://157.230.19.233/api/user/",
            method: "patch",
            data: formData,
          })
          .then((res) => {
            props.refresh(token);
            setSuccess(true);
            setIsLoading(false);
            setEdit(false);
          })
          .catch((err) => {
            seterror(true);
            setIsLoading(false);
            setEdit(false);
          });
      }
    } else {
      var errorsPa = ValidateUpdatePassword([
        currentPassword,
        newPassword,
        confirmPassword,
      ]);

      if (errorsPa.length > 0) {
        seterror(true);
        seterrMessage(errorsPa[0].error);
      } else {
        UpdatePassword();
      }
    }
  };
  const UpdatePassword = () => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/password/change/",
        method: "post",
        data: {
          old_password: currentPassword.value,
          new_passowrd1: newPassword.value,
          new_password2: confirmPassword.value,
        },
      })
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
        props.refresh(token);
      })
      .catch((err) => {
        let resErrOldPassword = err.response.data.old_password
          ? err.response.data.old_password[0]
          : "";
        let resErrNewPassw = err.response.data.new_password2
          ? err.response.data.new_password2[0]
          : "";
        if (resErrOldPassword !== "") {
          seterrMessage(resErrOldPassword);
        } else seterrMessage(resErrNewPassw);
        seterror(true);
        setIsLoading(false);
      });
  };
  const uploadImageHandler = () => {
    if (image) {
      setUpload((prevState) => !prevState);
      const formData = new FormData();
      formData.append("image", image, image.name);
      setCardLoading(true);
      axios
        .create({
          headers: {
            patch: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${localStorage.getItem(token)}`,
            },
          },
        })
        .request({
          url: "http://157.230.19.233/api/user/",
          method: "patch",
          data: formData,
        })
        .then((res) => {
          setimageP(res.data.image);
          setCardLoading(false);
          setupdated((prevState) => !prevState);
          props.refresh(token);
        })
        .catch((err) => {
          setCardLoading(false);
        });
    }
  };

  return (
    <>
      <Segment loading={loading ? true : cardLoading} className="_card shadow">
        {cit_infos && (
          <>
            <div
              className={
                !isEdit
                  ? "edit-profile-pic mobile  pointer"
                  : "edit-profile-pic mobile hide pointer"
              }
              onClick={handleEdit}
            >
              <Icon name="edit" size="big" />
            </div>
            <div className={upload ? "save_img" : "save_img hide"}>
              <Button className="button_primary" onClick={uploadImageHandler}>
                Upload
              </Button>
            </div>
            <div
              className={isEdit ? "_buttons_mobile " : "_buttons_mobile hide"}
            >
              <Button
                className="secondary"
                onClick={handleEdit}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                className="primary"
                onClick={handleSumbit}
                loading={isLoading}
                type="submit"
              >
                Done
              </Button>
            </div>
            <div
              className="_profile_picture"
              style={{
                border: isEdit ? "0" : "auto",
              }}
            >
              <div className="profile">
                <Image circular src={imageP} alt="" />
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
                    type="file"
                    accept="image/png, image/jpeg"
                    className="pointer"
                    onChange={fileSelectedHandler}
                  />
                </div>
              </div>
              {!isEdit && !loading && (
                <p className="_margin_vertical_sm title">
                  {cit_infos.first_name + " " + cit_infos.last_name}
                </p>
              )}
              {isEdit && (
                <div className="name-input margin_vertical_sm">
                  <Input
                    className="_profile_input_admin_mobile mobile-input name-field"
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={handleChangeInput}
                    placeholder="First Name..."
                  />
                  <Input
                    id="last_name"
                    className="_profiel_input_admin_mobile mobile-input name-field"
                    type="text"
                    value={last_name}
                    onChange={handleChangeInput}
                    placeholder="Family Name..."
                  />
                </div>
              )}
            </div>
            <Divider horizontal>Account Informations</Divider>
            {!isEdit && (
              <>
                <div className="row">
                  <div className="col">
                    <span className="small">
                      <Icon name="mail" className="icon_card" /> Email
                    </span>
                    <p className="small">{cit_infos.email}</p>
                  </div>
                  {!service && (
                    <div className="col">
                      <span className="small">
                        <Icon name="birthday" className="icon_card" /> Birthday
                      </span>
                      <p className=" small">{cit_infos.date_of_birth}</p>
                    </div>
                  )}
                  <div className="col">
                    <span className=" small">
                      <Icon name="map marker alternate" className="icon_card" />{" "}
                      Address
                    </span>
                    <p className="small">{cit_infos.address}</p>
                  </div>
                  <div className="col">
                    <span className="small">
                      <Icon
                        name="phone"
                        flipped={"horizontally"}
                        className="icon_card"
                      />{" "}
                      Phone Number
                    </span>
                    <p className="small">{cit_infos.phone}</p>
                  </div>
                  {!service && (
                    <div className="col">
                      <span className="small">
                        <Icon name="id card" className="icon_card" /> National
                        ID
                      </span>
                      <p className="small">{cit_infos.national_id}</p>
                    </div>
                  )}
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
            {isEdit && (
              <div className="row mobile_menu">
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
                    <Form success={success} error={error}>
                      <Input
                        className="mobile-input"
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleChangeInput}
                        placeholder="Email ..."
                      />
                      {!service && (
                        <Input
                          className="mobile-input"
                          type="date"
                          id="birthday"
                          value={birthday}
                          onChange={handleChangeInput}
                          placeholder="Birthday ..."
                        />
                      )}
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
                        placeholder="Phone Number ..."
                      />
                      {!service && <Input
                        className="mobile-input"
                        type="text"
                        id="national_id"
                        value={national_id}
                        onChange={handleChangeInput}
                        placeholder="National ID ..."
                      />}
                      <Message
                        error
                        content="Please make sur to enter a valid data"
                      />
                      <Message
                        success
                        content="Your infos update request has been sent successfully"
                      />
                    </Form>
                  </div>
                )}
                {activeItem === "password" && (
                  <Form success={success} error={error}>
                    <div className="col_mobile">
                      <div className="input_p">
                        <Input
                          id="currentPassword"
                          className="mobile-input"
                          value={currentPassword.value}
                          type={
                            currentPassword.isPassword ? "password" : "text"
                          }
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
                          id="confirmPassword"
                          className="mobile-input"
                          value={confirmPassword.value}
                          type={
                            confirmPassword.isPassword ? "password" : "text"
                          }
                          onChange={handleInputChangeValue}
                          placeholder="Confirm password"
                        />
                        <i
                          className="eye icon pointer"
                          data-id="currentPassword"
                          onClick={handleShowPsw}
                        />
                      </div>
                      <Message error content={errMessage} />
                      <Message
                        success
                        content="Your infos update request has been sent successfully"
                      />
                    </div>
                  </Form>
                )}
              </div>
            )}
          </>
        )}
      </Segment>
    </>
  );
};
export default Card;