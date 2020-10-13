import React, { useState, useEffect, useContext } from "react";
import { Image, Dropdown } from "semantic-ui-react";
import UserContext from "../../screens/Maire/MaireContext.jsx";

import { useHistory } from "react-router";
import axios from "axios";
//? import css
import "./MaireHeader.css";

//? import icons and images
import Avatar from "../../assets/images/avatar.png";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

import { Link } from "react-router-dom";
import Pusher from "pusher-js";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

import moment from "moment";
const HeaderAdmin = (props) => {
  const { isUploaded } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [isNotifated, setIsNotifated] = useState(false);
  const [data, setData] = useState([]);
  const { imageP } = props;
  useEffect(() => {
    const pusher = new Pusher("eb1d3c82c04cfd3f2990", {
      cluster: "eu",
      authEndpoint: "https://madina-tic.ml/api/pusher/auth",
    });
    var channel = pusher.subscribe("Declaration");
    var rapport_channel = pusher.subscribe("Report");
    var annonceChannel = pusher.subscribe("Announce");
    rapport_channel.bind("Creation", function ({ message }) {
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
    channel.bind("Creation", function ({ message }) {
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
    return()=>{
      pusher.disconnect();
    }
  }, []);

  useEffect(() => {
    if (imageP) setImage(imageP);
  }, [imageP]);

  useEffect(() => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setImage(res.data.image);
        setIsNotifated(res.data.notif_seen);
        setFullname(res.data.first_name + " " + res.data.last_name);
        if (res.data.notif_seen) {
          setIsNotifated(false);
        } else {
          setIsNotifated(true);
        }
        let instance = axios.create({
          baseURL: "https://madina-tic.ml/api/",
          responseType: "json",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        });
        instance
          .get(`notifications/?maire=${res.data.uid}&ordering=-created_on`)
          .then((res) => {
            setData(res.data.results);
          })
          .catch((err) => { });
      })
      .catch((err) => { });
  }, [isUploaded]);
  const handleChangeNotif = () => {
    if (isNotifated) {
      axios
        .create({
          headers: {
            patch: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("maire_token")}`,
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
        .catch((err) => {
          setIsNotifated(false);
        });
    }
  };
  const trigger = (
    <Image src={image ? image : Avatar} size="small" className="pointer" />
  );

  const history = useHistory();

  const handleLogout = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.removeItem("maire_token");
        return history.push("/maire/login");
      })
      .catch((err) => { });
  };

  return (
    <>
      <header className="_header_maire">
        <div className="row">
          <div className="right_part">
            <div className="profile_img">
              {" "}
              <SemanticToastContainer className="container_toastr_service" />{" "}
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
                  className={props.isFrench ? " dd" : " dd"}
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
              <Dropdown
                trigger={trigger}
                pointing="top right"
                icon={null}
                onCLick={handleLogout}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Compte"
                    icon="user"
                    as={Link}
                    to="/maire/profile"
                  />
                  <Dropdown.Item
                    text="Déconnexion"
                    icon="sign out"
                    onClick={handleLogout}
                  />
                </Dropdown.Menu>
              </Dropdown>
              <p className="_name text-default medium-text">{fullname}</p>
            </div>
          </div>
        </div>
        <div className="row mobile">
          <Logo className="_header_logo" />
          <Toggle className="_header_logo pointer" onClick={props.show} />
        </div>
      </header>
    </>
  );
};
export default HeaderAdmin;
