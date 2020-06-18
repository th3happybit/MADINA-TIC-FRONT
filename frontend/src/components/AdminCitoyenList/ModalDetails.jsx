import React, { useState } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);

  const handelApp = () => {
    handelApprove(uid);
    setOpen(false);
  };

  const handleopen = () => {
    setOpen(true);
  };

  const handleclose = () => {
    setOpen(false);
  };

  const {
    first_name,
    last_name,
    email,
    phone,
    is_active,
    role,
    uid,
    address,
    date_inscription,
    handelApprove,
  } = props;

  return (
    <Modal
      open={open}
      onClose={handleclose}
      closeIcon
      className="_add_account_modal"
      trigger={
        <Button.Group onClick={handleopen} className="infos_button">
          <Button icon className="shadow _hide_on_mobile _infos_btn_desktop">
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
            <p>Informations du compte</p>
          </div>
          <div className="_content_modal">
            <div style={{marginRight : "20px"}}>
              <p>Prénom</p>
              <p>Nom</p>
              <p>Email</p>
              <p>Numéro de téléphone</p>
              <p>Adresse</p>
              <p>Rôle</p>
              <p>Date d'inscription</p>
              <p>Status</p>
            </div>
            <div>
              <p>{first_name ? first_name : " / "}</p>
              <p>{last_name ? last_name : " / "}</p>
              <p>{email ? email : " / "}</p>
              <p>{phone ? phone : " / "}</p>
              <p>{address ? address : " / "}</p>
              <p>{role ? role : " / "}</p>
              <p>{date_inscription ? date_inscription : " / "}</p>
              <p>{is_active ? "Actif" : "Désactivé"}</p>
            </div>
          </div>
        </Modal.Content>
        {!is_active && (
          <Modal.Content className="content_modal_btns marginTop" d_uid={uid}>
            <Button className="button_primary" onClick={handelApp}>
              Activer
            </Button>
            <Button className="button_secondary" onClick={handleclose}>
              Rejeter
            </Button>
          </Modal.Content>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
