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
//sfc shortcut
const HeaderAdmin = (props) => {
    const { isUploaded } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [fullname, setFullname] = useState(null);
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
                url: "http://157.230.19.233/api/user/",
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
                url: "http://157.230.19.233/api/logout/",
                method: "post",
                // data: { email, password },
            })
            .then(() => {
                localStorage.clear();
                return history.push("/login");
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
                            <Notification className="_margin_horizontal_md pointer" />
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
                                        to="/citoyen/profile"
                                    />
                                    <Dropdown.Item
                                        text="Sign Out"
                                        icon="sign out"
                                        onClick={handleLogout}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            <p className="_name">{fullname}</p>
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
