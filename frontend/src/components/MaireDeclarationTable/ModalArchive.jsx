import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent } from "semantic-ui-react";

import "./MaireDeclarationTable.css";

const ModalArchive = (props) => {
  const [open, setOpen] = useState(false);

  const { modal } = props;

  const handle_archive = () => {
    props.archive(props.data.did);
    if (props.data.children)
      props.data.children.map((elm) => props.archive(elm.did));
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
            color="black"
            className={
              modal ? "shadow _hidden_on_mobile" : "shadow _hide_on_mobile"
            }
          >
            <Button.Content visible content="Archiver" />
            <Button.Content hidden>
              <Icon name="archive" />
            </Button.Content>
          </Button>
          <Button
            onClick={handleopen}
            color="black"
            icon={{ name: "archive" }}
            className={modal ? "shadow _mobile_btn" : "shadow _hide_on_desktop"}
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Confirmation d'archivation</p>
          </div>
          <div className="_redirection_content">
            <p className="text-default">
              Confirmation d'archiver cette declaration ?
            </p>
          </div>
        </ModalContent>
        <ModalContent className="content_modal_btns">
          <Button
            animated
            color="blue"
            className="_primary"
            onClick={handle_archive}
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

export default ModalArchive;
