import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);
  const [titleDec, setTitleDec] = useState("");

  const handleopen = () => {
    setOpen(true);
  };

  const handleclose = () => {
    setOpen(false);
  };

  const {
    created_on,
    desc,
    status,
    title,
    service,
    declaration,
    validated_at,
    rid,
  } = props.data;
  console.log(props.data);
  useEffect(() => {
    let url = `http://157.230.19.233/api/declarations/${declaration}`;
    axios
      .create({
        headers: {
          get: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url,
        method: "get",
      })
      .then((res) => {
        setTitleDec(res.data.title);
      })
      .catch((err) => {
        console.log(err.reponse);
      });
  }, [props.data]);

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
            <p>Account Details</p>
          </div>
          <div className="_content_modal">
            <div>
              <p>Title Rapport</p>
              <p>Title Declaration</p>
              <p>Created on</p>
              {validated_at && <p>Validated at</p>}
              <p>Description</p>
              <p>Role</p>
            </div>
            <div
              style={{
                padding: "0 2rem",
              }}
            >
              <p>{title}</p>
              <p>{titleDec}</p>
              <p>{created_on}</p>
              {validated_at && <p>{validated_at}</p>}
              <p>{desc}</p>
            </div>
          </div>
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
