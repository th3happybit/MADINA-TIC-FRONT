/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Segment,
  Form,
  Button,
  Icon,
  Message,
  Input,
  Transition,
  Modal,
  Image,
} from "semantic-ui-react";

import "./ServiceDeposeRapport.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const DeposeRapport = (props) => {
  const [Loading, setLoading] = useState(false);
  const [reqError, setReqErr] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [successFile, setSuccessFile] = useState(false);
  const [uploadingData, setUplaodingData] = useState(false);
  const [successData, setSuccessData] = useState(false);
  const [title, setTitle] = useState(null);
  const [titleErr, setTitleErr] = useState(false);
  const [description, setDescription] = useState(null);
  const [descErr, setDescErr] = useState(false);
  const [files, setFiles] = useState(null);
  const [fileErr, setFileErr] = useState(false);
  const [maxErr, setMaxErr] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [maxImageErr, setMaxImageErr] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [declaration, setDeclaration] = useState(null);
  const [service, setService] = useState(null);

  let histroy = useHistory();

  useEffect(() => {
    setDeclaration(props.props.props.location.state.did);
    setLoading(true);
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
        setLoading(false);
        setDeclaration(res.data);
      });
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
  }, []);
  useEffect(() => {
    if (!selectedFile) {
      setPicturesPreview([]);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPicturesPreview((prevState) => [...prevState, objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const removeMessage = () => {
    setMaxErr(false);
    setReqErr(false);
    setMaxImageErr(false);
    setDuplicateErr(false);
  };
  const onSelectFile = (e) => {
    if (picturesPreview.length < 3) {
      setMaxImageErr(false);
      let es = e.target.files[0];
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }

      if (es.type === "image/png" || es.type === "image/jpeg") {
        setSelectedFile(es);
        setPictures((prevState) => [...prevState, es]);
      } else {
        setFileErr(true);
      }
    } else {
      setMaxImageErr(true);
    }
  };
  const handledeleteImg = (e) => {
    let indexElm = parseInt(e.currentTarget.attributes["data-id"].value);
    let preview = [];
    let f = [];
    picturesPreview.map((elm, index) => {
      if (index !== indexElm) {
        preview.push(elm);
      }
      return true;
    });
    pictures.map((elm, index) => {
      if (index !== indexElm) {
        f.push(elm);
      }
      return true;
    });
    setPictures(f);
    setPicturesPreview(preview);
  };
  const handleTitle = (e, { value }) => {
    setTitleErr(false);
    setTitle(value);
  };
  const handleDesc = (e, { value }) => {
    setDescErr(false);
    setDescription(value);
  };
  const handleUpload = (e) => {
    setFileErr(false);
    if (files && files.length === 3) {
      setMaxErr(true);
      return;
    }
    let tmp = e.target.files[0];
    if (tmp && tmp.size > 0 && tmp.type === "application/pdf") {
      if (!files) setFiles([tmp]);
      else setFiles((prevState) => [...prevState, tmp]);
    } else if (tmp) {
      setFileErr(true);
    }
  };
  const handleDelete = (e) => {
    setMaxErr(false);
    setFileErr(false);
    let i = parseInt(e.currentTarget.attributes["data-id"].value);
    let arr = [];
    for (let j = 0; j < files.length; j++) {
      if (j !== i) arr.push(files[j]);
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
  const PostImage = (rid) => {
    const formData = new FormData();
    pictures.map((image, index) => {
      formData.append("src", image);
      formData.append("filetype", "image");
      formData.append("declaration", "");
      formData.append("report", rid);
    });
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
        setPictures(null);
        setSuccessFile(true);
        setUploadingFile(false);
      })
      .catch((err) => {
        setReqErr(true);
        setUploadingFile(false);
      });
  };
  const PostFile = (rid) => {
    setUploadingFile(true);
    if (files) {
      const formData = new FormData();
      files.map((file, index) => {
        formData.append("src", file);
        formData.append("filetype", "pdf");
        formData.append("declaration", "");
        formData.append("report", rid);
      });
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
          setFiles(null);
          if (pictures.length > 0) PostImage(rid);
          else {
            setSuccessFile(true);
            setUploadingFile(false);
          }
        })
        .catch((err) => {
          setReqErr(true);
          setUploadingFile(false);
        });
    } else PostImage(rid);
  };
  const PostReport = () => {
    setUplaodingData(true);
    axios
      .create({
        headers: {
          post: {
            "content-type": "application/json",
            Authorization: `Token ${localStorage.getItem("service_token")}`,
          },
        },
      })
      .request({
        url: "https://madina-tic.ml/api/reports/",
        method: "post",
        data: {
          title,
          desc: description,
          declaration: declaration.did,
          service,
          status: "not_validated",
        },
      })
      .then((res) => {
        setSuccessData(true);
        setUplaodingData(false);
        if (files || pictures.length > 0) {
          PostFile(res.data.rid);
        } else if (!files) {
          setSuccessFile(true);
        }
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
        <h3 className="large-title text-default bold _margin_vertical_md">
          Attacher Rapport
        </h3>
        <Form
          error={fileErr || reqError || duplicateErr || maxErr}
          success={successData && successFile}
        >
          {declaration && (
            <p className="text-default">Déclaration : {declaration.title}</p>
          )}
          <Form.Field
            type="text"
            control={Input}
            label="Titre"
            placeholder="Titre ici ..."
            value={title}
            onChange={handleTitle}
            name="title"
            error={
              titleErr && {
                content: "Le titre est obligatoire",
                class: "ui basic red label pointing",
              }
            }
          />
          <Form.TextArea
            label="Déscription"
            name="description"
            placeholder="..."
            value={description}
            onChange={handleDesc}
            error={
              descErr && {
                content: "La description doit être au minimum 10 charactères",
                class: "ui basic red label pointing",
              }
            }
          />
          <div className="_upload_section">
            <p className="text-default">Ajouter fichiers ( Optionel )</p>
            {files &&
              files.map((file, index) => {
                return (
                  <span key={index}>
                    <p className="text-default">{file.name}</p>
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
              accept=".pdf"
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
              {picturesPreview.map((elm, index) => {
                return (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Image src={elm} key={index} />
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
                  "Assurez que vous avez télécharger un fichier avec un format correct s'il vous plaît"
                }
              />
            )}
            <Modal open={successFile && successData} className="_success_modal">
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
                    histroy.push("/service/declaration");
                  }}
                >
                  Got it !
                </Button>
              </Modal.Actions>
            </Modal>
            <Transition visible={reqError} animation="scale" duration={200}>
              <Message
                className="pointer"
                onClick={removeMessage}
                error
                content={"Un erreur s'est produit lors de l'envoi des données"}
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
            <Transition visible={maxImageErr} animation="scale" duration={200}>
              <Message
                className="pointer"
                onClick={removeMessage}
                error
                content={"Le maximum est 3 images !"}
              />
            </Transition>
            <Transition visible={duplicateErr} animation="scale" duration={200}>
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
            loading={uploadingData || uploadingFile}
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
        </div>
      </Segment>
    </div>
  );
};

export default DeposeRapport;
