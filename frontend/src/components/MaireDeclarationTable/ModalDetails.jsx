/* eslint-disable react-hooks/exhaustive-deps */
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

import RedirectModel from "./ModalRedirection.jsx";
import ComplementModal from "./ModalComplement.jsx";
import DeleteModal from "./ModalDelete.jsx";
import ArchiveModal from "./ModalArchive.jsx";
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
  function getPriority(p) {
    switch (p) {
      case 1:
        return "Critical";
      case 4:
        return "Low";
      case 3:
        return "Normal";
      case 2:
        return "Important";
      default:
        break;
    }
  }

  useEffect(() => {
    if (Maire)
      if (props.data.attachements.length > 0) {
        setactive(0);
        setMax(props.data.attachements.length - 1);
      }
  }, []);

  const { title, data, Maire } = props;
  const handleClick = (e) => {
    window.open(e.currentTarget.src);
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
            className="shadow btn_account_detail pointer _primary _hide_on_desktop"
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
              <p>{data.fullname ? "Citizen Name" : null}</p>
              <p>{data.title ? "Title" : null}</p>
              <p>{data.type ? "Type" : null}</p>
              <p>{data.address ? "Address" : null}</p>
              <p>{data.created_on ? "Added at" : null}</p>
              <p>{data.validated_at ? "Validated_at" : null}</p>
              <p>{data.status ? "Status" : null}</p>
              <p>{data.priority ? "Priority" : null}</p>
              <p>{data.description ? "Description" : null}</p>
              {data.attachements
                ? data.attachements.length > 0 && (
                    <p className="_image">Images</p>
                  )
                : null}
            </div>
            <div className="_infos_section">
              <p>{data.fullname ? data.fullname : null}</p>
              <p>{data.title ? data.title : null}</p>
              <p>{data.type ? data.type : null}</p>
              <p>{data.address ? data.address : null}</p>
              <p>{data.created_on ? data.created_on : null}</p>
              <p>{data.validated_at ? data.validated_at : null}</p>
              <p>{data.status ? data.status : null}</p>
              <p>{data.priority ? getPriority(data.priority) : null}</p>
              <p>{data.description}</p>
              {data.attachements
                ? data.attachements.length > 0 && (
                    <div className="_images_slides">
                      {data.attachements.length > 1 && (
                        <Button
                          circular
                          size={window.innerWidth > 660 ? "medium" : "tiny"}
                          onClick={handledecrement}
                          className="shadow"
                          icon={{ name: "chevron left" }}
                        />
                      )}
                      {data.attachements.map((element, index) => {
                        return (
                          index === active && (
                            <Transition.Group
                              animation={"browse"}
                              duration={1000}
                            >
                              <Image
                                src={element.src}
                                key={index}
                                rounded
                                onClick={handleClick}
                              />
                            </Transition.Group>
                          )
                        );
                      })}
                      {data.attachements.length > 1 && (
                        <Button
                          circular
                          onClick={handleincrement}
                          size={window.innerWidth > 660 ? "medium" : "tiny"}
                          className="shadow"
                          icon={{ name: "chevron right" }}
                        />
                      )}
                    </div>
                  )
                : null}
            </div>
          </div>
        </Modal.Content>{" "}
        {Maire && (
          <>
            {data.status === "Not Validated" && (
              <Modal.Content className="content_modal_btns marginTop">
                <RedirectModel
                  modal
                  data={{
                    did: data.did,
                    title: data.title,
                    maire: props.maire,
                    declaration: data.did,
                    citizen: data.citizen,
                    dtype: data.dtype,
                    desc: data.description,
                  }}
                  validate={props.validate}
                  services={props.data.services}
                  close={handleclose}
                />
                <ComplementModal
                  modal
                  data={{
                    did: data.did,
                    title: data.title,
                    maire: props.maire,
                    declaration: data.did,
                    citizen: data.citizen,
                    dtype: data.dtype,
                    desc: data.description,
                  }}
                  complement={props.complement}
                  close={handleclose}
                />
                <DeleteModal
                  modal
                  data={{
                    did: data.did,
                    title: data.title,
                    maire: props.maire,
                    declaration: data.did,
                    citizen: data.citizen,
                    dtype: data.dtype,
                    desc: data.description,
                  }}
                  reject={props.reject}
                  close={handleclose}
                />
              </Modal.Content>
            )}
            {data.status === "Treated" && (
              <Modal.Content className="content_modal_btns marginTop">
                <ArchiveModal
                  modal
                  data={{
                    did: data.did,
                    title: title,
                    citizen: data.citizen,
                    dtype: data.dtype,
                    desc: data.description,
                  }}
                  archive={props.archive}
                  close={handleclose}
                />
              </Modal.Content>
            )}{" "}
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
