import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Segment, Message, Icon } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { withRouter, useHistory } from "react-router-dom";

const UpdateAnnounces = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [succes, setSucces] = useState(false);
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDesctiption] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startDateErr, setStartDateErr] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [endDateErr, setEndDateErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aid, setAid] = useState(null);
  const [loadingSeg, setIsLoadingSeg] = useState(false);

  const handleUpdate = () => {
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
        url: `http://157.230.19.233/api/announces/9da1981d-4c6e-4208-b445-1f3145887de6/`,
        method: "patch",
        data: {
          title: title,
          start_at: startDate,
          end_at: endDate,
          desc: description,
          status: "modified",
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
            case "non_field_errors":
              setStartDateErr(true);
              setEndDateErr(true);
            default:
              break;
          }
          return true;
        });
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!props.location.state) {
      history.push("/service/annonce/");
    }
    if (props.location && props.location.state) {
      setAid(props.location.state.aid);
    }
  }, [props]);

  useEffect(() => {
    if (aid) {
      setIsLoadingSeg(true);
      axios
        .get(`http://157.230.19.233/api/announces/${aid}/`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        })
        .then((res) => {
          setTitle(res.data.title);
          setDesctiption(res.data.desc);
          setStartDate(res.data.start_at);
          setEndDate(res.data.end_at);
          setIsLoadingSeg(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [aid]);
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
      <Segment
        className="_add_dec"
        style={{
          margin: "auto",
        }}
        loading={loadingSeg}
      >
        <h3 className="large-title text-default bold _margin_vertical_md">
          Update Announce
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
                selected={Date.parse(startDate)}
                onChange={(date) => {
                  if (startDateErr) {
                    setStartDateErr(false);
                    setEndDateErr(false);
                  }
                  setStartDate(date);
                }}
                className={startDateErr ? "date_picker_err" : ""}
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
                selected={Date.parse(endDate)}
                onChange={(date) => {
                  if (endDateErr) {
                    setEndDateErr(false);
                    setStartDateErr(false);
                  }
                  setEndDate(date);
                }}
                className={endDateErr ? "date_picker_err" : ""}
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

export default withRouter(UpdateAnnounces);
