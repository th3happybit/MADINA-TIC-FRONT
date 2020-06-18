/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Icon,
  Image,
  Transition,
  Popup,
} from "semantic-ui-react";
import axios from "axios";
import ConfirmModal from "../TestComponent/ModalConfirmComponent.jsx";

const ModalD = (props) => {
  const [open, setOpen] = useState(false);
  const [active, setactive] = useState(null);
  const [max, setMax] = useState(null);
  const [children, setChildren] = useState([]);

  const TreatChildren = () => {
    let data = {
      status: "under_treatment",
    };
    children.map((elm, index) => {
      axios
        .create({
          headers: {
            patch: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          },
        })
        .request({
          url: `https://www.madina-tic.ml/api/declarations/${elm.did}/`,
          method: "patch",
          data: data,
        })
        .then((res) => {
          if (index === children.length - 1) props.refresh();
        })
        .catch((err) => {});
    });
  };

  const TreatDeclaration = () => {
    const data = {
      status: "under_treatment",
    };
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: `https://www.madina-tic.ml/api/declarations/${did}/`,
        method: "patch",
        data: data,
      })
      .then((res) => {
        if (children.length > 0) TreatChildren();
        else refresh();
      })
      .catch((err) => {});
  };

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
    let instance = axios.create({
      baseURL: "https://www.madina-tic.ml/api/",
      responseType: "json",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    instance
      .get(`declarations/?parent_declaration=${did}`)
      .then((res) => {
        setChildren(res.data.results);
      })
      .catch((err) => {});
  }, [props.attachements.length]);

  const {
    did,
    title,
    created_on,
    address,
    status,
    validated_at,
    description,
    priority,
    attachements,
    refresh,
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
              content="Plus d'infos"
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
            className="shadow mobile_button _primary _hide_on_desktop"
            content="Plus d'infos"
          />
        </>
      }
    >
      <Modal.Content>
        <Modal.Content className="detail_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>Détails du déclaration</p>
          </div>
          <div className="_content_modal">
            <div>
              <p>Titre</p>
              <p>Addresse</p>
              <p>Ajoutée le</p>
              <p>Validée le</p>
              <p>Status</p>
              <p>Priorité</p>
              <p>Déscription</p>
              {attachements.length > 0 && <p className="_image">Images</p>}
            </div>
            <div className="_infos_section">
              <p>{title ? title : "/"}</p>
              <p>{address ? address : "/"}</p>
              <p>{created_on}</p>
              <p>{validated_at ? validated_at : "/"}</p>
              <p>{status}</p>
              <p>{priority}</p>
              <p style={{ maxWidth: "300px", textAlign: "justify" }}>
                {description}
              </p>
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
        {status === "Validée" && (
          <Modal.Content
            style={{ "margin-top": "20px" }}
            className="content_modal_btns"
          >
            <ConfirmModal
              modal
              button={{ color: "blue", text: "Valider", icon: "checkmark" }}
              title="Confirmer l'action"
              text="Voulez vous marquer cette déclartion tant que 'En cours' ?"
              OnConfirm={TreatDeclaration}
            />{" "}
          </Modal.Content>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
