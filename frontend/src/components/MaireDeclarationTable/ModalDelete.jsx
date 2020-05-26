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
  const [motif, setmotif] = useState(null);
  const [error, setError] = useState(false);

  const { modal } = props;

  const handlechange = (e) => {
    setError(false);
    setmotif(e.currentTarget.value);
  };

  const handle_reject = () => {
    if (motif && motif !== "") {
      props.reject(props.data, motif);
    } else setError(true);
  };

  const handleopen = () => {
    setOpen(true);
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
            color="red"
            className={modal ? "shadow _hidden_on_mobile" : "shadow _hide_on_mobile"}
          >
            <Button.Content visible content="reject" />
            <Button.Content hidden>
              <Icon name="delete" />
            </Button.Content>
          </Button>
          <Button
            onClick={handleopen}
            color="red"
            icon={{ name: "delete" }}
            className={modal ? "shadow _mobile_btn" : "shadow _hide_on_desktop"}
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Confirm reject</p>
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
            onClick={handle_reject}
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
