import React, { useState, useEffect, useContext } from "react";
import { Image, Dropdown } from "semantic-ui-react";
import UserContext from "../../screens/Maire/MaireContext.jsx";

import { useHistory } from "react-router";
import axios from "axios";
//? import css
import "./MaireHeader.css";

//? import icons and images
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

import { Link } from "react-router-dom";
//sfc shortcutpro
const HeaderAdmin = (props) => {
  const { isUploaded } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [isNotifated, setIsNotifated] = useState(false);
  const [data, setData] = useState([]);

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
        url: "https://www.madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setImage(res.data.image);
        setFullname(res.data.first_name + " " + res.data.last_name);
      })
      .catch((err) => console.log(err));
  }, [isUploaded]);
  const trigger = <Image src={image} size="small" className="pointer" />;

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
        url: "https://www.madina-tic.ml/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.removeItem("maire_token");
        return history.push("/maire/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header className="_header_maire">
        <div className="row">
          <div className="right_part">
            <div className="profile_img">
              {" "}
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
              <Dropdown
                trigger={trigger}
                pointing="top right"
                icon={null}
                onCLick={handleLogout}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="Account"
                    icon="user"
                    as={Link}
                    to="/maire/profile"
                  />
                  <Dropdown.Item
                    text="Sign Out"
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
