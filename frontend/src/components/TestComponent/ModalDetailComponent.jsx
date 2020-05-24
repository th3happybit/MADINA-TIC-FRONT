import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Icon } from "semantic-ui-react";

const ModalDetailComponent = (props) => {
  const { detail, isRapport, title, token, data } = props;
  const [open, setOpen] = useState(false);
  const [titleDec, setTitleDec] = useState("");
  const [files, setFiles] = useState([]);

  const handleopen = () => {
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };

  useEffect(() => {
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
          <div className="_content_modal">
            <div>
              {isRapport && <p>Title Decaration</p>}
              <p>Title Rapport</p>
            </div>
            <div
              style={{
                padding: "0 2rem",
              }}
            >
              {isRapport && <p>{titleDec}</p>}
              {files.length > 0 && <iframe src={files[0].name} />}
            </div>
          </div>
        </Modal.Content>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDetailComponent;
