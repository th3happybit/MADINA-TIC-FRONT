/* eslint-disable array-callback-return */
import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  ModalContent,
  Select,
  Radio,
  Message,
} from "semantic-ui-react";

import "./MaireDeclarationTable.css";
import { useEffect } from "react";

const Modalredirect = (props) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(null);
  const [options, setOptions] = useState([]);
  const [priority, setPriority] = useState(null);
  const [serviceErr, setServiceErr] = useState(false);
  const [priorityErr, setPriorityErr] = useState(false);

  const handlepriority = (e, { value }) => {
    setPriorityErr(false);
    setPriority(value);
  };
  const handleopen = () => {
    setOpen(true);
  };
  const handlechange = (e, { value }) => {
    setServiceErr(false);
    setService(value);
  };
  const handlevalidate = () => {
    let error = false;
    if (!service) {
      error = true;
      setServiceErr(true);
    }
    if (!priority) {
      error = true;
      setPriorityErr(true);
    }
    if (!error) {
      let dt = {};
      dt["service"] = service;
      dt["validated_at"] = new Date().toJSON().substr(0, 19) + "+01:00";
      dt["priority"] = priority;
      props.validate(dt, props.data.did);
      if (props.data.children)
        props.data.children.map((elm) => props.validate(dt, elm.did));
    }
  };
  const handleclose = () => {
    setPriority(null);
    setService(null);
    setServiceErr(false);
    setPriorityErr(false);
    setOpen(false);
  };
  useEffect(() => {
    let arr = [];
    props.services.map((elem, index) => {
      arr.push({
        key: index,
        value: elem.uid,
        text: elem.first_name + " " + elem.last_name,
      });
    });
    setOptions(arr);
  }, [props.services]);
  return (
    <Modal
      open={open}
      onClose={handleclose}
      className="_redirect_modal"
      trigger={
        <>
          <Button
            onClick={handleopen}
            animated
            color="blue"
            className="_primary _hidden_on_mobile"
          >
            <Button.Content visible content="Valider" />
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          <Button
            onClick={handleopen}
            color="blue"
            icon={{ name: "checkmark" }}
            className="shadow _mobile_btn _primary"
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          <div className="_header_modal extra-text text-default">
            <p>Confirmation de validation {"&"} redirection</p>
          </div>
          <div className="_redirection_content">
            <div>
              <label className="text-default">Redirection à :</label>
              <Select
                onClick={() => setServiceErr(false)}
                className="shadow"
                placeholder="Service"
                options={options}
                onChange={handlechange}
                error={
                  serviceErr && {
                    content: "ce field est obligatoire",
                    class: "ui pointing label red",
                  }
                }
              />
            </div>
            <div className="_priority_section">
              <Radio
                label="Critique"
                name="radioGroup"
                value={1}
                checked={priority === 1}
                onChange={handlepriority}
              />
              <Radio
                label="Important"
                name="radioGroup"
                value={2}
                checked={priority === 2}
                onChange={handlepriority}
              />
              <Radio
                label="Normal"
                name="radioGroup"
                value={3}
                checked={priority === 3}
                onChange={handlepriority}
              />
              <Radio
                label="Faible"
                name="radioGroup"
                value={4}
                checked={priority === 4}
                onChange={handlepriority}
              />
            </div>
            {priorityErr && (
              <Message
                error
                style={{
                  width: "320px",
                }}
                content="Veuillez choisir un niveau de priorité."
              />
            )}
          </div>
        </ModalContent>
        <ModalContent className="content_modal_btns">
          <Button
            animated
            color="blue"
            className="_primary"
            onClick={handlevalidate}
          >
            <Button.Content visible content="Confirmer" />
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          <Button animated onClick={handleclose} color="orange">
            <Button.Content visible content="Annuler" />
            <Button.Content hidden>
              <Icon name="delete" />
            </Button.Content>
          </Button>
        </ModalContent>
      </ModalContent>
    </Modal>
  );
};

export default Modalredirect;
