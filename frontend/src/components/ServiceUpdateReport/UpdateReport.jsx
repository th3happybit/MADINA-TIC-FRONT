import React, { useEffect, useState } from "react";
import {
  Segment,
  Form,
  Transition,
  Button,
  Modal,
  Message,
  Icon,
  Input,
  Image,
} from "semantic-ui-react";
import axios from "axios";

import "./UpdateReport.css";
import { useHistory } from "react-router-dom";

const UpdateReport = (props) => {
  const [Loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [upload, setUpload] = useState(false);
  const [zeroFiles, setZeroFiles] = useState(false);
  const [reqError, setReqErr] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [DelFile, setdelFile] = useState(false);
  const [successFile, setSuccessFile] = useState(false);
  const [uploadingData, setUplaodingData] = useState(false);
  const [successDel, setSuccessDel] = useState(false);
  const [successData, setSuccessData] = useState(false);
  const [title, setTitle] = useState(null);
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDescription] = useState(null);
  const [descErr, setDescErr] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileErr, setFileErr] = useState(false);
  const [filesD, setFilesD] = useState([]);
  const [maxErr, setMaxErr] = useState(false);
  const [declaration, setDeclaration] = useState(null);
  const [service, setService] = useState(null);
  const [report, setReport] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [maxImageErr, setMaxImageErr] = useState(false);
  const [sendP, setsendP] = useState([]);
  const [delP, setdelP] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (props.props.props.location.state) {
      setLoading(true);
      axios
        .get("https://madina-tic.ml/api/user", {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        })
        .then((res) => {
          setService(res.data.uid);
        });
      if (props.props.props.location.state.did)
        axios
          .get(
            "https://madina-tic.ml/api/declarations/" +
              props.props.props.location.state.did +
              "/",
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
              },
            }
          )
          .then((res) => {
            setDeclaration(res.data);
          })
          .catch((err) => {});
      if (props.props.props.location.state.rid) {
        axios
          .get(
            `https://madina-tic.ml/api/reports/${props.props.props.location.state.rid}`,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
              },
            }
          )
          .then((res) => {
            setReport(res.data);
            setTitle(res.data.title);
            setDescription(res.data.desc);
          })
          .catch((err) => {});
        axios
          .get("https://madina-tic.ml/api/documents", {
            params: {
              report__rid: props.props.props.location.state.rid,
            },
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          })
          .then((res) => {
            setFiles(
              res.data.filter((elm) => {
                return elm.filetype === "pdf";
              })
            );
            setPictures(
              res.data.filter((elm) => {
                return elm.filetype === "image";
              })
            );
            if (res.data.length === 0) setZeroFiles(true);
            setLoading(false);
          });
      }
    }
  }, []);
  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPictures((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleTitle = (e, { value }) => {
    setTitleErr(false);
    setTitle(value);
    if (value === report.title && description === report.desc) setEdit(false);
    else setEdit(true);
  };
  const handleDesc = (e, { value }) => {
    setDescErr(false);
    setDescription(value);
    if (value === report.desc && title === report.title) setEdit(false);
    else setEdit(true);
  };
  const removeMessage = () => {
    setMaxErr(false);
    setReqErr(false);
    setDuplicateErr(false);
    setMaxImageErr(false);
  };
  const handleUpload = (e) => {
    setFileErr(false);
    if (files.length === 3) {
      setMaxErr(true);
      return;
    }
    let tmp = e.target.files[0];
    if (tmp && tmp.size > 0 && tmp.type === "application/pdf") {
      if (files.length === 0) {
        setFiles([tmp]);
        setUpload(true);
      } else {
        setFiles((prevState) => [...prevState, tmp]);
        setUpload(true);
      }
    } else if (tmp) {
      setFileErr(true);
    }
  };
  const handledeleteImg = (e) => {
    let indexElm = parseInt(e.currentTarget.attributes["data-id"].value);
    let f = [];
    let del = delP;
    pictures.map((elm, index) => {
      if (index !== indexElm) {
        f.push(elm);
      } else {
        if (elm.src) {
          del.push(elm.dmid);
          setdelP(del);
        }
      }
      return true;
    });
    setUpload(true);
    setPictures(f);
  };
  const onSelectFile = (e) => {
    if (pictures.length < 3) {
      let es = e.target.files[0];
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setUpload(true);
      setSelectedFile(es);
      setsendP((prevState) => [...prevState, es]);
    } else setMaxImageErr(true);
  };
  const handleDelete = (e) => {
    setMaxErr(false);
    setFileErr(false);
    setUpload(true);
    let i = parseInt(e.currentTarget.attributes["data-id"].value);
    let arr = [];
    for (let j = 0; j < files.length; j++) {
      if (j !== i) arr.push(files[j]);
      if (files[e.currentTarget.attributes["data-id"].value].dmid)
        if (filesD.length === 0) {
          setFilesD([files[e.currentTarget.attributes["data-id"].value].dmid]);
        } else {
          if (
            !filesD.includes(
              files[e.currentTarget.attributes["data-id"].value].dmid
            )
          ) {
            let Tarr = filesD;
            Tarr.push(files[e.currentTarget.attributes["data-id"].value].dmid);
            setFilesD(Tarr);
          }
        }
    }
    if (arr.length === 0 && zeroFiles) {
      setUpload(false);
    }
    setFiles(arr);
  };
  const handlePost = () => {
    setDuplicateErr(false);
    setReqErr(false);
    let error = false;
    if (!title || title.length < 6) {
      setTitleErr(true);
      error = true;
    }
    if (!description || description.length < 11) {
      setDescErr(true);
      error = true;
    }
    if (!error) {
      PostReport();
    }
  };
  const PostFile = (rid) => {
    setUploadingFile(true);
    if (files.length > 0) {
      const formData = new FormData();
      var up = false;
      files.map((file, index) => {
        if (file.name) {
          up = true;
          formData.append("src", file);
          formData.append("filetype", "pdf");
          formData.append("declaration", "");
          formData.append("report", rid);
        }
      });
      if (up)
        axios
          .create({
            headers: {
              post: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
              },
            },
          })
          .request({
            url: "https://madina-tic.ml/api/documents/",
            method: "post",
            data: formData,
          })
          .then((res) => {
            PostImage(rid);
            setFiles(null);
          })
          .catch((err) => {
            setReqErr(true);
            setUploadingFile(false);
          });
      else {
        PostImage(rid);
      }
    } else {
      PostImage(rid);
    }
  };
  const DeleteFile = () => {
    setdelFile(true);
    if (filesD.length > 0)
      for (let i = 0; i < filesD.length; i++) {
        axios
          .create({
            headers: {
              delete: {
                "content-type": "application/json",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
              },
            },
          })
          .request({
            url: `https://madina-tic.ml/api/documents/${filesD[i]}/`,
            method: "DELETE",
          })
          .then((res) => {
            if (i === filesD.length - 1) {
              deleteImages();
              setFilesD([]);
            }
          })
          .catch((err) => {
            setReqErr(true);
          });
      }
    else deleteImages();
  };
  const PostImage = (rid) => {
    if (sendP.length > 0) {
      let formData = new FormData();
      let uplo = false;
      sendP.map((image) => {
        uplo = true;
        formData.append("src", image, image.name);
        formData.append("filetype", "image");
        formData.append("declaration", "");
        formData.append("report", rid);
      });
      if (uplo) {
        axios
          .create({
            headers: {
              post: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${localStorage.getItem("service_token")}`,
              },
            },
          })
          .request({
            url: "https://madina-tic.ml/api/documents/",
            method: "post",
            data: formData,
          })
          .then((res) => {
            setUploadingFile(false);
            setSuccessFile(true);
          })
          .catch((err) => {});
      } else {
        setUploadingFile(false);
        setSuccessFile(true);
      }
    } else {
      setUploadingFile(false);
      setSuccessFile(true);
    }
  };
  const deleteImages = () => {
    if (delP.length > 0)
      delP.map((elm) => {
        axios
          .delete(`https://madina-tic.ml/api/documents/${elm}`, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          })
          .then((res) => {
            setSuccessDel(true);
            setdelFile(false);
          })
          .catch((err) => {});
      });
    else {
      setSuccessDel(true);
      setdelFile(false);
    }
  };
  const PostReport = () => {
    setUplaodingData(true);
    const dt = new Date().toJSON().substr(0, 19) + "+01:00";
    axios
      .create({
        headers: {
          put: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: `https://madina-tic.ml/api/reports/${report.rid}/`,
        method: "put",
        data: {
          title,
          desc: description,
          declaration: declaration.did,
          service,
          status: "not_validated",
          modified_at: dt,
        },
      })
      .then((res) => {
        setSuccessData(true);
        setUplaodingData(false);
        if (files.length > 0 || sendP.length > 0) {
          PostFile(report.rid);
        } else {
          setUploadingFile(false);
          setSuccessFile(true);
        }
        if (filesD.length > 0 || delP.length > 0) DeleteFile();
        else setSuccessDel(true);
      })
      .catch((err) => {
        setUplaodingData(false);
        if (err.response.data.declaration)
          if (err.response.data.declaration[0] === "This field must be unique.")
            setDuplicateErr(true);
          else setReqErr(true);
      });
  };

  return (
    <div className="_rapport_form">
      <Segment className="_add_form" loading={Loading}>
        {props.props.props.location.state &&
        props.props.props.location.state.did ? (
          <>
            <h3 className="large-title text-default bold _margin_vertical_md">
              Mettre à jour rapport
            </h3>
            <Form
              error={fileErr || reqError || duplicateErr || maxErr}
              success={successData && successFile && successDel}
            >
              {declaration && (
                <p className="text-default">
                  Déclaration : {declaration.title}
                </p>
              )}
              <Form.Field
                type="text"
                control={Input}
                label="Title"
                placeholder="Enter title here..."
                value={title}
                onChange={handleTitle}
                name="title"
                error={
                  titleErr && {
                    content: "Le titre doit être au minimum 5 charactères",
                    class: "ui basic red label pointing",
                  }
                }
              />
              <Form.TextArea
                label="Description"
                name="description"
                placeholder="..."
                value={description}
                onChange={handleDesc}
                error={
                  descErr && {
                    content:
                      "La description doit être au minimum 10 charactères",
                    class: "ui basic red label pointing",
                  }
                }
              />
              <div className="_upload_section">
                <p className="text-default">Ajouter fichiers ( Optionnel )</p>
                {files &&
                  files.map((file, index) => {
                    return (
                      <span key={index}>
                        <p className="text-default">
                          {file.name
                            ? file.name
                            : file.src.slice(11, file.src.length)}
                        </p>
                        <Icon
                          onClick={handleDelete}
                          name="times circle"
                          className="pointer"
                          data-id={index}
                          style={{ "margin-left": "10px" }}
                        />
                      </span>
                    );
                  })}
                <Button
                  as={"label"}
                  htmlFor="myInput"
                  animated
                  color="blue"
                  className="_primary"
                >
                  <Button.Content visible content="Télécharger" />
                  <Button.Content hidden>
                    <Icon name="upload" />
                  </Button.Content>
                </Button>
                <input
                  id="myInput"
                  style={{ display: "none" }}
                  type="file"
                  accept="application/pdf"
                  className="pointer"
                  onChange={handleUpload}
                />
                <p className="text-default" style={{ marginTop: "10px" }}>
                  Ajouter Images ( Optionel )
                </p>
                <Button
                  as={"label"}
                  htmlFor="ImagesInput"
                  animated
                  color="blue"
                  className="_primary"
                >
                  <Button.Content visible content="Télécharger" />
                  <Button.Content hidden>
                    <Icon name="upload" />
                  </Button.Content>
                </Button>
                <input
                  id="ImagesInput"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  className="pointer"
                  onChange={onSelectFile}
                />
                <div className="prev_images_dec">
                  {pictures.map((elm, index) => {
                    return (
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <Image
                          src={
                            elm.src
                              ? "https://madina-tic.ml/" + elm.src
                              : elm
                          }
                          key={index}
                        />
                        <Icon
                          color="black"
                          name="delete"
                          data-id={index}
                          onClick={handledeleteImg}
                        />
                      </div>
                    );
                  })}
                </div>
                {fileErr && (
                  <Message
                    error
                    content={
                      "Assurez que vous avez télécharger un fichier pds s'il vous plaît"
                    }
                  />
                )}
                <Modal
                  open={successFile && successData && successDel}
                  className="_success_modal"
                >
                  <Modal.Header>Message de succès</Modal.Header>
                  <Modal.Content>
                    <p className="text-default">
                      {" "}
                      Vos changement ont été sauvegarder. Cliquez sur le boutton
                      pour aller vers la pages des rapports.
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      className="_primary"
                      color="blue"
                      onClick={() => {
                        history.push("/service/rapports");
                      }}
                    >
                      D'accord !
                    </Button>
                  </Modal.Actions>
                </Modal>
                <Transition visible={reqError} animation="scale" duration={200}>
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={
                      "Un erreur s'est produit lors de l'envoi des données"
                    }
                  />
                </Transition>
                <Transition visible={maxErr} animation="scale" duration={200}>
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Le maximum est 3 fichiers !"}
                  />
                </Transition>
                <Transition
                  visible={maxImageErr}
                  animation="scale"
                  duration={200}
                >
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Le maximum est 3 images !"}
                  />
                </Transition>
                <Transition
                  visible={duplicateErr}
                  animation="scale"
                  duration={200}
                >
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Un rapport est déja attaché à cette déclaration"}
                  />
                </Transition>
              </div>
            </Form>
            <div className="_action_button">
              <Button
                disabled={upload ? false : !edit}
                loading={uploadingData || uploadingFile || DelFile}
                onClick={handlePost}
                animated
                color="blue"
                className="_primary"
              >
                <Button.Content visible content="Confirm" />
                <Button.Content hidden>
                  <Icon name="checkmark" />
                </Button.Content>
              </Button>
            </div>{" "}
          </>
        ) : (
          <h1
            className="text-default"
            style={{
              margin: "auto",
              "font-size": "xxx-large",
              width: "600px",
            }}
          >
            Un erreur s'est produit :( ...
          </h1>
        )}
      </Segment>
    </div>
  );
};

export default UpdateReport;
