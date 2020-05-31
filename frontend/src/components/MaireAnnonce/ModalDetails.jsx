/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Icon, Popup, ModalContent } from "semantic-ui-react";

import ModalApprove from "./ModalApprove.jsx";
import ModalReject from "./ModalReject.jsx";
import ModalComplement from "./ModalComplement";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { TimeExtract, getStatus, title, data } = props;

  useEffect(() => {
    if (data.service)
      axios
        .get(`http://157.230.19.233/api/users/${data.service}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("maire_token")}`,
          },
        })
        .then((res) => {
          setName(res.data.first_name + res.data.last_name);
        })
        .catch((err) => {});
  }, []);

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
              content="More Infos"
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
            content="More details"
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
              <p>Title :</p>
              <p>Starts At :</p>
              <p>Ends at :</p>
              <p>Service :</p>
              <p>Status :</p>
              <p>description :</p>
            </div>
            <div className="_infos_section">
              <p>{data.title}</p>
              <p>{TimeExtract(data.start_at)}</p>
              <p>{TimeExtract(data.end_at)}</p>
              <p>{name}</p>
              <p>{data.status}</p>
              <p>{data.description}</p>
            </div>
          </div>
        </Modal.Content>{" "}
        <ModalContent className="content_modal_btns marginTop">
          <ModalApprove modal data={data} validate={props.validate} />
          <ModalComplement modal data={data} complement={props.complement} />
          <ModalReject modal data={data} reject={props.reject} />
        </ModalContent>
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
