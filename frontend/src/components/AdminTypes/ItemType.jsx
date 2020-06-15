import React, { useState } from "react";
import Axios from "axios";
import {
  Container,
  Grid,
  Segment,
  Icon,
  Button,
  List,
  Input,
} from "semantic-ui-react";
const ItemType = (props) => {
  const { index, elm } = props;
  const [clicked, setClicked] = useState(false);
  const [newName, setnewName] = useState(elm.name);

  const deleteItem = () => {
    let instance = Axios.create({
      baseURL: "https://www.madina-tic.ml/api",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    });
    instance
      .delete(`/declarations_types/${elm.dtid}/`)
      .then((res) => {
        props.refresh(elm.dtid);
      })
      .catch((err) => {
      });
  };
  const handleUpdate = () => {
    let instance = Axios.create({
      baseURL: "https://www.madina-tic.ml/api",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    });
    let body = {
      name: newName,
    };
    instance
      .patch(`/declarations_types/${elm.dtid}/`, body)
      .then((res) => {
        props.refreshUpdt(elm.dtid, res.data);
        setClicked((prevState) => !prevState);
      })
      .catch((err) => {
      });
  };
  const handleInput = (e, { name, value }) => {
    switch (name) {
      case "name":
        setnewName(value);
        break;

      default:
        break;
    }
  };
  return (
    <List.Item key={index}>
      <List.Content floated="right">
        {!clicked && (
          <Button
            className="upd"
            onClick={() => {
              setClicked((prevState) => !prevState);
            }}
          >
            Modifier
          </Button>
        )}
        {!clicked && <Button onClick={deleteItem}>Supprimer</Button>}
        {clicked && (
          <Button className="conf" onClick={handleUpdate}>
            Confirmer
          </Button>
        )}
        {clicked && (
          <Button
            className="anl"
            onClick={() => {
              setClicked((prevState) => !prevState);
            }}
          >
            Annuler
          </Button>
        )}
      </List.Content>
      {!clicked && <List.Content>{elm.name}</List.Content>}
      {clicked && (
        <Input
          value={newName}
          name="name"
          onChange={handleInput}
          className="inpt_dec_type"
          type="text"
        />
      )}
    </List.Item>
  );
};

export default ItemType;
