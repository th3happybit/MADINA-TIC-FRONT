import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Icon, Message } from "semantic-ui-react";

import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";

const ComplementDeclaration = (props) => {
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
  const [reason, setReason] = useState("");
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const handleComplement = () => {
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
          geo_cord: "[30,10]",
          address: adr,
          dtype: selectedType,
          citizen: props.props.location.state.data.citizen,
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
  useEffect(() => {}, []);
  useEffect(() => {
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

              console.log({ props: props.props.location.state.data });
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
        setPictures(res.data.attachments);
        setPicturesPreview(res.data.attachments);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://157.230.19.233/api/declarations_complement_demand/?ordering=-created_on&?declaration=${props.props.location.state.data.did}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setReason(res.data.results[0].reason);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const handledeleteImg = (e) => {
    let indexElm = parseInt(e.currentTarget.attributes["data-id"].value);
    let preview = [];
    let f = [];
    picturesPreview.map((elm, index) => {
      if (index !== indexElm) {
        preview.push(elm);
      }
      return true;
    });
    pictures.map((elm, index) => {
      if (index !== indexElm) {
        f.push(elm);
      }
      return true;
    });
    setPictures(f);
    setPicturesPreview(preview);
  };
  const [selectedFile, setSelectedFile] = useState();
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
  const onSelectFile = (e) => {
    let es = e.target.files[0];
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile({ src: es });
    setPictures((prevState) => [...prevState, es]);
  };
  return (
    <div className="container_add_dec">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Complement Declaration
        </h3>
        <Form success={succes}>
          <Form.Input disabled type="text" label="The motif" value={reason} />
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
            <input
              id="myInput"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              className="pointer"
              onChange={onSelectFile}
            />
          </div>
          <div className="prev_images_dec">
            {pictures.map((elm, index) => {
              console.log(elm);
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Image src={elm.src} key={index} />
                  <Icon
                    color="black"
                    name="delete"
                    data-id={index}
                    onClick={handledeleteImg}
                  />
                </div>
              );
            })}
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
              onClick={handleComplement}
            >
              Confirm Complement
            </Button>
          </Form.Group>
          <Message
            success
            content="Your complement has been send succesfully"
          />
        </Form>
      </div>
    </div>
  );
};

export default ComplementDeclaration;
