import React from "react";

import { Modal, Button } from "semantic-ui-react";

import "./ConfirmationModal.css";

const ConfirmModal = (props) => {
  const { title, content, actionOnSubmit, actionOnCancel } = props;

  return (
    <Modal.Content className="_confirm_action_modal">
      {" "}
      <div className="_header_modal extra-text text-default">
        <p>{title}</p>
      </div>
      <div className="_content_modal_c">
        <p>{content}</p>
      </div>
      <div className={"content_modal_btns"}>
        <Button className="button_primary" onClick={actionOnSubmit}>
          Confirm
        </Button>
        <Button onClick={actionOnCancel} className="button_secondary">
          Cancel
        </Button>
      </div>
    </Modal.Content>
  );
};

export default ConfirmModal;
