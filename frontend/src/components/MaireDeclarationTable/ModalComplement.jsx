import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  ModalContent,
  Form,
  Input,
} from "semantic-ui-react";

import "./MaireDeclarationTable.css";

const ModalComplement = (props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [motif, setMotif] = useState(null);

  const { modal } = props;

  const handleopen = () => {
    setOpen(true);
  };

  const handlechange = (e) => {
    setError(false);
    setMotif(e.currentTarget.value);
  };

  const handlecomplement = () => {
    if (motif && motif !== "") {
      props.complement(props.data.maire, props.data.did, motif);
      if (props.data.children) {
        props.data.children.map((elm) =>
          props.complement(props.data.maire, elm.did, motif)
        );
      }
    } else setError(true);
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
            color="orange"
            className={
              modal ? "shadow _hidden_on_mobile" : "shadow _hide_on_mobile"
            }
          >
            <Button.Content visible content="Complement" />
            <Button.Content hidden>
              <Icon name="sync alternate" />
            </Button.Content>
          </Button>
          <Button
            onClick={handleopen}
            color="orange"
            icon={{ name: "sync altrnate" }}
            className={modal ? "shadow _mobile_btn" : "shadow _hide_on_desktop"}
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Demand complement</p>
          </div>
          <div className="_redirection_content">
            <Form.Field
              label="Motif"
              control={Input}
              onChange={handlechange}
              placeholder="Enter text here..."
              error={
                error
                  ? { content: "This field can't be empty", pointing: "above" }
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
            <Button.Content visible content="Confirm" />
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          <Button animated onClick={handleclose} color="orange">
            <Button.Content visible content="Cancel" />
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
