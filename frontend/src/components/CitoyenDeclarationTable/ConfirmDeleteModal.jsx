import React, { useState } from "react";
import { Modal, Button, Icon, Popup } from "semantic-ui-react";

const ModalC = (props) => {
  const [openC, setopenC] = useState(false);

  const { onConfirm, did, isArabe } = props;

  const handleclose = () => {
    setopenC(false);
  };

  const handleopen = () => {
    setopenC(true);
  };

  const handelConfirm = () => {
    if (openC) {
      onConfirm(did);
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
        <Button.Group  className={isArabe ? "manage_button" : ""} onClick={handleopen}>
          <Popup
            content={props.isArabe ? "حذف" : "Delete"}
            trigger={
              <Button
                icon
                color={"red"}
                className={`shadow _hide_on_mobile`}
              >
                <Icon name="delete" color="white" />
              </Button>
            }
          />

          <Button
            color={"red"}
            className="shadow btn_account_detail pointer _show_on_mobile"
            content={props.isArabe ? "حذف" : "Delete"}
          />
        </Button.Group>
      }
    >
      <Modal.Content className="_confirm_action_citoyen">
        {" "}
        <div className="_header_modal extra-text text-default">
          <p>{isArabe ? "تأكيد الخيار" : "Confirm Your Action"}</p>
        </div>
        <div className="_content_modal_approve">
          <p>
            {isArabe
              ? "هل تريد حذف التصريح ؟ هذه الخطوة لا يمكن التراجع عنها"
              : "Confirm delete ? This action is irreversible."}
          </p>
        </div>
        <div className="content_modal_btns">
          {!isArabe ? (
            <>
              <Button className="button_primary" onClick={handelConfirm}>
                Confirm
              </Button>
              <Button className="button_secondary" onClick={handleclose}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button className="button_secondary" onClick={handleclose}>
                إلغاء
              </Button>
              <Button className="button_primary" onClick={handelConfirm}>
                تأكيد
              </Button>
            </>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalC;
