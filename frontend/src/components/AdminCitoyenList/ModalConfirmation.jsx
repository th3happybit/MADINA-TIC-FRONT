import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalC = (props) => {
  const [openC, setopenC] = useState(false);

  const { is_active, first_name, last_name, onConfirm, uid } = props;
  const handleclose = () => {
    setopenC(false);
  };
  const handleopen = () => {
    setopenC(true);
  };
  const handelConfirm = () => {
    if (openC) {
      onConfirm(uid);
      setopenC(false);
    }
  };
  return (
    <Modal
      open={openC}
      closeIcon
      onClose={handleclose}
      className="_change_approval"
      trigger={
        !is_active ? (
          <Button.Group onClick={handleopen}>
            <Button
              icon
              color="green"
              className="_reject_btn shadow _hide_on_mobile"
            >
              <Icon name="checkmark" />
            </Button>
            <Button
              color="green"
              className="shadow _show_on_mobile _mobile_actions"
              content="Valider"
            />
          </Button.Group>
        ) : (
          <Button.Group onClick={handleopen}>
            <Button
              icon
              color="red"
              className="_approve_btn shadow _hide_on_mobile"
            >
              <Icon name="remove" />
            </Button>
            <Button
              color="red"
              className="shadow _show_on_mobile _mobile_actions"
              content="Ban"
            />
          </Button.Group>
        )
      }
    >
      <Modal.Content className="_confirm_action_citoyen">
        {" "}
        <div className="_header_modal extra-text text-default">
          <p>Confirmation de votre action</p>
        </div>
        <div className="_content_modal_approve">
          <p>
            Confirmation {is_active ? "du Ban" : "d'activation"} {first_name}{" "}
            {last_name} ?
          </p>
        </div>
        <div className="content_modal_btns">
          <Button className="button_primary" onClick={handelConfirm}>
            Confirmer
          </Button>
          <Button className="button_secondary" onClick={handleclose}>
            Annuler
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalC;
