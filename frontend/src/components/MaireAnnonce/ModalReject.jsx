import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent } from "semantic-ui-react";

const ModalApprove = (props) => {
  const [open, setOpen] = useState(false);

  const { modal } = props;

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
            className={
              modal ? "shadow _hidden_on_mobile" : "shadow _hide_on_mobile"
            }
          >
            <Button.Content visible content="reject" />
            <Button.Content hidden>
              <Icon name="delete" />
            </Button.Content>
          </Button>{" "}
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
            <p>Confirm Deleting this announcement ?</p>
          </div>
        </ModalContent>
        <ModalContent className="content_modal_btns">
          <Button
            animated
            color="blue"
            className="_primary"
            onClick={props.approve}
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

export default ModalApprove;