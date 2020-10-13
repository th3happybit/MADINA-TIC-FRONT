import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Icon,
  Popup,
  Transition,
  Image,
} from "semantic-ui-react";

import ConfirmModal from "./ModalConfirmComponent.jsx";
import RejectComplement from "./ModalRejectComplement.jsx";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ModalDetailComponent = (props) => {
  const {
    detail,
    isRapport,
    title,
    uid,
    token,
    data,
    role,
    activeFilter,
    report,
    TimeExtract,
    getMonth,
    refresh,
    archive,
    trigger,
    fromDeclaration,
  } = props;
  const [open, setOpen] = useState(false);
  const [declaration, setDeclaration] = useState("");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [active, setactive] = useState(0);
  const [max, setMax] = useState(null);
  const [motif, setMorif] = useState(null);
  const [children, setChildren] = useState([]);

  const handleopen = () => {
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };
  const ComplementDemand = (reason) => {
    const demand = {
      reason: reason,
      report: data.rid,
      maire: uid,
    };
    axios
      .create({
        headers: {
          post: {
            "Content-type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/reports_complement_demand/",
        data: demand,
        method: "post",
      })
      .then((res) => {
        refresh();
      });
  };
  const updateDecStatus = (dec, id) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/declarations/${id}/`,
        method: "patch",
        data: dec,
      })
      .then((res) => {})
      .catch((err) => {});
  };
  const updateRepStatus = (rep, dec) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/reports/${data.rid}/`,
        method: "patch",
        data: rep,
      })
      .then((res) => {
        if (dec) {
          updateDecStatus(dec, data.declaration);
          if (children.length > 0)
            children.map((elm) => updateDecStatus(dec, elm.did));
          refresh();
        } else refresh();
      })
      .catch((err) => {});
  };
  const updateAnnStatus = (ann) => {
    axios
      .create({
        headers: {
          patch: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/announces/${data.aid}/`,
        method: "patch",
        data: ann,
      })
      .then((res) => {
        refresh();
      })
      .catch((err) => {});
  };
  const confirmReport = () => {
    const date = new Date();
    const report = {
      declaration: data.declaration,
      title: data.title,
      desc: data.desc,
      service: data.service,
      status: "validated",
      validated_at: date,
    };
    const dec = {
      status: "treated",
    };
    updateRepStatus(report, dec);
  };
  const ArchiveReport = () => {
    const report = {
      declaration: data.declaration,
      title: data.title,
      desc: data.desc,
      service: data.service,
      status: "archived",
    };
    updateRepStatus(report);
  };
  const ArchiveAnnonce = () => {
    const annonce = {
      title: data.title,
      desc: data.desc,
      start_at: data.start_at,
      end_at: data.end_at,
      status: "archived",
    };
    updateAnnStatus(annonce);
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
  const handleClick = (e) => {
    window.open(e.currentTarget.src);
  };
  useEffect(() => {
    if (role === "service" && activeFilter === "archived" && report) {
      let instance = axios.create({
        baseURL: "https://madina-tic.ml/api/",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem(token)}`,
        },
      });
      instance
        .get(`reports_complement_demand/?report=${report}`)
        .then((res) => {
          if (res.data.results.length > 0) {
            setMorif(res.data.results[0].reason);
          }
        })
        .catch((err) => {});
    }
    if (isRapport) {
      let url = `https://madina-tic.ml/api/declarations/${data.declaration}`;
      axios
        .create({
          headers: {
            get: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem(token)}`,
            },
          },
        })
        .request({
          url,
          method: "get",
        })
        .then((res) => {
          setDeclaration(res.data);
        })
        .catch((err) => {});

      axios
        .get(`https://madina-tic.ml/api/declarations/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem(token)}`,
          },
          params: {
            parent_declaration: data.declaration,
          },
        })
        .then((res) => {
          setChildren(res.data.results);
        });
    }
    //? SECOND REQUEST FOR FILES
    if (isRapport)
      axios
        .create({
          headers: {
            get: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem(token)}`,
            },
          },
        })
        .request({
          url: `https://madina-tic.ml/api/documents/?report__rid=${data.rid}`,
          method: "get",
        })
        .then((res) => {
          let tempArr = [];
          let imgArr = [];
          if (res.data.length > 0) {
            res.data.map((elm) => {
              if (elm.filetype === "pdf") {
                tempArr.push(elm);
              }
              if (elm.filetype === "image") {
                imgArr.push(elm);
              }
            });
            setMax(imgArr.length - 1);
            setImages(imgArr);
            setFiles(tempArr);
          }
        })
        .catch((err) => {});
  }, [data]);
  return (
    <Modal
      open={open}
      onClose={handleclose}
      closeIcon
      className="_add_account_modal"
      trigger={
        fromDeclaration ? (
          <div
            onClick={() => {
              handleopen();
            }}
          >
            {trigger}
          </div>
        ) : (
          <>
            <Button.Group onClick={handleopen} className="infos_button">
              <Popup
                content="Plus d'informations"
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
              content="Plus de détails"
            />
          </>
        )
      }
    >
      <Modal.Content>
        <Modal.Content className="detail_content">
          {" "}
          <div className="_header_modal extra-text text-default">
            <p>{title} Details</p>
          </div>
          <div className="_content_modal ">
            <div>
              {isRapport && !fromDeclaration && <p>Titre du déclaration</p>}
              {motif && activeFilter === "lack_of_infos" && (
                <p>Motif du rejet</p>
              )}
              {detail.map((elm) => (
                <p>{elm.text}</p>
              ))}
              {files.length > 0 && (
                <p>{files.length > 1 ? "Fichiers" : "Fichier"}</p>
              )}
              {images.length > 0 && (
                <p style={{ marginTop: "100px" }}>
                  {files.length > 1 ? "Images" : "Image"}
                </p>
              )}
            </div>
            <div
              style={{
                padding: "0 2rem",
              }}
            >
              {isRapport && !fromDeclaration && (
                <Link
                  to={{
                    pathname:
                      role === "maire"
                        ? "/maire/declaration/infos"
                        : "/service/declaration/infos",
                    state: { id: declaration.did, token: token },
                  }}
                >
                  <p className="text-active">{declaration.title}</p>
                </Link>
              )}
              {motif && activeFilter === "archived" && <p>{motif}</p>}
              {detail.map((elm) => (
                <p className={elm.value === "desc" ? "_limit_size" : null}>
                  {data[elm.value]
                    ? elm.value === "start_at" || elm.value === "end_at"
                      ? TimeExtract(data[elm.value])
                      : elm.value === "created_on" ||
                        elm.value === "validated_at" ||
                        elm.value === "modified_at"
                      ? data[elm.value].slice(8, 10) +
                        " - " +
                        getMonth(data[elm.value].slice(5, 7)) +
                        " - " +
                        data[elm.value].slice(0, 4)
                      : data[elm.value]
                    : "/"}
                </p>
              ))}
              {files.length > 0 &&
                files.map((file, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <span
                        key={index}
                        style={{
                          display: "flex",
                          color: "#29b5f6",
                          marginRight: ".5rem",
                        }}
                      >
                        <p
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            color: "#29b5f6",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                          onClick={() => {
                            window.open(
                              "https://madina-tic.ml/" + String(file.src)
                            );
                          }}
                        >
                          {file.src.slice(11, file.src.length)}
                        </p>
                      </span>
                    </div>
                  );
                })}
              {images.length > 0 && (
                <div className="_images_slides _infos_section">
                  {images.length > 1 && (
                    <Button
                      circular
                      size={window.innerWidth > 660 ? "medium" : "tiny"}
                      onClick={handledecrement}
                      className="shadow"
                      icon={{ name: "chevron left" }}
                    />
                  )}
                  {images.map((element, index) => {
                    return (
                      index === active && (
                        <Transition.Group animation={"browse"} duration={1000}>
                          <Image
                            className="pointer"
                            src={"https://madina-tic.ml/" + element.src}
                            key={index}
                            rounded
                            onClick={handleClick}
                          />
                        </Transition.Group>
                      )
                    );
                  })}
                  {images.length > 1 && (
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
        <Modal.Content
          style={{ "margin-top": "20px" }}
          className="content_modal_btns"
        >
          {isRapport && data.status === "not_validated" && role === "maire" && (
            <>
              <ConfirmModal
                modal
                button={{ color: "blue", text: "Validate", icon: "checkmark" }}
                text="Confirmer l'approbation de ce rapport et marquer la déclaration comme terminée?"
                title="Confirmer Validation"
                OnConfirm={confirmReport}
              />
              <RejectComplement
                modal
                button={{
                  color: "orange",
                  text: "Complement",
                  icon: "sync alternate",
                }}
                text="Confirmer le complément exigeant?"
                title="Demande de complement"
                OnConfirm={ComplementDemand}
              />
            </>
          )}
          {data.status === "published" && role === "service" && (
            <ConfirmModal
              modal
              disabled={archive ? false : true}
              button={{ color: "black", text: "Archiver", icon: "archive" }}
              text="Confirmer l'envoi de ce rapport aux archives?"
              title="Confirmer Archive"
              OnConfirm={ArchiveAnnonce}
            />
          )}
          {isRapport &&
            archive &&
            data.status === "validated" &&
            role === "service" && (
              <ConfirmModal
                modal
                button={{ color: "black", text: "Archiver", icon: "archive" }}
                text="Confirmer l'envoi de ce rapport aux archives ?"
                title="Confirmer Archive"
                OnConfirm={ArchiveReport}
              />
            )}
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDetailComponent;
