import React, { useState, useEffect } from "react";
import { Form, Image, Button, Message, Label } from "semantic-ui-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [service, setSerivce] = useState(null);

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
    axios
      .create({
        headers: {
          post: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request("https://www.madina-tic.ml/api/announces/", {
        method: "post",
        data: {
          title: title,
          start_at: startDate,
          end_at: endDate,
          status: "not_validated",
          desc: description,
          service,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setSucces(true);
      })
      .catch((err) => {
        console.log(err);
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
      .get("https://www.madina-tic.ml/api/user/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("service_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setSerivce(res.data.uid);
      });
  }, []);
  return (
    <div className="container_add_dec service">
      <div className="_add_dec">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Add Annonce
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
                content: "Title can't be empty",
                class: "ui basic red label pointing fluid",
              }
            }
            className={titleErr ? "add_dec_err" : ""}
          />
          <div className="date_annonce">
            <div className="one_input">
              <label htmlFor="begin">Start At</label>
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
                    content="Start date is required"
                  />
                )
              ) : (
                <>
                  {startFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Start date must be after current date"
                    />
                  )}
                  {datesErr && !startFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="Start date must be before end date"
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
                    content="End date is required"
                  />
                )
              ) : (
                <>
                  {endFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="End date must be after current date"
                    />
                  )}
                  {datesErr && !endFrontErr && (
                    <Label
                      className="ui pointing basic red"
                      content="End date must be after start date"
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
                  "Description can't be empty or shorter than 10 caracters",
                class: "ui basic red label pointing fluid",
              }
            }
          />
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
          <Message
            success
            content="Your annoncement has been send succesfully"
          />
        </Form>
      </div>
    </div>
  );
}
