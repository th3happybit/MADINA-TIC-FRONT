/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Modal, Button, Icon, Popup, ModalContent } from "semantic-ui-react";

import ModalApprove from "./ModalApprove.jsx";
import ModalReject from "./ModalReject.jsx";
import ModalComplement from "./ModalComplement";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);

  const { TimeExtract, getStatus, title, data } = props;

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
      closeIcon
      className="_declaration_details"
      trigger={
        <>
          <Button.Group onClick={handleopen} className="infos_button">
            <Popup
              content="Plus D'infos"
              trigger={
                <Button
                  icon
                  className="shadow _hide_on_mobile _infos_btn_desktop"
                >
                  <Icon name="info" color="black" />
                </Button>
              }
            />
          </Button.Group>
          <Button
            onClick={handleopen}
            color="blue"
            className="shadow btn_account_detail _primary _hide_on_desktop"
            content="Plus de details"
          />
        </>
      }
    >
      <Modal.Content>
        <Modal.Content className="detail_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>{title}</p>
          </div>
          <div className="_content_modal">
            <div>
              <p>Titre :</p>
              <p>Commence à :</p>
              <p>Fin à :</p>
              <p>Service :</p>
              <p>Status :</p>
              <p>Description :</p>
            </div>
            <div className="_infos_section">
              <p>{data.title}</p>
              <p>{TimeExtract(data.start_at)}</p>
              <p>{TimeExtract(data.end_at)}</p>
              <p>{data.service.first_name + " " + data.service.last_name}</p>
              <p>{getStatus(data.status)}</p>
              <p className="_limit_size">{data.description}</p>
            </div>
          </div>
        </Modal.Content>{" "}
        {data.status === "not_validated" && (
          <ModalContent className="content_modal_btns marginTop">
            <ModalApprove modal data={data} validate={props.validate} />
            <ModalComplement modal data={data} complement={props.complement} />
            <ModalReject modal data={data} reject={props.reject} />
          </ModalContent>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
