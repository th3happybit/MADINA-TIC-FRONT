import React, { useState, useEffect } from "react";
import { Form, Image, Button, Message, Label, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import "./DeposerAnnonces.css";

export default function DeposerAnnonces(props) {
  const [startDate, setStartDate] = useState(null);
  const [startErr, setStartErr] = useState(false);
  const [startFrontErr, setStartFrontErr] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endErr, setEndErr] = useState(false);
  const [endFrontErr, setEndFrontErr] = useState(false);
  const [datesErr, setDatesErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [image, setImage] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [imageErr, setimageErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setSerivce] = useState(null);

  function helper(str) {
    return str < 10 ? "0" + str : str;
  }
  function houresMake(str, time) {
    let houre = parseInt(str.slice(0, 2));
    if (time === "PM") houre += 12;
    return houre === 24
      ? "00" + str.slice(2, str.length)
      : houre + str.slice(2, str.length);
  }
  function TimeMake(dt) {
    const time = dt.toLocaleTimeString();
    let ret =
      dt.getFullYear() +
      "-" +
      helper(dt.getMonth() + 1) +
      "-" +
      helper(dt.getDate()) +
      "T";
    if (time.split(" ").length > 1)
      ret += houresMake(time, time.split(" ")[1]) + "+01:00";
    else ret += time.split(" ")[0] + "+01:00";
    return ret;
  }

  const handledeleteImg = () => {
    setimageErr(false);
    setPostImg(null);
    setImage(null);
  };
  const handleAddimage = (e) => {
    let file = e.target.files[0];
    if (
      file &&
      file.size > 0 &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setPostImg(file);
    } else setimageErr(true);
  };
  const handle_Validation = () => {
    let err = false;
    if (!startDate) {
      setStartErr(true);
      err = true;
    }
    if (startDate < new Date()) {
      err = true;
      setStartFrontErr(true);
    }
    if (!endDate) {
      err = true;
      setEndErr(true);
    }
    if (endDate <= new Date()) {
      err = true;
      setEndFrontErr(true);
    }
    if (endDate < startDate) {
      err = true;
      setDatesErr(true);
    }
    if (title.length === 0) {
      setTitleErr(true);
      err = true;
    }
    if (description.length < 10) {
      setDescriptionErr(true);
    }
    if (!err) AddAnnonce();
  };
  const AddAnnonce = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("start_at", TimeMake(startDate));
    formData.append("end_at", TimeMake(endDate));
    formData.append("status", "not_validated");
    formData.append("desc", description);
    formData.append("service", service);
    if (postImg) formData.append("image", postImg);
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request("https://madina-tic.ml/api/announces/", {
        method: "post",
        data: formData,
      })
      .then((res) => {
        setIsLoading(false);
        setSucces(true);
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
            case "start_at":
              setStartErr(true);
              break;
            case "end_at":
              setEndErr(true);
              break;
            default:
              break;
          }
          return true;
        });
        setIsLoading(false);
      });
  };

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case "title":
        setTitleErr(false);
        setTitle(value);
        break;
      case "description":
        setDescriptionErr(false);
        setDesctiption(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    axios
      .get("https://madina-tic.ml/api/user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("service_token")}`,
        },
      })
      .then((res) => {
        setSerivce(res.data.uid);
      });
  }, []);

  return (
    <div className="container_add_dec service">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Ajouter Annonce
        </h3>
        <Form success={succes}>
          <Form.Input
            type="text"
            label="Title"
            value={title}
            onChange={handleChange}
            name="title"
            error={
              titleErr && {
                content: "Le titre est obligatoire",
                class: "ui basic red label pointing fluid",
              }
            }
            className={titleErr ? "add_dec_err" : ""}
          />
          <div className="date_annonce">
            <div className="one_input">
              <label htmlFor="begin">Date début</label>
              <DatePicker
                id="begin"
                selected={startDate}
                onChange={(date) => {
                  setStartErr(false);
                  setStartFrontErr(false);
                  setDatesErr(false);
                  setStartDate(date);
                }}
                className={
                  startErr || startFrontErr || datesErr ? "date_picker_err" : ""
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              {startErr ? (
                startErr && (
                  <Label
                    className="ui pointing basic red"
                    content="Vérifiez la validité de cette date"
                  />
                )
              ) : (
                <>
                  {startFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Date début doit être aprés maintenant"
                    />
                  )}
                  {datesErr && !startFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Date début doit être avant la date du fin"
                    />
                  )}
                </>
              )}
            </div>
            <div className="one_input">
              <label htmlFor="end">End At</label>
              <DatePicker
                id="end"
                selected={endDate}
                onChange={(date) => {
                  setEndErr(false);
                  setEndFrontErr(false);
                  setDatesErr(false);
                  setEndDate(date);
                }}
                className={
                  endErr || endFrontErr || datesErr ? "date_picker_err" : ""
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              {endErr ? (
                endErr && (
                  <Label
                    className="ui pointing basic red"
                    content="Vérifiez la validité du cette date"
                  />
                )
              ) : (
                <>
                  {endFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Date fin doit être aprés maintenant"
                    />
                  )}
                  {datesErr && !endFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Date fin doit être aprés la date de début"
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="..."
            value={description}
            className={descriptionErr ? "add_dec_err" : ""}
            onChange={handleChange}
            error={
              descriptionErr && {
                content:
                  "La déscription doit être au minimum 10 charactères",
                class: "ui basic red label pointing fluid",
              }
            }
          />
          <p className="label_add_dec bold">Ajouter une photo</p>
          <div className="_profile_img_edit add_dec pointer">
            <label
              htmlFor="myInput"
              className="pointer"
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              Ajouter
            </label>
          </div>
          <input
            id="myInput"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            className="pointer"
            onChange={handleAddimage}
          />
          {image && (
            <div
              style={{
                position: "relative",
                width: "140px",
              }}
            >
              <Image src={image} style={{ width: "130px", height: "130px" }} />
              <Icon
                className="delete_icon"
                color="black"
                name="delete"
                onClick={handledeleteImg}
              />
            </div>
          )}
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 0",
            }}
            className="_add_btn_dec"
          >
            <Button
              loading={isLoading}
              onClick={handle_Validation}
              className="button_primary _margin_horizontal_sm"
            >
              Confirm
            </Button>
          </Form.Group>
          <Message success content="Infos sauvegardées avec succès" />
        </Form>
      </div>
    </div>
  );
}
