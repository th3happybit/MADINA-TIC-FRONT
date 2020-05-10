import React from "react";
import { Search, Image } from "semantic-ui-react";

import { ReactComponent as Logo } from "../../assets/images/madinatic_logo.svg";
import { ReactComponent as Notification } from "../../assets/images/notification.svg";

import Alex from "../../assets/images/alex.jpg";

//? import css
import "./CitoyenHeader.css";

export default function CitoyenHeader() {
  return (
    <div className="_citoyen_header ">
      <header>
        <div className="_citoyen_header_logo">
          <div className="_madinatic_logo">
            <Logo />
            <p className="large-title text-active ">MADINA-TIC</p>
          </div>
          <div className="form_search_header_citoyen">
            <Search
              input={{ icon: "search", iconPosition: "left" }}
              placeholder="Search..."
            />
          </div>
          <Notification className="_margin_horizontal_md pointer" />
          <div className="profile_citoyen_img pointer">
            <Image src={Alex} size="small" className="pointer" />
            <p className="medium-text text-default _margin_horizontal_xs">
              oussamabng
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
