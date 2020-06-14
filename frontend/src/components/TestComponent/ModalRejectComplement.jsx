import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  ModalContent,
  Form,
  Input,
} from "semantic-ui-react";

const ModalComplement = (props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [motif, setMotif] = useState(null);

  const { modal, title, text, OnConfirm, button } = props;

  const handleopen = () => {
    setOpen(true);
  };

  const handlechange = (e) => {
    setError(false);
    setMotif(e.currentTarget.value);
  };

  const handlecomplement = () => {
    if (motif && motif !== "") OnConfirm(motif);
    else setError(true);
  };

  const handleclose = () => {
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
            color={button.color}
            className={
              modal ? "shadow _hidden_on_mobile" : "shadow _hide_on_mobile"
            }
          >
            <Button.Content visible content={button.text} />
            <Button.Content hidden>
              <Icon name={button.icon} />
            </Button.Content>
          </Button>
          <Button
            onClick={handleopen}
            color={button.color}
            icon={{ name: button.icon }}
            className={modal ? "shadow _mobile_btn" : "shadow _hide_on_desktop"}
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>{title}</p>
          </div>
          <div className="_redirection_content">
            <Form.Field
              label="Motif"
              control={Input}
              onChange={handlechange}
              placeholder="Enterer du text ici"
              error={
                error
                  ? {
                      content: "ce champ est obligatoire",
                      class: "ui basic pointing red label",
                    }
                  : false
              }
            />
          </div>
        </ModalContent>
        <ModalContent className="content_modal_btns">
          <Button
            animated
            color="blue"
            className="_primary"
            onClick={handlecomplement}
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

export default ModalComplement;
