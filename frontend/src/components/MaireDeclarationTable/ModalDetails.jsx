import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Image,
  Transition,
  Popup,
} from "semantic-ui-react";

import Childs from "./Childs";
import axios from "axios";
import RedirectModel from "./ModalRedirection.jsx";
import ComplementModal from "./ModalComplement.jsx";
import DeleteModal from "./ModalDelete.jsx";
import ArchiveModal from "./ModalArchive.jsx";
import ReportDetails from "../TestComponent/ModalDetailComponent.jsx";

const ModalD = (props) => {
  const { title, data, Maire, getMonth, getStatus } = props;
  const [childs, setChilds] = useState([]);
  const [report, setReport] = useState(null);

  function TimeExtract(date) {
    let ConvertedDate,
      year,
      month,
      day,
      hour,
      minute = "";
    year = date.slice(0, 4);
    month = date.slice(5, 7);
    day = date.slice(8, 10);
    hour = date.slice(11, 13);
    minute = date.slice(14, 16);
    ConvertedDate =
      year + " " + getMonth(month) + " " + day + " --- " + hour + ":" + minute;
    return ConvertedDate;
  }
  useEffect(() => {
    let instance = axios.create({
      baseURL: "https://madina-tic.ml/api/",
      responseType: "json",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("maire_token")}`,
      },
    });
    instance
      .get(`declarations/?parent_declaration=${data.did}`)
      .then((res) => {
        setChilds(res.data.results);
      })
      .catch((err) => {});

    axios
      .get(`https://madina-tic.ml/api/reports/?declaration=${data.did}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("maire_token")}`,
        },
      })
      .then((res) => {
        setReport(res.data.results[0]);
      });
  }, []);
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
        return "Critique";
      case 4:
        return "Faible";
      case 3:
        return "Normale";
      case 2:
        return "Importante";
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
            className="shadow btn_account_detail pointer _primary _hide_on_desktop"
            content="Plus d'infos"
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
              <p>{data.fullname ? "Nom & prénom" : null}</p>
              <p>{data.title ? "Titre" : null}</p>
              <p>{data.type ? "Type" : null}</p>
              <p>{data.address ? "Addresse" : null}</p>
              <p>{data.created_on ? "Ajoutéz le" : null}</p>
              <p>{data.validated_at ? "Validée le" : null}</p>
              <p>{data.status ? "Status" : null}</p>
              {data.status !== "Non validée" &&
                data.status !== "Manque d'informations" &&
                data.status !== "Refusée" && (
                  <p>{data.priority ? "Priorité" : null}</p>
                )}
              <p>{data.description ? "Déscription" : null}</p>
              {data.attachements
                ? data.attachements.length > 0 && (
                    <p className="_image">Images</p>
                  )
                : null}
              {report &&
                (data.status === "Traitée" ||
                  data.status === "En cours" ||
                  data.status === "Archivée") && (
                  <ReportDetails
                    fromDeclaration
                    trigger={
                      <p className="pointer text-active">
                        Consulter le rapport d'ici
                      </p>
                    }
                    closeParent={handleclose}
                    openParent={handleopen}
                    report={report.rid}
                    data={report}
                    detail={[
                      { text: "Titre Rapport", value: "title" },
                      { text: "Créé en", value: "created_on" },
                      { text: "Modifier en", value: "modified_at" },
                      { text: "Validé en", value: "validated_at" },
                      { text: "Description", value: "desc" },
                    ]}
                    activeFilter={report.status}
                    isRapport
                    title={"Rapport"}
                    // uid={uid}
                    role={"maire"}
                    token={"maire_token"}
                    style={{
                      margin: "0 1rem",
                    }}
                    getMonth={getMonth}
                    TimeExtract={TimeExtract}
                    getStatus={getStatus}
                    // ConfirmDeleteModal={ConfirmDeleteModal}
                    // refresh={refresh}
                    // helper={helper}
                  />
                )}
              {childs.length > 0 && data.status === "Validée" && (
                <p className="chlp">"Sous Déclarations"</p>
              )}
            </div>
            <div className="_infos_section">
              <p>{data.fullname ? data.fullname : null}</p>
              <p>{data.title ? data.title : null}</p>
              <p>{data.type ? data.type : null}</p>
              <p>{data.address ? data.address : null}</p>
              <p>{data.created_on ? data.created_on : null}</p>
              <p>{data.validated_at ? data.validated_at : null}</p>
              <p>{data.status ? data.status : null}</p>
              {data.status !== "Non validée" &&
                data.status !== "Manque d'informations" &&
                data.status !== "Refusée" && (
                  <p>{data.priority ? getPriority(data.priority) : null}</p>
                )}
              <p style={{ maxWidth: "80%", textAlign: "justify" }}>
                {data.description}
              </p>
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

              {childs.length > 0 && data.status === "Validée" && (
                <div className="childs_dec">
                  {childs.map((elm, index) => (
                    <Childs elm={elm} parent={data.did} />
                  ))}
                  <div className="btns_childs">
                    <Button
                      style={{
                        background: "var(--green)",
                        color: "white",
                      }}
                      onClick={() => {
                        props.setRefresh();
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Content>{" "}
        {Maire && (
          <>
            {data.status === "Non validée" && (
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
                    children: childs.length > 0 ? childs : null,
                    service: data.service,
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
                    children: childs.length > 0 ? childs : null,
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
                    children: childs.length > 0 ? childs : null,
                  }}
                  reject={props.reject}
                  close={handleclose}
                />
              </Modal.Content>
            )}
            {data.status === "Traitée" && (
              <Modal.Content className="content_modal_btns marginTop">
                <ArchiveModal
                  modal
                  data={{
                    did: data.did,
                    title: title,
                    citizen: data.citizen,
                    dtype: data.dtype,
                    desc: data.description,
                    children: childs.length > 0 ? childs : null,
                  }}
                  archive={props.archive}
                  close={handleclose}
                />
              </Modal.Content>
            )}
          </>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ModalD;
