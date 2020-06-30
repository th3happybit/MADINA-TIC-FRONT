/* eslint-disable array-callback-return */
import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  ModalContent,
  Radio,
  Message,
} from "semantic-ui-react";

import "./MaireDeclarationTable.css";
import { useEffect } from "react";

const Modalredirect = (props) => {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState(null);
  const [priorityErr, setPriorityErr] = useState(false);

  const handlepriority = (e, { value }) => {
    setPriorityErr(false);
    setPriority(value);
  };
  const handleopen = () => {
    setOpen(true);
  };
  const handlevalidate = () => {
    let error = false;
    if (!priority) {
      error = true;
      setPriorityErr(true);
    }
    if (!error) {
      let dt = {};
      dt["service"] = props.data.service;
      dt["validated_at"] = new Date().toJSON().substr(0, 19) + "+01:00";
      dt["priority"] = priority;
      props.validate(dt, props.data.did);
      if (props.data.children)
        props.data.children.map((elm) => props.validate(dt, elm.did));
    }
  };
  const handleclose = () => {
    setPriority(null);
    setPriorityErr(false);
    setOpen(false);
  };
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
            <h2 className="text-default" style={{ marginBottom: "20px" }}>
              Choix de priorité :
            </h2>
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
