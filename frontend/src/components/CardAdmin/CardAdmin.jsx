import React from "react";
import { Image, Icon } from "semantic-ui-react";

//? import css
import "./CardAdmin.css";

//? import Image
import Alex from "../../assets/images/alex.jpg";

//? import icons
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

const CardAdmin = () => {
  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
  };
  return (
    <div className="_card_admin">
      <div className="_admin_profile_image">
        <div className="profile_">
          <Image src={Alex} alt="alex" />
          <div className="_profile_img_edit pointer">
            <label htmlFor="myInput" className="pointer">
              <Edit className="pointer" />
            </label>
            <input
              id="myInput"
              style={{ display: "none" }}
              type={"file"}
              className="pointer"
              onChange={fileSelectedHandler}
            />
          </div>
        </div>
        <p className="_margin_vertical_sm title">Bill Gate</p>
      </div>
      <div className="row">
        <div className="col">
          <span className="small">
            {" "}
            <Icon name="mail" className="icon_card" /> Email
          </span>
          <p className="small">s.admin@esi-sba.dz</p>
        </div>
        <div className="col">
          <span className="small">
            {" "}
            <Icon name="birthday" className="icon_card" /> Birthday
          </span>
          <p className=" small">10-03-200</p>
        </div>
        <div className="col">
          <span className=" small">
            {" "}
            <Icon name="location arrow" className="icon_card" /> Address
          </span>
          <p className="small">Cité 300 logts, n 400</p>
        </div>
        <div className="col">
          <span className="small">
            {" "}
            <Icon name="phone" className="icon_card" /> Phone
          </span>
          <p className="small">+213 657552874</p>
        </div>
      </div>
      <div className="social_media_profile">
        <Icon
          name="facebook f"
          size="big"
          style={{
            color: "#385898",
          }}
          className="_margin_horizontal_sm"
        />
        <Icon
          name="google plus g"
          size="big"
          style={{
            color: "#DD4B39",
          }}
          className="_margin_horizontal_sm"
        />
        <Icon
          name="twitter"
          size="big"
          style={{
            color: "#1da1f2",
          }}
          className="_margin_horizontal_sm"
        />
      </div>
    </div>
  );
};
export default CardAdmin;
