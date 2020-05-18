import React, { useState, useEffect } from "react";
import axios from "axios";

//? import css
import "./UpdateDeclaration.css";

const UpdateDeclaration = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://157.230.19.233/api/declarations/?status=not_validated", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let data = res.data.results;
        let tempArr = [];
        data.map((elm, index) => {
          axios
            .get(`http://157.230.19.233/api/users/${elm.citizen}`, {
              headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              let element = elm;
              element["first_name"] = res.data.first_name;
              element["last_name"] = res.data.last_name;
              tempArr.push(element);
            })
            .catch((err) => {
              console.log(err.response);
            });
        });
        setData(tempArr);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return <div></div>;
};

export default UpdateDeclaration;
