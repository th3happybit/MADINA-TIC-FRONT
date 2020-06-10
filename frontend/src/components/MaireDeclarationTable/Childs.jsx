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
      baseURL: "https://www.madina-tic.ml/api/",
      responseType: "json",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    if (isChecked) {
      let body = {
        parent_declaration: parent,
      };
      instance
        .patch(`declarations/${props.elm.did}/`, body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
    } else {
      let body = {
        parent_declaration: null,
      };
      instance
        .patch(`declarations/${props.elm.did}/`, body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response));
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
