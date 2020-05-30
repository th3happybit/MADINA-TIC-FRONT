import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Image, Button, Icon, Message, Segment } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const ComplementAnnounces = (props) => {
 const [titleErr, setTitleErr] = useState(false);
 const [succes, setSucces] = useState(false);
 const [title, setTitle] = useState("");
 const [description, setDesctiption] = useState("");
 const [descriptionErr, setDescriptionErr] = useState(false);
 const [startDate, setStartDate] = useState("");
 const [startDateErr, setStartDateErr] = useState(false);
 const [endDate, setEndDate] = useState("");
 const [endDateErr, setEndDateErr] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [reason, setReason] = useState("");
 const [aid, setAid] = useState(null);



 
 const handleComplement = () => {
  console.log("raha tedkhoul");
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
     status: "not_validated",
    },
   })
   .then((res) => {
    console.log("raha tekhdem");
    let aid = res.data.aid;
     setAid(aid);
     setSucces(true);
     setIsLoading(false);
   })
   .catch((err) => {
    console.log("marahech tekhdem")
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
  axios
   .get(
    `http://157.230.19.233/api/announces/9da1981d-4c6e-4208-b445-1f3145887de6/`,
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
 }, []);


 useEffect(() => {
  axios
   .get(
    `http://157.230.19.233/api/announces_complement_demand/?ordering=-created_on&?announce=9da1981d-4c6e-4208-b445-1f3145887de6`,
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
  <div className="container_add_dec service">
   <Segment className="_add_dec">
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
     />


     <div className="date_annonce">
      <div className="one_input">
       <label htmlFor="begin">Date debut</label>
       <DatePicker
        id="begin"
        selected={Date.parse(startDate)}
        onChange={(date) => {
         if (startDateErr) setStartDateErr(false);
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
         if (endDateErr) setEndDateErr(false);
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

export default ComplementAnnounces;