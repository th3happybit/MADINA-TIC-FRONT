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
import Avatar from "../../assets/images/avatar.png";
import { ReactComponent as Logo } from "../../assets/images/logo_vectorized.svg";
import { ReactComponent as Logo_dark } from "../../assets/images/logo_inverted.svg";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";
import { useHistory } from "react-router";
import axios from "axios";

import Pusher from "pusher-js";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import moment from "moment";
//? import css
import "./CitoyenHeader.css";

export default function CitoyenHeader(props) {
  const history = useHistory();
  const [fullname, setfullname] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [isNotifated, setIsNotifated] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const pusher = new Pusher("eb1d3c82c04cfd3f2990", {
      cluster: "eu",
      authEndpoint: "https://madina-tic.ml/api/pusher/auth",
    });
    var channel = pusher.subscribe("Declaration");
    var annonceChannel = pusher.subscribe("Announce");
    annonceChannel.bind("Creation", function ({ message }) {
      setIsNotifated(true);
      return toast({
        type: "info",
        icon: "info",
        title: message.title,
        description: message.body,
        time: 5000,
        onDismiss: () => {
          setIsNotifated(false);
        },
      });
    });
    channel.bind("Rejection", function ({ message }) {
      setIsNotifated(true);
      return toast({
        type: "info",
        icon: "info",
        title: message.title,
        description: message.body,
        time: 5000,
        onDismiss: () => {
          setIsNotifated(false);
        },
      });
    });
    channel.bind("Complement", function ({ message }) {
      setIsNotifated(true);
      return toast({
        type: "info",
        icon: "info",
        title: message.title,
        description: message.body,
        time: 5000,
        onDismiss: () => {
          setIsNotifated(false);
        },
      });
    });
    channel.bind("Update", function ({ message }) {
      if (message.status === "draft" || message.status === "archived" || message.status === "not_validated") {
        return true
      } else {
        setIsNotifated(true);
        return toast({
          type: "info",
          icon: "info",
          title: message.title,
          description: message.body,
          time: 5000,
          onDismiss: () => {
            setIsNotifated(false);
          },
        });
      }
    });
    return ()=>{
      pusher.disconnect();
    }
  }, []);
  useEffect(() => {
    getNotif();
    setfullname(props.fullname);
    setImage(props.image);
  }, [props.fullname, props.image, isNotifated, props.uid]);

  const getNotif = () => {
    if (props.uid) {
      let instance = axios.create({
        baseURL: "https://madina-tic.ml/api/",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      instance
        .get(`notifications/?citoyen=${props.uid}&ordering=-created_on`)
        .then((res) => {
          setData(res.data.results);
        })
        .catch((err) => { });
    }
  };
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
        url: "https://madina-tic.ml/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.removeItem("token");
        return history.push("/login");
      })
      .catch((err) => { });
  };
  useEffect(() => {
    setIsNotifated(props.seen);
  }, [props.seen]);
  const trigger = (
    <div
      style={{
        display: "flex",
      }}
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <Image src={image ? image : Avatar} size="small" className="pointer" />
      <p className="medium-text text-default _margin_horizontal_xs">
        {fullname}
      </p>
    </div>
  );
  const handleChangeNotif = () => {
    if (isNotifated) {
      axios
        .create({
          headers: {
            patch: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          },
        })
        .request({
          url: "https://madina-tic.ml/api/user/",
          method: "patch",
          data: {
            notif_seen: true,
          },
        })
        .then((res) => {
          setIsNotifated(false);
        })
        .catch((err) => { });
    }
  };
  return (
    <div className={`_citoyen_header ${isDark ? "dark" : ""}`}>
      <header>
        {login && (
          <div className="toggle_citoyen">
            <Toggle onClick={props.show} />
          </div>
        )}
        <div className="_citoyen_header_logo">
          <Link to={login ? "/home" : "/"}>
            <div className="_madinatic_logo">
              {isDark ? <Logo_dark /> : <Logo />}
              <p className="large-title text-active ">MADINA-TIC</p>
            </div>
          </Link>
          <div className="form_search_header_citoyen">
          </div>
          {!login && (
            <div className={`not_login_nav ${props.isFrench ? "" : "ar"}`}>
              <a
                href="/login"
                style={{
                  fontSize: "1rem",
                  color: "#f66a29",
                  fontWeight: "600",
                }}
                className="pointer"
              >
                {props.isFrench ? "S'identifier" : "تسجيل الدخول"}
              </a>
              <Button
                href="/signup"
                as="a"
                className={`login_cit ${props.isFrench ? "" : "ar"}`}
              >
                {props.isFrench ? "Créer un compte" : "أنشئ حسابا"}
              </Button>
            </div>
          )}
          <SemanticToastContainer className="container_toastr" />
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
                    onClick={handleChangeNotif}
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
                            <p>{moment(elm.created_on).fromNow()}</p>
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
