import React, { useState, useEffect } from "react";
import { Checkbox } from "semantic-ui-react";
import axios from "axios";

export default function Childs(props) {
  const { parent } = props;
  const [isChecked, setIsChecked] = useState(true);
  const handleChecked = () => {
    setIsChecked((prevState) => !prevState);
  };
  useEffect(() => {
    let instance = axios.create({
      baseURL: "https://madina-tic.ml/api/",
      responseType: "json",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    if (isChecked) {
      let body = {
        parent_declaration: parent,
        status: props.elm.status,
        service : props.elm.service,
      };
      instance
        .patch(`declarations/${props.elm.did}/`, body)
        .then((res) => {})
        .catch((err) => {});
    } else {
      let body = {
        parent_declaration: null,
        status: props.elm.status,
        service : props.elm.service,
      };
      instance
        .patch(`declarations/${props.elm.did}/`, body)
        .then((res) => {})
        .catch((err) => {});
    }
  }, [isChecked]);
  return (
    <Checkbox
      checked={isChecked}
      onClick={handleChecked}
      label={props.elm.title}
    />
  );
}
