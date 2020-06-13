import React, { useState, useEffect } from "react";
import {
  Search,
  Image,
  Button,
  Dropdown,
  Radio,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/logo_vectorized.svg";
import { ReactComponent as Logo_dark } from "../../assets/images/logo_inverted.svg";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";
import { useHistory } from "react-router";
import axios from "axios";
//? import css
import "./CitoyenHeader.css";

export default function CitoyenHeader(props) {
  const history = useHistory();
  const [fullname, setfullname] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [isNotifated, setIsNotifated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleNotificated = () => {
    setIsNotifated((prevState) => !prevState);
  };
  useEffect(() => {
    setfullname(props.fullname);
    setImage(props.image);
  }, [props.fullname, props.image]);
  const { login, isDark } = props;
  const handleLogout = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "https://www.madina-tic.ml/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.removeItem("token");
        return history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const trigger = (
    <div
      style={{
        display: "flex",
      }}
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <Image src={image} size="small" className="pointer" />
      <p className="medium-text text-default _margin_horizontal_xs">
        {fullname}
      </p>
    </div>
  );
  return (
    <div className={`_citoyen_header ${isDark ? "dark" : ""}`}>
      <header>
        {login && (
          <div className="toggle_citoyen">
            <Toggle onClick={props.show} />
          </div>
        )}

        <div className="_citoyen_header_logo">
          <div className="_madinatic_logo">
            {isDark ? <Logo_dark /> : <Logo />}
            <p className="large-title text-active ">MADINA-TIC</p>
          </div>
          <div className="form_search_header_citoyen">
            {login && (
              <Search
                input={{
                  icon: "search",
                  iconPosition: props.isFrench ? "left" : "right",
                }}
                className={props.isFrench ? "_ltr" : "_rtl"}
                placeholder={props.isFrench ? "chercher" : "بحث"}
              />
            )}
          </div>
          {!login && (
            <div className="not_login_nav">
              <a
                href="/login"
                style={{
                  fontSize: "1rem",
                  color: "#f66a29",
                  fontWeight: "600",
                }}
                className="pointer "
              >
                Login
              </a>
              <Button href="/signup" as="a" className="login_cit ">
                Create an account
              </Button>
            </div>
          )}
          {login && (
            <>
              <Dropdown
                trigger={
                  <Notification
                    className={
                      isNotifated
                        ? "_margin_horizontal_md pointer notificated"
                        : "_margin_horizontal_md pointer"
                    }
                  />
                }
                pointing="top right"
                icon={null}
              >
                <Dropdown.Menu
                  style={{
                    width: "180px",
                  }}
                  className={props.isFrench ? "_ltr dd" : "_rtl dd"}
                >
                  <Dropdown.Item className="item_notif">
                    <div className="notif_item">
                      <div className="row">
                        {" "}
                        <h4>Declaration Validated</h4>
                        <p>Just now</p>
                      </div>
                      <p>your declaration of fuite de gaz is validated</p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="item_notif">
                    <div className="notif_item">
                      <div className="row">
                        {" "}
                        <h4>Declaration Validated</h4>
                        <p>Just now</p>
                      </div>
                      <p>your declaration of fuite de gaz is validated</p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="item_notif">
                    <div className="notif_item">
                      <div className="row">
                        {" "}
                        <h4>Declaration Validated</h4>
                        <p>Just now</p>
                      </div>
                      <p>your declaration of fuite de gaz is validated</p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="item_notif">
                    <div className="notif_item">
                      <div className="row">
                        {" "}
                        <h4>Declaration Validated</h4>
                        <p>Just now</p>
                      </div>
                      <p>your declaration of fuite de gaz is validated</p>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className="profile_citoyen_img pointer">
                <Dropdown
                  trigger={trigger}
                  pointing="top right"
                  icon={null}
                  simple
                >
                  <Dropdown.Menu
                    style={{
                      width: "220px",
                    }}
                    className={props.isFrench ? "_ltr" : "_rtl"}
                  >
                    <Dropdown.Item
                      text={props.isFrench ? "Compte" : "الحساب"}
                      icon="user"
                      as={Link}
                      to="/citoyen/profile"
                    />

                    <Dropdown.Item
                      text={props.isFrench ? "Déconnexion" : "خروج"}
                      icon="sign out"
                      onClick={handleLogout}
                    />

                    <Dropdown.Item
                      style={{
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "space-between",
                      }}
                    >
                      <div className="dark_trigger">
                        <Icon
                          name="moon"
                          style={{ marginRight: ".78571429rem" }}
                        />
                        {props.isFrench ? "Mode Sombre" : "الوضع المظلم"}
                      </div>
                      <Radio
                        toggle
                        checked={props.isDark}
                        onClick={props.change_mode}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
