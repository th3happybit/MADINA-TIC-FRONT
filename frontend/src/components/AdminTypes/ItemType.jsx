import React, { useState } from "react";
import ConfirmModal from "../TestComponent/ModalConfirmComponent.jsx";
import Axios from "axios";
import { Button, List, Input, Dropdown } from "semantic-ui-react";
const ItemType = (props) => {
  const { index, elm, options } = props;
  const [clicked, setClicked] = useState(false);
  const [newName, setnewName] = useState(elm.name);
  const [service, setService] = useState(elm.service);

  const handle_service = (e, { value }) => {
    setService(value);
  };

  const deleteItem = () => {
    let instance = Axios.create({
      baseURL: "https://madina-tic.ml/api",
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
      .catch((err) => {});
  };
  const handleUpdate = () => {
    let instance = Axios.create({
      baseURL: "https://madina-tic.ml/api",
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("admin_token")}`,
      },
    });
    let body = {
      name: newName,
      service: service,
    };
    instance
      .patch(`/declarations_types/${elm.dtid}/`, body)
      .then((res) => {
        props.refreshUpdt(elm.dtid, res.data);
        setClicked((prevState) => !prevState);
      })
      .catch((err) => {});
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
      {!clicked && (
        <List.Content>
          <p>Type :&nbsp; {elm.name}</p>
          <p>Service :&nbsp; {props.getName(elm.service)}</p>
        </List.Content>
      )}
      {clicked && (
        <>
          <Input
            value={newName}
            name="name"
            onChange={handleInput}
            className="inpt_dec_type"
            type="text"
          />
          <Dropdown
            className="inpt_service_type"
            search
            scrolling
            selection
            placeholder="service ..."
            options={options}
            onChange={handle_service}
          />
        </>
      )}
    </List.Item>
  );
};

export default ItemType;
