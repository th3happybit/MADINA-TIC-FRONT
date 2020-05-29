import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Icon, Image } from "semantic-ui-react";

const ModalDetailComponent = (props) => {
  const {
    detail,
    isRapport,
    title,
    token,
    data,
    role,
    activeFilter,
    report,
  } = props;
  const [open, setOpen] = useState(false);
  const [titleDec, setTitleDec] = useState("");
  const [files, setFiles] = useState([]);
  const [motif, setMorif] = useState(null);

  const handleopen = () => {
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (role === "service" && activeFilter === "archived" && report) {
      let instance = axios.create({
        baseURL: "http://157.230.19.233/api/",
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    if (isRapport) {
      let url = `http://157.230.19.233/api/declarations/${data.declaration}`;
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
          setTitleDec(res.data.title);
        })
        .catch((err) => {
          console.log(err.reponse);
        });
    }
    //? SECOND REQUEST FOR FILES
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
        url: `http://157.230.19.233/api/documents/?report__rid=${data.rid}`,
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
      .catch((err) => {
        console.log({ DocErr: err.reponse });
      });
  }, [data]);
  console.log({ files });
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
            <p>{title} Details</p>
          </div>
          <div className="_content_modal ">
            <div>
              {isRapport && <p>Title Decaration</p>}
              {motif && activeFilter === "archived" && (
                <p>motif of rejection</p>
              )}
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
              {isRapport && <p>{titleDec}</p>}
              {motif && activeFilter === "archived" && <p>{motif}</p>}
              {detail.map((elm) => (
                <p>{data[elm.value] ? data[elm.value] : "/"}</p>
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
                              "http://157.230.19.233/" + String(file.src)
                            );
                          }}
                        >
                          {file.src.split("/")[3]}
                        </p>
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDetailComponent;
