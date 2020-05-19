import React, { useState, useEffect } from "react";
import { Search, Image, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
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
  useEffect(() => {
    setfullname(props.fullname);
    setImage(props.image);
  }, [props]);
  const { login } = props;
  const handleLogout = () => {
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/logout/",
        method: "post",
      })
      .then(() => {
        localStorage.clear();
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
                input={{ icon: "search", iconPosition: "left" }}
                placeholder="Search..."
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
              <Notification className="_margin_horizontal_md pointer" />
              <div className="profile_citoyen_img pointer">
                <Dropdown trigger={trigger} pointing="top right" icon={null}>
                  <Dropdown.Menu
                    style={{
                      width: "180px",
                    }}
                  >
                    <Dropdown.Item
                      text="Account"
                      icon="user"
                      as={Link}
                      to="/citoyen/profile"
                    />

                    <Dropdown.Item
                      text="Sign Out"
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
