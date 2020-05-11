import React, { useState, useEffect } from "react";
import { Form, Image, Button, Icon } from "semantic-ui-react";

import "./AddDeclaration.css";

import { ReactComponent as Gps } from "../../assets/icons/gps.svg";

export default function AddDeclaration() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [adr, setAdr] = useState("");
  const [adrGeo, setAdrGeo] = useState("");
  const [isGeo, setIsGeo] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [description, setDesctiption] = useState("");
  const options = [
    { key: 1, text: "Electricity problem", value: 1 },
    { key: 2, text: "Gaz problem", value: 2 },
    { key: 3, text: "Route problem", value: 3 },
  ];
  const handleGeo = () => {
    setIsGeo((prevState) => !prevState);
  };
  const handledeleteImg = () => {};
  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "type":
        setType(value);
      case "adr":
        setAdr(value);
      case "description":
        setDesctiption(value);
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
    let es = e.target.files[0];
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(es);
    setPictures((prevState) => [...prevState, es]);
  };
  console.log({ picturesPreview, pictures });
  return (
    <div className="container_add_dec">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Add Declaration
        </h3>
        <Form>
          <Form.Input
            type="text"
            label="Title"
            value={title}
            onChange={handleChange}
            name="title"
            placeholder="title"
          />
          <Form.Select
            fluid
            label="Type"
            options={options}
            placeholder="type"
            name="type"
            value={type}
            onChange={handleChange}
          />
          <div
            style={{
              position: "relative",
            }}
          >
            <Form.Input
              type="text"
              label="Address"
              value={adr}
              onChange={handleChange}
              name="adr"
              placeholder="address"
            />
            <Gps className="gps_icon" />
          </div>
          <Form.Group inline>
            <Form.Radio label="Geo-localise" value="sm" checked />
            <Form.Radio label="Manual address" value="md" checked={false} />
          </Form.Group>
          <Form.TextArea label="Description" placeholder="..." />
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
            {picturesPreview.map((elm, index) => {
              return (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Image src={elm} key={index} />
                  <Icon name="delete" key={index} onClick={handledeleteImg} />
                </div>
              );
            })}
          </div>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button className="button_primary _margin_horizontal_sm">
              Confirm
            </Button>
            <Button className="button_secondary _margin_horizontal_sm">
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
