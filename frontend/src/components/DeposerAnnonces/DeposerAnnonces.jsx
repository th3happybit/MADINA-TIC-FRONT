import React, {useEffect} from "react";
import { Form, Image, Button, Icon, Message } from "semantic-ui-react";
import axios from "axios";

import "./DeposerAnnonces.css";
import { useState } from "react";
import {useHistory } from "react-router-dom";

const DeposerAnnonces = () => {
  //for loading while post request 
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_at, setStart_at] = useState("");
  const [end_at, setEnd_at] = useState("");

  // for erros
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null)
  const [dateDebutError, setDateDebutError] = useState(null);
  const [dateFinError, setDateFinError] = useState(null);

  //for messages error
  const [titleMessage, setTitleMessage] = useState("");
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [dateDebutMessage, setDateDebutMessage] = useState("");
  const [dateFinMessage, setDateFinMessage] = useState("");


  const handleChangeInput = (e) => {
    if (succes) setSucces(false);
    let id = e.currentTarget.id;
    switch (id) {
      case "title" :
        titleError && setTitleError(null);
        setTitle(e.currentTarget.value);
        break;
      case "description":
        descriptionError && setDescriptionError(null);
        setDescription(e.currentTarget.value);
        break;
      case "start_at":
        dateDebutError && setDateDebutError(null);
        setStart_at(e.currentTarget.value);
        break;
      case "end_at":
        dateFinError && setDateFinError(null);
        setEnd_at(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  // const checkDate = (date) => {
  //   if (!date) return false;
  //   dateArray = date.split("-");
  //   let dt = new Date();
  //   let tr = false;
  //   if (dt.getFullYear() - dateArray[0] <= 0){
  //    if ((dt.getMonth()+1) - dateArray[1] <=0){
  //     if (dt.getDate() - dateArray[2] <0){
  //     tr = true ;
  //     };
  //   };
  // };
  // return tr;
  // };


  // const checkDate = (dateD, dateF) => {
  //   if (dateD < dateF) console.log("f kbira 3la d"); else console.log("d kbira 3la f"); 
  // };

  

  const handleAdd = () =>{
    if (succes) setSucces(false);
    let dt = new Date();
    if (title.length === 0){
      setTitleError(true);
      setTitleMessage("this field may not be blank.");
    }else if (description.lenght === 0) {
      setDescriptionError(true);
      setDescriptionMessage("this field may not be blank....");
    }else if (start_at.lenght === 0){
      setDateDebutError(true);
      setDateDebutMessage("this field may not be blank.");
    }else if (end_at.lenght === 0){
      setDateFinError(true);
      setDateFinMessage("this field may not be blank.");
    }else if (start_at > end_at){
      setDateDebutError(true);
      setDateDebutMessage("the beggining date has to be earlier then the date of end.");
    }else if (start_at < dt){
      setDateDebutError(true);
      setDateDebutMessage("you have entered a passed date.")
    }else{
      AddAnnonce();
    };
  };

  const AddAnnonce = () => {
    setIsLoading(true);
    // checkDate(start_at,end_at);
    axios 
    .create({
      headers: {
        post: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      },
    })
    .request("http://157.230.19.233/api/announces/",{
      method: "post",
      data: {
        title: title,
        start_at: start_at,
        end_at: end_at,
        desc: description,
      },
    })
    .then((res) =>{
      setIsLoading(false);
      setSucces(true);
    })
    .catch((err) =>{
      console.log(err);
      // if(err.response)
      // Object.entries(err.response.data).map((element) => {
      //   switch (element[0]) {
      //     case "title":
      //       setTitleError(true);
      //       setTitleMessage(element[1]);
      //       break;
      //     case "desc":
      //       setDescriptionError(true);
      //       setDescriptionMessage(element[1]);
      //       break;
      //     case "start_at":
      //       setDateDebutError(true);
      //       setDateDebutMessage(element[1]);
      //       break;
      //     case "end_at":
      //       setDateFinError(true);
      //       setDateFinMessage(element[1]);
      //       break;
      //     default:
      //       break;
      //   }
      //   return true;
      // });
      setIsLoading(false);
    });
  };

  return (
    <div className="container_add_ann container_add_dec ">
      <div className="_add_ann">
        <h3 className="large-title text-default bold _margin_vertical_md">
          Add Annonce
        </h3>
      <Form
      success={succes} 
      >
        <Form.Input
        value={title}
        id="title"
        type="text"
        label="Title"
        name="title"
        className={
          titleError 
            ? "input_err _margin_vertical_sm small"
            : "_margin_vertical_sm small"
        }
        onChange={handleChangeInput}
        />
        {titleError && (
          <p className="error_inputs_msg">
            <Icon name="info circle" />
            {titleMessage}
          </p>
        )}
        <Form.Input
        value={start_at}
        id="start_at"
        type="Datetime-local"
        label="Date de début"
        name="start_at"
            className={
              dateDebutError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
        onChange={handleChangeInput}
        />
          {dateDebutError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
              {dateDebutMessage}
            </p>
          )}

        <Form.Input
        value={end_at}
        id="end_at"
        type="datetime-local"
        label="Date de fin"
        name="end_at"
            className={
              dateFinError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
        onChange={handleChangeInput}
        />
          {dateFinError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
               {dateFinMessage}
            </p>
          )}
        <Form.TextArea
        value={description}
        id="description"
        label="Description"
        name="description"
        placeholder="..."
            className={
              descriptionError
                ? "input_err _margin_vertical_sm small"
                : "_margin_vertical_sm small"
            }
        onChange={handleChangeInput}
        />
          {descriptionError && (
            <p className="error_inputs_msg">
              <Icon name="info circle" />
              {descriptionMessage}
            </p>
          )}

        <Form.Group
        style= {{
          display : "flex",
          justifyContent : "center",
        }}
        className="_add_btn_dec"
        >
          <Button
              className="button_primary _margin_horizontal_sm"
              onClick={handleAdd}
              type="submit"
              loading={isLoading}
          >
            Confirm
          </Button>
          <Button
              className="button_secondary _margin_horizontal_sm"
          >
            Cancel
          </Button>
        </Form.Group>

      </Form>
      </div>
    </div>
  );
};

export default DeposerAnnonces;
