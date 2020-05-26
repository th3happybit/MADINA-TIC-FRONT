import React, { useState, useEffect } from "react";
import { Form, Image, Button, Icon, Message } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import "./DeposerAnnonces.css";

export default function DeposerAnnonces(props) {
  const [startDate, setStartDate] = useState(null);
  const [startErr, setStartErr] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endErr, setEndErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      .request("http://157.230.19.233/api/announces/", {
        method: "post",
        data: {
          title: title,
          start_at: startDate,
          end_at: endDate,
          status: "not_validated",
          desc: description,
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
            className={titleErr ? "add_dec_err" : ""}
          />
          <div className="date_annonce">
            <div className="one_input">
              <label htmlFor="begin">Date debut</label>
              <DatePicker
                id="begin"
                selected={startDate}
                onChange={(date) => {
                  if (startErr) setStartErr(false);
                  setStartDate(date);
                }}
                className={startErr ? "date_picker_err" : ""}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="one_input">
              <label htmlFor="end">Date fin</label>
              <DatePicker
                id="end"
                selected={endDate}
                onChange={(date) => {
                  if (endErr) setEndErr(false);
                  setEndDate(date);
                }}
                className={endErr ? "date_picker_err" : ""}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
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
              padding: "2rem 0",
            }}
            className="_add_btn_dec"
          >
            <Button
              loading={isLoading}
              onClick={AddAnnonce}
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
