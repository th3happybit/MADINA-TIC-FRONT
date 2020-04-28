import React, { useState } from "react";
import { Search, Image, Dropdown } from "semantic-ui-react";

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
  const [isFocus, setFocus] = useState(false); //? if the input is focused or not

  const handleFocus = () => {
    setFocus((prevState) => !prevState);
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
            <Notification className="_margin_horizontal_md pointer" />

            <Dropdown trigger={trigger} pointing="top right" icon={null}>
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
                  as={Link}
                  to="/admin/logout"
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
