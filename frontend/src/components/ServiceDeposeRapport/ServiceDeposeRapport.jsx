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
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState(false);
  const [declaration, setDeclaration] = useState(null);
  const [service, setService] = useState(null);

  let histroy = useHistory();

  useEffect(() => {
    setDeclaration(props.props.location.state.did);
    setLoading(true);
    axios
      .get(
        "http://157.230.19.233/api/declarations/" +
          props.props.location.state.did +
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
      .get("http://157.230.19.233/api/user", {
        headers: {
          "content-type": "application/json",
          Authorization: `Token ${localStorage.getItem("service_token")}`,
        },
      })
      .then((res) => {
        setService(res.data.uid);
      });
  }, []);
  const removeMessage = () => {
    setSuccessFile(false);
    setSuccessData(false);
    setReqErr(false);
    setDuplicateErr(false);
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
    let temp = e.target.files[0];
    if (temp.type !== "application/pdf") setFileErr(true);
    else setFile(temp);
  };
  const handleDelete = () => {
    setFile(null);
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
    const formData = new FormData();
    formData.append("src", file);
    formData.append("filetype", "pdf");
    formData.append("declaration", declaration.did);
    formData.append("report", rid);
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
        url: "http://157.230.19.233/api/documents/",
        method: "post",
        data: formData,
      })
      .then((res) => {
        setUploadingFile(false);
        setSuccessFile(true);
        setFile(null);
        setTimeout(() => {
          histroy.push("/service/declaration");
        }, 2000);
      })
      .catch((err) => {
        setReqErr(true);
        setUploadingFile(false);
      });
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
        url: "http://157.230.19.233/api/reports/",
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
        if (file && file.size > 0) {
          PostFile(res.data.rid);
        } else if (!file) {
          setSuccessFile(true);
          setTimeout(() => {
            histroy.push("/service/declaration");
          }, 2000);
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
          Add Report
        </h3>
        <Form
          error={fileErr || reqError || duplicateErr}
          success={successData && successFile}
        >
          {declaration && (
            <p className="text-default">Declaration : {declaration.title}</p>
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
                content:
                  "This field can't be empty or shorter than 5 characters",
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
                  "This field can't be empty or shorter than 10 characters",
                class: "ui basic red label pointing",
              }
            }
          />
          <div className="_upload_section">
            <p className="text-default">Add Files ( Optional )</p>
            {file ? (
              <span>
                <p className="text-default">{file.name}</p>
                <Icon
                  onClick={handleDelete}
                  name="times circle"
                  className="pointer"
                  style={{ "margin-left": "10px" }}
                />
              </span>
            ) : (
              <>
                <Button
                  as={"label"}
                  htmlFor="myInput"
                  animated
                  color="blue"
                  className="_primary"
                >
                  <Button.Content visible content="Upload" />
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
                {fileErr && (
                  <Message error content={"Please upload a valid PDF file."} />
                )}
                <Transition
                  visible={successFile && successData}
                  animation="scale"
                  duration={200}
                >
                  <Message
                    success
                    className="pointer"
                    onClick={removeMessage}
                    content={"Your changes has been sent successfully. You will be redirected in 2 seconds ..."}
                  />
                </Transition>
                <Transition visible={reqError} animation="scale" duration={200}>
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Something went wrong while sending request !"}
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
                    content={
                      "A report is already attached to this declaration !"
                    }
                  />
                </Transition>
              </>
            )}
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
