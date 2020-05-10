import React, { useEffect, useState } from "react";
import { Search, Image, Button } from "semantic-ui-react";
import axios from "axios";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

//? import css
import "./CitoyenHeader.css";

export default function CitoyenHeader(props) {
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const { login } = props;
  useEffect(() => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/user/",
        method: "get",
      })
      .then((res) => {
        console.log(res);
        setFullname(res.data.first_name + " " + res.data.last_name);
        setImage(res.data.image);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
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
                <Image src={image} size="small" className="pointer" />
                <p className="medium-text text-default _margin_horizontal_xs">
                  {fullname}
                </p>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
