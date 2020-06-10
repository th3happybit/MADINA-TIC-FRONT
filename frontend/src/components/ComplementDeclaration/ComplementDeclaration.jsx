import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Icon, Message, Segment } from "semantic-ui-react";

import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "../AddDeclaration/Location.jsx";

const ComplementDeclaration = (props) => {
  const [data, setData] = useState([]);
  const [titleErr, setTitleErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [typeErr, setTypeErr] = useState(false);
  const [adrErr, setAdrErr] = useState(false);
  const [adr, setAdr] = useState("");
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
  const [loadingPage, setLoadingPage] = useState(false);
  const [did, setDid] = useState(null);
  const [sendP, setsendP] = useState([]);

  useEffect(() => {
    const formData = new FormData();
    sendP.map((image) => {
      console.log({ image });
      formData.append("src", image, image.name);
    });
    formData.append("filetype", "image");
    formData.append("declaration", did);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "https://www.madina-tic.ml/api/documents/",
        method: "post",
        data: formData,
      })
      .then((res) => {
        console.log(res);
        setSucces(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, [did]);
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
        url: `https://www.madina-tic.ml/api/declarations/${props.props.location.state.data.did}/`,
        method: "patch",
        data: {
          title,
          desc: description,
          geo_cord: adrGeo,
          address: adr,
          dtype: selectedType,
          citizen: props.props.location.state.data.citizen,
          status: "not_validated",
        },
      })
      .then((res) => {
        let did = res.data.did;
        if (pictures.length > 0) {
          setDid(did);
        } else {
          setSucces(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Object.entries(err.response.data).map((elm) => {
          switch (elm[0]) {
            case "title":
              setTitleErr(true);
              break;
            case "desc":
              setDescriptionErr(true);
              break;
            case "dtype":
              setTypeErr(true);
              break;
            default:
              break;
          }
          return true;
        });
        setIsLoading(false);
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
          url: "https://www.madina-tic.ml/api/declarations_types/",
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
              `https://www.madina-tic.ml/api/declarations_types/${selectedType}`,
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
        `https://www.madina-tic.ml/api/declarations/${props.props.location.state.data.did}/`,
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
        setPicturesPreview(res.data.attachments);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://www.madina-tic.ml/api/declarations_complement_demand/?ordering=-created_on&?declaration=${props.props.location.state.data.did}`,
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
    pictures.map((elm, index) => {
      if (index !== indexElm) {
        f.push(elm);
      }
      return true;
    });
    setPictures(f);
  };
  const [selectedFile, setSelectedFile] = useState();
  useEffect(() => {
    if (!selectedFile) {
      setPicturesPreview([]);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPictures((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
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
    setSelectedFile(es);
    setsendP((prevState) => [...prevState, es]);
  };
  return (
    <div className="container_add_dec">
      <Segment className="_add_dec" loading={loadingPage}>
        <h3 className="large-title text-default bold _margin_vertical_md">
          Complement Declaration
        </h3>
        <Form success={succes}>
          <Message info header="The motif of the demand" content={reason} />
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
          {pictures.length > 0 && (
            <p className="label_add_dec bold">Pictures</p>
          )}
          <div className="prev_images_dec">
            {picturesPreview.map((elm, index) => {
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Image src={elm.src} key={index} />
                </div>
              );
            })}
          </div>
          <p className="label_add_dec bold">
            {pictures.length > 0 ? "Add another Photos" : "Add pictures"}
          </p>

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
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Image src={elm} key={index} />
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
            className="_add_btn_dec here"
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
      </Segment>
    </div>
  );
};

export default ComplementDeclaration;
