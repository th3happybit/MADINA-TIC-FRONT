import React, { useState, useEffect, useContext } from "react";
import { Image, Icon, Button, Input, Segment } from "semantic-ui-react";
import Axios from "axios";
import UserContext from "../../screens/Admin/AdminContext.jsx";

//? import css
import "./CardAdmin.css";

//? import components
import MenuProfileMobile from "./MenuProfileMobile.jsx";
import Avatar from "../../assets/images/avatar.png";

//? import icons
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

const CardAdmin = (props) => {
  const [isEdit, setEdit] = useState(false);
  const { data_user } = props;
  //? data inputs
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState("info");
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  //! componentdidmount
  useEffect(() => {
    setFirstName(data_user.first_name);
    setLastName(data_user.last_name);
    setEmail(data_user.email);
    setPhone(data_user.phone);
    setAddress(data_user.address);
    setBirthday(data_user.date_of_birth);
    setProfileImage(data_user.image);
  }, [data_user]);

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
  const handleEdit = () => {
    props.handlePictureUpdated();
    setEdit((prevState) => !prevState);
  };
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.attributes["data-name"].value);
  };
  const fileSelectedHandler = (event) => {
    props.handlePictureUpdated();
    setImage(event.target.files[0]);
    setUpload((prevState) => !prevState);
    props.updateImage(event.target.files[0]);
  };
  const uploadImageHandler = () => {
    setUpload((prevState) => !prevState);
    const formData = new FormData();
    formData.append("image", image, image.name);
    setCardLoading(true);
    Axios.create({
      headers: {
        patch: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("admin_token")}`,
        },
      },
    })
      .request({
        url: "https://madina-tic.ml/api/user/",
        method: "patch",
        data: formData,
      })
      .then((res) => {
        setProfileImage(res.data.image);
        setCardLoading(false);
        setUser((prevState) => !prevState);
      })
      .catch((err) => {});
  };
  const handleUpdate = () => {
    const formData = new FormData();
    if (props.pictureUpdated) {
      props.image && formData.append("image", props.image, props.image.name);
    }

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("date_of_birth", birthday);
    props.handlePictureUpdated();
    setIsLoading(true);
    if (activeItem === "info") {
      Axios.create({
        headers: {
          patch: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
        .request({
          url: "https://madina-tic.ml/api/user/",
          method: "patch",
          data: formData,
        })
        .then((res) => {
          setIsLoading(false);
          handleEdit();
          props.refresh();
        })
        .catch(() => setIsErr(true));
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
          handleEdit();
          props.refresh();
          setIsLoading(false);
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
    <>
      {data_user && (
        <Segment loading={cardLoading} className="_card_admin">
          <div
            className={
              !isEdit
                ? "_profile_img_edit mobile  pointer"
                : "_profile_img_edit mobile hide pointer"
            }
            onClick={handleEdit}
          >
            <Icon name="edit" size="big" />
          </div>
          <div className={upload ? "save_img" : "save_img hide"}>
            <Button className="button_primary" onClick={uploadImageHandler}>
              Télecharger
            </Button>
          </div>
          <div className={isEdit ? "_buttons_mobile " : "_buttons_mobile hide"}>
            <Button className="secondary" onClick={handleEdit}>
              Annuler
            </Button>
            <Button
              loading={isLoading}
              className="primary"
              onClick={handleUpdate}
            >
              Confirmer
            </Button>
          </div>
          <div
            className="_admin_profile_image"
            style={{
              border: isEdit ? "0" : "auto",
            }}
          >
            <div className="profile_">
              {profileImage ? <Image src={profileImage} /> : <Image src={Avatar} />}
              <div
                className={
                  isEdit
                    ? "_profile_img_edit  pointer"
                    : "_profile_img_edit hide pointer"
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
            {!isEdit && (
              <p className="_margin_vertical_sm title">
                {data_user.first_name + " " + data_user.last_name}
              </p>
            )}
            {isEdit && (
              <>
                <Input
                  className="_profile_input_admin_mobile"
                  type="text"
                  id="first_name"
                  value={first_name}
                  onChange={handleInputChange}
                  placeholder="Nom"
                />
                <Input
                  className="_profile_input_admin_mobile"
                  type="text"
                  value={last_name}
                  id="last_name"
                  placeholder="Prenom"
                  onChange={handleInputChange}
                />
              </>
            )}
          </div>
          {!isEdit && (
            <>
              <div className="row">
                {data_user.email && (
                  <div className="col">
                    <span className="small">
                      {" "}
                      <Icon name="mail" className="icon_card" /> Email
                    </span>
                    <p className="small">{data_user.email}</p>
                  </div>
                )}
                {data_user.date_of_birth && (
                  <div className="col">
                    <span className="small">
                      {" "}
                      <Icon name="birthday" className="icon_card" />{" "}
                      Anniversaire
                    </span>
                    <p className=" small">
                      {data_user ? data_user.date_of_birth : ""}
                    </p>
                  </div>
                )}
                {data_user.address && (
                  <div className="col">
                    <span className=" small">
                      {" "}
                      <Icon name="location arrow" className="icon_card" />{" "}
                      Adresse
                    </span>
                    <p className="small">{data_user.address}</p>
                  </div>
                )}
                {data_user.phone && (
                  <div className="col">
                    <span className="small">
                      {" "}
                      <Icon name="phone" className="icon_card" /> Numero
                    </span>
                    <p className="small">{data_user.phone}</p>
                  </div>
                )}
              </div>
              <div
                className="social_media_profile"
                style={{
                  visibility: "hidden",
                }}
              >
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
              </div>
            </>
          )}
          {isEdit && (
            <MenuProfileMobile
              email={email}
              phone={phone}
              address={address}
              birthday={birthday}
              handleInputChange={handleInputChange}
              isErr={isErr}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
              password={password}
              confirmPassword={confirmPassword}
              newPassword={newPassword}
              messageErr={messageErr}
            />
          )}
        </Segment>
      )}
    </>
  );
};
export default CardAdmin;
