import React, { useState, useEffect, useContext } from "react";
import { Image, Dropdown, Button } from "semantic-ui-react";
import UserContext from "../../screens/Admin/AdminContext.jsx";

import { useHistory } from "react-router";
import axios from "axios";
//? import css
import "./HeaderAdmin.css";

//? import icons and images
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

import { Link } from "react-router-dom";
//sfc shortcut
const HeaderAdmin = (props) => {
  const { isUploaded } = useContext(UserContext);
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("admin_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/user/",
        method: "get",
      })
      .then((res) => {
        setImage(res.data.image);
      })
      .catch((err) => {});
  }, [isUploaded]);
  const trigger = <Image src={image} size="small" className="pointer" />;
  const { active } = props;

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
        localStorage.clear();
        return history.push("/admin/login");
      })
      .catch((err) => {});
  };

  const handle_download = () => {
    axios
      .get("https://madina-tic.ml/api/download-csv-file/", {
        headers: {
          "Content-Type": "text/csv",
          Authorization: `Token ${localStorage.getItem("admin_token")}`,
        },
      })
      .then((res) => {
        let csvContent = "data:text/csv;charset=utf-8," + res.data;
        var FileURI = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", FileURI);
        link.setAttribute("download", "declarations_rapports.csv");
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <>
      <header className="_header_admin">
        <div className="row">
          <div className="right_part">
            <div className="profile_img">
              <div className={"btn_segment"}>
                <Button onClick={handle_download}>
                  Télécharger les données
                </Button>
              </div>{" "}
              <div
                className={
                  active === "account" ? "btn_segment active" : "btn_segment"
                }
              >
                <a href="/admin/create/account">
                  <Button disabled={active === "account"}>
                    Ajouter un compte
                  </Button>
                </a>
              </div>
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
                    to="/admin/profile"
                  />

                  <Dropdown.Item
                    text="Déconnection"
                    icon="sign out"
                    onClick={handleLogout}
                  />
                </Dropdown.Menu>
              </Dropdown>
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
