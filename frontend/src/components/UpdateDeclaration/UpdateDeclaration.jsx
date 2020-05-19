import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Icon, Message } from "semantic-ui-react";

import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";
//? import css
import "./UpdateDeclaration.css";

const UpdateDeclaration = (props) => {
<<<<<<< HEAD
  console.log(props);
=======
>>>>>>> f92a51e36828f67d6a08d85ac2f232cb698606c3
  const [data, setData] = useState([]);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [type, setType] = useState("");
  const [typeErr, setTypeErr] = useState(false);
  const [adr, setAdr] = useState("");
  const [adrErr, setAdrErr] = useState(false);
  const [adrGeo, setAdrGeo] = useState("");
  const [isGeo, setIsGeo] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedType, setSelectedType] = useState(null);


  const handleCoords = (e) => {
    setAdrGeo("[" + String(e.longitude) + "," + String(e.latitude) + "]");
  };
  const handleGeo = () => {
    setIsGeo((prevState) => !prevState);
    setAdr("");
  };
  useEffect(() => {
    console.log(props.props)
    selectedType &&
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
          url: "http://157.230.19.233/api/declarations_types/",
          method: "get",
        })
        .then((res) => {
          let arr = [];
          res.data.map((elm, index) => {
            return arr.push({
              key: index,
              text: elm.name,
              value: elm.name,
              dtid: elm.dtid,
            });
          });
          setOptions(arr);
          axios
            .get(
              `http://157.230.19.233/api/declarations_types/${selectedType}`,
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              setType(res.data.name);
            })
            .catch((err) => {
              console.log(err.response);
            });
        })
        .catch((err) => console.log(err));
  }, [selectedType]);
  useEffect(() => {
    axios
      .get(`http://157.230.19.233/api/declarations/${props.props.location.state.data.did}/`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSelectedType(res.data.dtype);
        setTitle(res.data.title);
        setDesctiption(res.data.desc);
        setAdr(res.data.address);
        setAdrGeo(res.data.geo_cord);
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "title":
        setTitleErr(false);
        setTitle(value);
        break;
      case "type":
        setTypeErr(false);
        setType(value);
        break;
      case "adr":
        setAdrErr(false);
        setAdr(value);
        break;
      case "description":
        setDescriptionErr(false);
        setDesctiption(value);
        break;
      default:
        break;
    }
  };
  return (
    <div className="container_add_dec">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Add Declaration
        </h3>
        <Form success={succes}>
          <Form.Input
            type="text"
            label="Title"
            value={title}
            onChange={handleChange}
            name="title"
            className={titleErr ? "add_dec_err" : ""}
          />
          <Form.Select
            fluid
            label="Type"
            options={options}
            name="type"
            value={type}
            onChange={handleChange}
            className={typeErr ? "add_dec_err" : ""}
          />
          <div
            style={{
              position: "relative",
              marginBottom: "1rem",
            }}
          >
            <Form.Input
              disabled={isGeo}
              type="text"
              label="Address"
              value={adr}
              className={adrErr ? "add_dec_err" : ""}
              onChange={handleChange}
              name="adr"
            />
            {isGeo && <Location show={handleCoords} />}
            {isGeo && <Gps className="gps_icon" />}
          </div>
          <Form.Group inline>
            <Form.Radio
              label="Geo-localise"
              value="sm"
              checked={isGeo}
              onClick={handleGeo}
            />
            <Form.Radio
              label="Manual address"
              value="md"
              checked={!isGeo}
              onClick={handleGeo}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="..."
            value={description}
            className={descriptionErr ? "add_dec_err" : ""}
            onChange={handleChange}
          />
          <p className="label_add_dec bold">Add Photos (Optional)</p>

          <div className="_profile_img_edit add_dec pointer">
            <label
              htmlFor="myInput"
              className="pointer"
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              Upload
            </label>
          </div>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="_add_btn_dec"
          >
            <Button
              loading={isLoading}
              className="button_primary _margin_horizontal_sm"
            >
              Confirm Update
            </Button>
          </Form.Group>
          <Message
            success
            content="Your decalration has been modified succesfully"
          />
        </Form>
      </div>
    </div>
  );
};

export default UpdateDeclaration;
