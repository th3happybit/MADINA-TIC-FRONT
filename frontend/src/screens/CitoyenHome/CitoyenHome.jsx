import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import axios from "axios";

//? import css
import "./CitoyenHome.css";

//? redux stuff
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { change_mode } from "../../actions/darkAction";

//? import components
import CitoyenHeader from "../../components/CitoyenHeader/CitoyenHeader.jsx";
import CitoyenSidebar from "../../components/CitoyenSidebar/CitoyenSidebar.jsx";
import Backdrop from "../../components/Backdrop/Backdrop.jsx";
import SidebarCitoyenMobile from "../../components/SidebarCitoyenMobile/SidebarCitoyenMobile.jsx";
import Annonce from "../../components/AnnonceHome/AnnonceHome.jsx";
const CitoyenHome = (props) => {
  //!TODO FOR MONCEF
  //? bah tjib isDark ...
  console.log(props.isDark);
  //? bah tmodifi isDark
  console.log(props.change_mode());
  //? ida kan isDark true ywali false w l3ks

  const { annonce } = props;
  const [visible, setVisible] = useState(false);
  const [fullname, setFullname] = useState("");
  const [image, setImage] = useState(null);
  const handleHide = () => {
    setVisible((prevState) => !prevState);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
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
          setFullname(res.data.first_name + " " + res.data.last_name);
          setImage(res.data.image);
        })
        .catch((err) => {});
    } else {
      setIsLogin(false);
    }
  }, []);
  const [isLogin, setIsLogin] = useState("null");

  return (
    <>
      {isLogin ? (
        <>
          <>{visible && <Backdrop click={handleHide} />}</>
          <CitoyenHeader
            show={handleHide}
            login
            fullname={fullname}
            image={image}
          />{" "}
          <CitoyenSidebar active={props.active} visible={visible} />{" "}
          <main
            style={{
              position: "relative",
              top: "70px",
              left: "0",
            }}
          >
            {props.childComponent}
          </main>
          <SidebarCitoyenMobile
            fullname={fullname}
            image={image}
            visible={visible}
            active={props.active}
            click={handleHide}
            login
          />
          {annonce && (
            <div className="_annonce_section">
              <Annonce />
            </div>
          )}
        </>
      ) : (
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
              Go to login page?<a href="/login">click here</a>
            </p>
          </Message>
        </div>
      )}
    </>
  );
};

//? hadou lzm dirhom bah typage ykn s7i7
//? bal3arbya ida isDArk maknch bool marahch yji
CitoyenHome.propTypes = {
  isDark: PropTypes.bool.isRequired,
  change_mode: PropTypes.func.isRequired,
};

//? w hedi bah state te3 reducer li reh f redux diro props l hed component
const mapStateToProps = (state) => ({
  isDark: state.mode.isDark,
});

export default connect(mapStateToProps, { change_mode })(
  withRouter(CitoyenHome)
);
