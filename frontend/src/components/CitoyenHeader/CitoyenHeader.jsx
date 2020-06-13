import React, { useState, useEffect } from "react";
import { Search, Image, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";
import { useHistory } from "react-router";
import axios from "axios";
import Pusher from "pusher-js";

//? import css
import "./CitoyenHeader.css";

export default function CitoyenHeader(props) {
  const history = useHistory();
  const [fullname, setfullname] = useState("");
  const [image, setImage] = useState("");
  const [isNotifated, setIsNotifated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [data, setData] = useState([]);

  const handleNotificated = () => {
    setIsNotifated((prevState) => !prevState);
  };

  useEffect(() => {
    getNotif();
    setfullname(props.fullname);
    setImage(props.image);
  }, [props.fullname, props.image, isNotifated, props.uid]);
  const getNotif = () => {
    if (props.uid) {
      let instance = axios.create({
        baseURL: "http://madina-tic.ml/api/",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      instance
        .get(`notifications/?citoyen=${props.uid}&maire=null`)
        .then((res) => {
          setData(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const { login } = props;
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
  const pusher = new Pusher("eb1d3c82c04cfd3f2990", {
    cluster: "eu",
    authEndpoint: "http://madina-tic.ml/api/pusher/auth",
  });
  var DeclarationChannel = pusher.subscribe("Declaration");
  DeclarationChannel.bind("Complement", function (data) {
    setIsNotifated(true);
  });

  const trigger = (
    <div
      style={{
        display: "flex",
      }}
    >
      <Image src={image} size="small" className="pointer" />
      <p className="medium-text text-default _margin_horizontal_xs">
        {fullname}
      </p>
    </div>
  );
  return (
    <div className={!login ? "_citoyen_header " : "_citoyen_header"}>
      <header>
        {login && (
          <div className="toggle_citoyen">
            <Toggle onClick={props.show} />
          </div>
        )}

        <div className="_citoyen_header_logo">
          <div className="_madinatic_logo">
            <Logo />
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
                    onClick={() => setIsNotifated(false)}
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
                  {data.length > 0 &&
                    data.map((elm, index) => (
                      <Dropdown.Item key={index} className="item_notif">
                        <div className="notif_item">
                          <div className="row">
                            <h4>{elm.title}</h4>
                            <p>{elm.created_on}</p>
                          </div>
                          <p>{elm.body}</p>
                        </div>
                      </Dropdown.Item>
                    ))}
                  {data.length === 0 && (
                    <Dropdown.Item className="item_notif">
                      <p>Pas de notifications disponible</p>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <div className="profile_citoyen_img pointer">
                <Dropdown trigger={trigger} pointing="top right" icon={null}>
                  <Dropdown.Menu
                    style={{
                      width: "180px",
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
