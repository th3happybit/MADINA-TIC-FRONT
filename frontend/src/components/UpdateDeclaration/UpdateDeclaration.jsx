import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Segment, Message } from "semantic-ui-react";
import Geocode from "react-geocode";
import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";
//? import css
import "./UpdateDeclaration.css";
Geocode.setApiKey("AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0");
Geocode.enableDebug();
const UpdateDeclaration = (props) => {
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
  const [loadingPage, setLoadingPage] = useState(false);
  useEffect(() => {
    Geocode.fromLatLng("48.8583701", "2.2922926").then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const handleUpdate = () => {
    setIsLoading(true);
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: `http://157.230.19.233/api/declarations/${props.props.location.state.data.did}/`,
        method: "patch",
        data: {
          title,
          desc: description,
          geo_cord: adrGeo,
          address: adr,
          dtype: selectedType,
          citizen: props.props.location.state.data.citizen,
          modified_at: new Date().toJSON().substr(0, 19) + "+01:00",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setSucces(true);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  const handleCoords = (e) => {
    setAdrGeo("[" + String(e.longitude) + "," + String(e.latitude) + "]");
  };
  const handleGeo = () => {
    setIsGeo((prevState) => !prevState);
    setAdr("");
  };
  useEffect(() => {
    console.log({ props: props.props.location.state.data });
  }, []);
  useEffect(() => {
    setLoadingPage(true);
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
              setLoadingPage(false);
            })
            .catch((err) => {
              console.log(err.response);
            });
        })
        .catch((err) => console.log(err));
  }, [selectedType]);
  useEffect(() => {
    axios
      .get(
        `http://157.230.19.233/api/declarations/${props.props.location.state.data.did}/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
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
  }, []);
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
      <Segment
        className="_add_dec"
        style={{
          margin: "auto",
        }}
        loading={loadingPage}
      >
        <h3 className="large-title text-default bold _margin_vertical_md">
          Update Declaration
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

          <Form.Group
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="_add_btn_dec here"
          >
            <Button
              loading={isLoading}
              className="button_primary _margin_horizontal_sm"
              onClick={handleUpdate}
            >
              Confirm Update
            </Button>
          </Form.Group>
          <Message
            success
            content="Your decalration has been modified succesfully"
          />
        </Form>
      </Segment>
    </div>
  );
};

export default UpdateDeclaration;
