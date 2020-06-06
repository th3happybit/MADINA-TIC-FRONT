import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Message, Segment, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "./ComplementAnnounces.css";
import "react-datepicker/dist/react-datepicker.css";

const ComplementAnnounces = (props) => {
  const [titleErr, setTitleErr] = useState(false);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startDateErr, setStartDateErr] = useState(false);
  const [startFrontErr, setStartFrontErr] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [endDateErr, setEndDateErr] = useState(false);
  const [endFrontErr, setEndFrontErr] = useState(false);
  const [datesErr, setDatesErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aid, setAid] = useState(null);
  const [nullAid, setNullAid] = useState(false);
  const [reason, setReason] = useState("");

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
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: `http://157.230.19.233/api/announces/${aid}/`,
        method: "patch",
        data: {
          title: title,
          start_at: startDate,
          end_at: endDate,
          desc: description,
          status: "not_validated",
        },
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
      setAid(props.props.props.location.state.rid);
      axios
        .get(
          `http://157.230.19.233/api/announces/${props.props.props.location.state.rid}/`,
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
        })
        .catch((err) => {
          console.log(err.response);
        });
      axios
        .get(
          `http://157.230.19.233/api/announces_complement_demand/?ordering=-created_on&?announce=${props.props.props.location.state.rid}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          }
        )
        .then((res) => {
          setReason(res.data.results[0].reason);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else setNullAid(true);
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
              Complement Announce
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
                error={
                  titleErr && {
                    content: "Title can't be empty",
                    class: "ui basic red pointing label fluid",
                  }
                }
              />

              <div className="date_annonce">
                <div className="one_input">
                  <label htmlFor="begin">Starts at</label>
                  <DatePicker
                    id="begin"
                    selected={Date.parse(startDate)}
                    onChange={(date) => {
                      setStartDateErr(false);
                      setStartFrontErr(false);
                      setDatesErr(false);
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
                  <label htmlFor="end">Ends at</label>
                  <DatePicker
                    id="end"
                    selected={Date.parse(endDate)}
                    onChange={(date) => {
                      setEndDateErr(false);
                      setEndFrontErr(false);
                      setDatesErr(false);
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
                    class: "ui basic red pointing label",
                  }
                }
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
                  onClick={handle_Validation}
                >
                  Confirm Complement
                </Button>
              </Form.Group>
              <Message
                success
                content="Your complement has been send succesfully"
              />
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
            Something went wrong :( ...
          </h1>
        )}
      </Segment>
    </div>
  );
};

export default ComplementAnnounces;
