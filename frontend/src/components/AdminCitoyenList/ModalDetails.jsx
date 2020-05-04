import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);
  const {
    first_name,
    last_name,
    email,
    phone,
    is_approved,
    role,
    uid,
    address,
    date_inscription,
    handelApprove,
  } = props;

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      closeIcon
      className="_add_account_modal"
      trigger={
        <Button.Group
          onClick={() => {
            setOpen(true);
          }}
          className="infos_button"
        >
          <Button icon className="shadow _hide_on_mobile">
            <Icon name="info" color="black" />
          </Button>
          <Button
            className="shadow btn_account_detail pointer _show_on_mobile"
            content="Account details"
          />
        </Button.Group>
      }
    >
      <Modal.Content>
        <Modal.Content className="detail_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Account Details</p>
          </div>
          <div className="_content_modal">
            <div>
              <p>First Name</p>
              <p>Last Name</p>
              <p>Email</p>
              <p>Phone</p>
              <p>Adress</p>
              <p>Role</p>
              <p>Inscription date</p>
              <p>Status</p>
            </div>
            <div>
              <p>{first_name}</p>
              <p>{last_name}</p>
              <p>{email}</p>
              <p>{phone}</p>
              <p>{address}</p>
              <p>{role}</p>
              <p>{date_inscription}</p>
              <p>{is_approved ? "Validated" : "Not Validated"}</p>
            </div>
          </div>
        </Modal.Content>
        {!is_approved && (
          <Modal.Content className="content_modal_btns marginTop" d_uid={uid}>
            <Button
              className="button_primary"
              onClick={() => {
                handelApprove(uid);
              }}
            >
              Approve
            </Button>
            <Button
              className="button_secondary"
              onClick={() => {
                setOpen(false);
              }}
            >
              Reject
            </Button>
          </Modal.Content>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
