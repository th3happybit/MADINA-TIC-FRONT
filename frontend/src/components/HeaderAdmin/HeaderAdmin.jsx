import React, { useState } from "react";
import { Search, Image } from "semantic-ui-react";

//? import css
import "./HeaderAdmin.css";

//? import image profile
import Alex from "../../assets/images/alex.jpg";

//? import icons and images
import { ReactComponent as Notification } from "../../assets/images/notification.svg";
import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Toggle } from "../../assets/images/toggle.svg";

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
            <Image src={Alex} size="small" className="pointer" />
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
