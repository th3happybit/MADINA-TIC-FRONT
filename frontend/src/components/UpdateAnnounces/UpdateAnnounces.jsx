import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Message,
  Segment,
  Label,
  Icon,
  Image,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ComplementAnnounces = (props) => {
  const [titleErr, setTitleErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [changedStart, setchangedStart] = useState(false);
  const [startDateErr, setStartDateErr] = useState(false);
  const [startFrontErr, setStartFrontErr] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [changedEnd, setchangedEnd] = useState(false);
  const [endDateErr, setEndDateErr] = useState(false);
  const [endFrontErr, setEndFrontErr] = useState(false);
  const [datesErr, setDatesErr] = useState(false);
  const [image, setImage] = useState(null);
  const [postImg, setPostImg] = useState(null);
  const [deleted, setDelete] = useState(false);
  const [imageErr, setimageErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aid, setAid] = useState(null);
  const [nullAid, setnullAid] = useState(false);
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
    setDelete(true);
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
      setStartDateErr(true);
      err = true;
    }
    if (startDate < new Date()) {
      err = true;
      setStartFrontErr(true);
    }
    if (!endDate) {
      err = true;
      setEndDateErr(true);
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
    if (!err) handleComplement();
  };
  const handleComplement = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("start_at", changedStart ? TimeMake(startDate) : startDate);
    formData.append("end_at", changedEnd ? TimeMake(endDate) : endDate);
    formData.append("status", "not_validated");
    formData.append("desc", description);
    if (postImg) formData.append("image", postImg);
    else if (deleted) formData.append("image", "");
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/announces/${aid}/`,
        method: "patch",
        data: formData,
      })
      .then((res) => {
        setSucces(true);
        setIsLoading(false);
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
              setStartDateErr(true);
              break;
            case "end_at":
              setEndDateErr(true);
              break;
            default:
              break;
          }
          return true;
        });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (props.props.props.location.state) {
      setAid(props.props.props.location.state.aid);
      axios
        .get(
          `https://madina-tic.ml/api/announces/${props.props.props.location.state.aid}/`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          }
        )
        .then((res) => {
          setTitle(res.data.title);
          setDesctiption(res.data.desc);
          setStartDate(res.data.start_at);
          setEndDate(res.data.end_at);
          setImage(res.data.image);
        })
        .catch((err) => {});
    } else setnullAid(true);
  }, []);

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

  return (
    <div className="container_edit_announce service">
      <Segment className="_add_dec">
        {!nullAid ? (
          <>
            <h3 className="large-title text-default bold _margin_vertical_md">
              Mettre à jour annonce
            </h3>
            <Form success={succes} error={imageErr}>
              <Form.Input
                type="text"
                label="Title"
                value={title}
                onChange={handleChange}
                name="title"
                className={titleErr ? "add_dec_err" : ""}
                error={
                  titleErr && {
                    content: "Le titre est obligatoire",
                    class: "ui basic red pointing label",
                  }
                }
              />
              <div className="date_annonce">
                <div className="one_input">
                  <label htmlFor="begin">Date début</label>
                  <DatePicker
                    id="begin"
                    selected={Date.parse(startDate)}
                    onChange={(date) => {
                      setStartDateErr(false);
                      setStartFrontErr(false);
                      setDatesErr(false);
                      setchangedStart(true);
                      setStartDate(date);
                    }}
                    className={
                      startDateErr || startFrontErr || datesErr
                        ? "date_picker_err"
                        : ""
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  {startDateErr ? (
                    startDateErr && (
                      <Label
                        className="ui pointing basic red"
                        content="Vérifiez la validité du cette date"
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
                  <label htmlFor="end">Date fin</label>
                  <DatePicker
                    id="end"
                    selected={Date.parse(endDate)}
                    onChange={(date) => {
                      setEndDateErr(false);
                      setEndFrontErr(false);
                      setDatesErr(false);
                      setchangedEnd(true);
                      setEndDate(date);
                    }}
                    className={
                      endDateErr || endFrontErr || datesErr
                        ? "date_picker_err"
                        : ""
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  {endDateErr ? (
                    endDateErr && (
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
                      "La description doit être au minimum 10 charactères",
                    class: "ui basic red pointing label",
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
                  <Image
                    src={image}
                    style={{ width: "130px", height: "130px" }}
                  />
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
                }}
                className="_add_btn_dec here"
              >
                <Button
                  loading={isLoading}
                  className="button_primary _margin_horizontal_sm"
                  onClick={handle_Validation}
                >
                  Mettre à jour
                </Button>
              </Form.Group>
              {imageErr && (
                <Message
                  error
                  content="S'il vous plait, Assurez que votre image est valide"
                />
              )}
              <Message success content="Infos sauvegardées avec succès" />
            </Form>
          </>
        ) : (
          <h1
            className="text-default"
            style={{
              margin: "auto",
              "font-size": "xxx-large",
              width: "600px",
            }}
          >
            Un erreur s'est produit :( ...
          </h1>
        )}
      </Segment>
    </div>
  );
};

export default ComplementAnnounces;
