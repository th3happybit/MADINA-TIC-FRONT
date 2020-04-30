import React, { useState } from "react";
import { Search, Image, Dropdown, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import axios from "axios";

//? import css
import "./HeaderAdmin.css";

//? import image profile
import Alex from "../../assets/images/alex.jpg";

//? import icons and images
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

import { Link } from "react-router-dom";

const trigger = <Image src={Alex} size="small" className="pointer" />;

const HeaderAdmin = (props) => {
  const { active } = props;
  const [isFocus, setFocus] = useState(false); //? if the input is focused or not
  const handleFocus = () => {
    setFocus((prevState) => !prevState);
  };
  const history = useHistory();
  const handleLogout = () => {
    console.log("res");
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
          },
        },
      })
      .request({
        url: "http://13.92.195.8/api/logout/",
        method: "post",
        // data: { email, password },
      })
      .then(() => {
        localStorage.clear();
        return history.push("/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="_header_admin">
      <div className={isFocus ? "row focus" : "row"}>
        <Search
          onFocus={handleFocus}
          onBlur={handleFocus}
          placeholder="Search for anything"
          input={{ icon: "search", iconPosition: "left" }}
        />
        <div className="right_part">
          <div className="profile_img">
            {" "}
            <div
              className={
                active === "account" ? "btn_segment active" : "btn_segment"
              }
            >
              <a href="/admin/create/account">
                <Button disabled={active === "account"}>Add account</Button>
              </a>
            </div>
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
                  to="/admin/profile"
                />

                <Dropdown.Item
                  text="Sign Out"
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
  );
};
export default HeaderAdmin;
