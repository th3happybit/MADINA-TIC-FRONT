import React, { useState, useEffect } from "react";
import { Form, Image, Button, Icon, Message } from "semantic-ui-react";

import axios from "axios";

import "./AddDeclaration.css";
import { ReactComponent as Gps } from "../../assets/icons/gps.svg";
import Location from "./Location.jsx";

export default function AddDeclaration(props) {
  const [succes, setSucces] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [type, setType] = useState("");
  const [typeErr, setTypeErr] = useState(false);
  const [adr, setAdr] = useState("");
  const [adrErr, setAdrErr] = useState(false);
  const [adrGeo, setAdrGeo] = useState("");
  const [isGeo, setIsGeo] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [options, setOptions] = useState([]);
  const [uid, setUid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dtid, setDtid] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [fileErr, setFileErr] = useState(false);

  useEffect(() => {
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
      })
      .catch((err) => console.log(err));
  }, []);
  const handleCoords = (e) => {
    setAdrGeo("[" + String(e.longitude) + "," + String(e.latitude) + "]");
  };
  const handleGeo = () => {
    setIsGeo((prevState) => !prevState);
    setAdr("");
  };

  //TODO post
  useEffect(() => {
    if (uid && !isSave) {
      setIsLoading(true);
      let url = `http://157.230.19.233/api/declarations/`;
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
          url,
          method: "post",
          data: {
            title,
            desc: description,
            geo_cord: adrGeo,
            address: adr,
            dtype: dtid,
            citizen: uid,
          },
        })
        .then((res) => {
          let did = res.data.did;
          if (pictures.length > 0) {
            postImages(did);
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
        });
    }
  }, [uid, isSave]);
  useEffect(() => {
    if (uid && isSave) {
      setSaveLoading(true);
      let url = `http://157.230.19.233/api/declarations/`;
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
          url,
          method: "post",
          data: {
            title,
            desc: description,
            geo_cord: adrGeo,
            address: adr,
            dtype: dtid,
            citizen: uid,
            status: "draft",
          },
        })
        .then((res) => {
          let did = res.data.did;
          if (pictures.length > 0) {
            postImages(did);
            setSaveLoading(false);
          } else {
            setSucces(true);
            setSaveLoading(false);
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
          setSaveLoading(false);
        });
    }
  }, [uid, isSave]);
  const handleSave = () => {
    setIsSave(true);
    handleAdd();
  };
  const postImages = (did) => {
    const formData = new FormData();
    pictures.map((image) => {
      formData.append("src", image);
    });
    formData.append("filetype", "image");
    formData.append("declaration", did);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        },
      })
      .request({
        url: "http://157.230.19.233/api/documents/",
        method: "post",
        data: formData,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setSucces(true);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };
  const handleAdd = () => {
    console.log("ee");
    if (adr.length === 0 && adrGeo.length === 0) {
      setAdrErr(true);
      setSucces(false);
    } else if (!uid) {
      let url = `http://157.230.19.233/api/user/`;
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
          url,
          method: "get",
        })
        .then((res) => {
          let uid = res.data.uid;
          options.map((elm) => elm.value === type && setDtid(elm.dtid));
          setUid(uid);
        })
        .catch((err) => console.log(err.response));
    } else {
      setUid(uid);
    }
  };

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
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPicturesPreview([]);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPicturesPreview((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    setFileErr(false);
    let es = e.target.files[0];
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    if (es.type === "image/png" || es.type === "image/jpeg") {
      setSelectedFile(es);
      setPictures((prevState) => [...prevState, es]);
    } else {
      setFileErr(true);
    }
  };
  return (
    <div className="container_add_dec">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Add Declaration
        </h3>
        <Form success={succes} error={fileErr}>
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
          <Message error list={["Please enter an image file"]} />
          <div className="prev_images_dec">
            {picturesPreview.map((elm, index) => {
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
            className="_add_btn_dec"
          >
            <Button
              loading={isLoading}
              onClick={handleAdd}
              className="button_primary _margin_horizontal_sm"
            >
              Confirm
            </Button>
            <Button
              loading={saveLoading}
              className="button_secondary _margin_horizontal_sm"
              onClick={handleSave}
            >
              Save
            </Button>
          </Form.Group>
          <Message
            success
            content={
              isSave
                ? "Your decalration has been saved"
                : "Your decalration has been added"
            }
          />
        </Form>
      </div>
    </div>
  );
}
