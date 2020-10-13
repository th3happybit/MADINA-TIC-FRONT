import React, { useEffect, useState } from "react";
import axios from "axios";
import { Message, Icon } from "semantic-ui-react";
import { UserProvider } from "./MaireContext.jsx";

import MaireSideBar from "../../components/MaireSideBar/MaireSideBar.jsx";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import HeaderMaire from "../../components/MaireHeader/MaireHeader.jsx";
import MaireHeaderSideBar from "../../components/MaireHeaderSideBar/MaireHeaderSideBar.jsx";

const Maire = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [verified, setVerified] = useState(false);
  const [maire, setMaire] = useState(null);
  const [image, setImage] = useState("");

  const changeImage = (image) => {
    setImage(image);
  };
  useEffect(() => {
    if (localStorage.getItem("maire_token"))
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
          if (res.data.role === "Maire") {
            setIsLogin(true);
            setMaire(res.data.uid);
          } else {
            setIsLogin(false);
          }
          setVerified(true);
        })
        .catch((err) => {});
    else {
      setVerified(true);
    }
  }, []);

  const dataContext = { isUploaded: false };
  const { active } = props;
  const [visible, setVisible] = useState(false);
  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  return (
    <>
      {isLogin ? (
        <UserProvider value={dataContext}>
          {visible && <Backdrop click={handleHide} />}
          <MaireSideBar active={active} />
          <HeaderMaire active={active} show={handleHide} imageP={image} />
          <MaireHeaderSideBar
            visible={visible}
            active={active}
            click={handleHide}
          />
          <>
            {props.childComponent ? (
              <props.childComponent maire={maire} updateImageP={changeImage} dec_data={props}/>
            ) : (
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <Icon
                  name="time"
                  size="big"
                  style={{
                    "margin-bottom": "10px",
                  }}
                />
                <h1 className="text-default">
                  This page is under construction ...
                </h1>
              </div>
            )}
          </>
        </UserProvider>
      ) : (
        verified && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            {" "}
            <Message negative>
              <Message.Header>
                We're sorry you can't access this route
              </Message.Header>
              <p
                className="text-default title _margin_vertical_sm pointer "
                style={{
                  ccolor: "#912d2b",
                }}
              >
                Go to login page?<a href="/maire/login">click here</a>
              </p>
            </Message>
          </div>
        )
      )}
    </>
  );
};

export default Maire;
