/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Image,
  Transition,
  Popup,
} from "semantic-ui-react";

import { useEffect } from "react";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);
  const [active, setactive] = useState(null);
  const [max, setMax] = useState(null);

  const handleopen = () => {
    setOpen(true);
  };

  const handleincrement = () => {
    if (active < max) {
      const temp = active + 1;
      setactive(temp);
    }
  };

  const handledecrement = () => {
    if (active > 0) {
      const temp = active - 1;
      setactive(temp);
    }
  };

  const handleclose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.attachements.length > 0) {
      setactive(0);
      setMax(props.attachements.length - 1);
    }
  }, [props.attachements.length]);

  const {
    title,
    created_on,
    address,
    status,
    validated_at,
    description,
    priority,
    attachements,
  } = props;

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
            className="shadow mobile_button pointer _primary _hide_on_desktop"
            content="More details"
          />
        </>
      }
    >
      <Modal.Content>
        <Modal.Content className="detail_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Declaration Details</p>
          </div>
          <div className="_content_modal">
            <div>
              <p>Title</p>
              <p>Address</p>
              <p>Added at</p>
              <p>Validated at</p>
              <p>Status</p>
              <p>Pritority</p>
              <p>Description</p>
              {attachements.length > 0 && <p className="_image">Images</p>}
            </div>
            <div className="_infos_section">
              <p>{title ? title : "/"}</p>
              <p>{address ? address : "/"}</p>
              <p>{created_on}</p>
              <p>{validated_at ? validated_at : "/"}</p>
              <p>{status}</p>
              <p>{priority}</p>
              <p>{description}</p>
              {attachements.length > 0 && (
                <div className="_images_slides">
                  {attachements.length > 1 && (
                    <Button
                      circular
                      size={window.innerWidth > 660 ? "medium" : "tiny"}
                      onClick={handledecrement}
                      className="shadow"
                      icon={{ name: "chevron left" }}
                    />
                  )}
                  {attachements.map((element, index) => {
                    return (
                      index === active && (
                        <Transition.Group animation={"browse"} duration={1000}>
                          <Image src={element.src} key={index} rounded />
                        </Transition.Group>
                      )
                    );
                  })}
                  {attachements.length > 1 && (
                    <Button
                      circular
                      onClick={handleincrement}
                      size={window.innerWidth > 660 ? "medium" : "tiny"}
                      className="shadow"
                      icon={{ name: "chevron right" }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
