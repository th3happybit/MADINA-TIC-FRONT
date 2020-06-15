import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Icon, Popup } from "semantic-ui-react";

import ConfirmModal from "./ModalConfirmComponent.jsx";
import RejectComplement from "./ModalRejectComplement.jsx";

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
    helper,
    archive,
  } = props;
  const [open, setOpen] = useState(false);
  const [declaration, setDeclaration] = useState("");
  const [files, setFiles] = useState([]);
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
        url: "https://www.madina-tic.ml/api/reports_complement_demand/",
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
        url: `https://www.madina-tic.ml/api/declarations/${id}/`,
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
        url: `https://www.madina-tic.ml/api/reports/${data.rid}/`,
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
      .catch((err) => {
        console.log(err);
      });
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
        url: `https://www.madina-tic.ml/api/announces/${data.aid}/`,
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
    const time = date.toLocaleTimeString();
    const now =
      date.getFullYear() +
      "-" +
      helper(date.getMonth() + 1) +
      "-" +
      helper(date.getDate()) +
      "T" +
      time +
      "+01:00";
    const report = {
      declaration: data.declaration,
      title: data.title,
      desc: data.desc,
      service: data.service,
      status: "validated",
      validated_at: now,
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
      start_at: "2021-06-04T15:05:00",
      end_at: "2021-06-05T15:05:00",
      status: "archived",
    };
    updateAnnStatus(annonce);
  };
  useEffect(() => {
    if (role === "service" && activeFilter === "archived" && report) {
      let instance = axios.create({
        baseURL: "https://www.madina-tic.ml/api/",
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
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (isRapport) {
      let url = `https://www.madina-tic.ml/api/declarations/${data.declaration}`;
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
        .get(`https://www.madina-tic.ml/api/declarations/`, {
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
          url: `https://www.madina-tic.ml/api/documents/?report__rid=${data.rid}`,
          method: "get",
        })
        .then((res) => {
          let tempArr = [];
          if (res.data.length > 0) {
            res.data.map((elm) => {
              if (elm.filetype === "pdf") {
                tempArr.push(elm);
              }
            });
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
              {isRapport && <p>Title Declaration</p>}
              {motif && activeFilter === "archived" && <p>motif of rejet</p>}
              {detail.map((elm) => (
                <p>{elm.text}</p>
              ))}
              {files.length > 0 && <p>Files</p>}
            </div>
            <div
              style={{
                padding: "0 2rem",
              }}
            >
              {isRapport && <p>{declaration.title}</p>}
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
                              "https://www.madina-tic.ml/" + String(file.src)
                            );
                          }}
                        >
                          {file.src
                            .slice(11, file.src.length - 12)
                            .replace(/_/g, " ")}
                        </p>
                      </span>
                    </div>
                  );
                })}
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
                title="Confirm Approval"
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
                title="Complement Demand"
                OnConfirm={ComplementDemand}
              />
            </>
          )}
          {data.status === "published" && role === "service" && (
            <ConfirmModal
              modal
              disabled={archive ? false : true}
              button={{ color: "black", text: "Archive", icon: "archive" }}
              text="Confirmer l'envoi de ce rapport aux archives?"
              title="Confirm Archive"
              OnConfirm={ArchiveAnnonce}
            />
          )}
          {isRapport &&
            archive &&
            data.status === "validated" &&
            role === "service" && (
              <ConfirmModal
                modal
                button={{ color: "black", text: "Archive", icon: "archive" }}
                text="Confirmer l'envoi de ce rapport aux archives?"
                title="Confirm Archive"
                OnConfirm={ArchiveReport}
              />
            )}
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDetailComponent;
