/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent } from "semantic-ui-react";

const Modalredirect = (props) => {
  const [open, setOpen] = useState(false);

  const { data } = props;

  const handlevalidate = () => {
    props.validate(data);
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
            <p>Confirmation Approuvement</p>
          </div>
          <div className="_redirection_content">
            <p>Confirm Approuvement pour cette annonce ?</p>
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
