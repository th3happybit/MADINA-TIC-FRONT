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
} from "semantic-ui-react";
import axios from "axios";

import "./ComplementReport.css";
import { useHistory } from "react-router-dom";

const ComplementReport = (props) => {
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
  const [filesD, setFilesD] = useState([]);
  const [fileErr, setFileErr] = useState(false);
  const [maxErr, setMaxErr] = useState(false);
  const [declaration, setDeclaration] = useState(null);
  const [service, setService] = useState(null);
  const [reason, setReason] = useState();
  const [report, setReport] = useState({});
  const [allow, setAllow] = useState(false);
  const [nullData, setNulldata] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (props.props.props.location.state) {
      setLoading(true);
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
      if (props.props.props.location.state.rid) {
        axios
          .get("http://157.230.19.233/api/reports_complement_demand", {
            params: {
              report: props.props.props.location.state.rid,
            },
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          })
          .then((res) => {
            setReason(res.data.results[0].reason);
          })
          .catch((err) => {});

        axios
          .get(
            `http://157.230.19.233/api/reports/${props.props.props.location.state.rid}`,
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
            if (res.data.status !== "lack_of_info") {
              setAllow(true);
              setNulldata(true);
            }
          })
          .catch((err) => {});
        axios
          .get("http://157.230.19.233/api/documents/", {
            params: {
              report__rid: props.props.props.location.state.rid,
            },
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${localStorage.getItem("service_token")}`,
            },
          })
          .then((res) => {
            setFiles(res.data);
            if (res.data.length === 0) setZeroFiles(true);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (props.props.props.location.state.did)
        axios
          .get(
            "http://157.230.19.233/api/declarations/" +
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
          .catch((err) => {
            console.log(err);
          });
    } else {
      setNulldata(true);
    }
  }, []);

  const handleTitle = (e, { value }) => {
    setTitleErr(false);
    setTitle(value);
    if (value === report.title && description === report.desc) {
      setEdit(false);
    } else setEdit(true);
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
  const handleDelete = (e) => {
    setMaxErr(false);
    setFileErr(false);
    setUpload(true);
    let i = parseInt(e.currentTarget.attributes["data-id"].value);
    let arr = [];
    for (let j = 0; j < files.length; j++) {
      if (j !== i) arr.push(files[j]);
      if (files[e.currentTarget.attributes["data-id"].value].dmid)
        if (filesD.length === 0)
          if (filesD.length === 0) {
            setFilesD([
              files[e.currentTarget.attributes["data-id"].value].dmid,
            ]);
          } else {
            if (
              !filesD.includes(
                files[e.currentTarget.attributes["data-id"].value].dmid
              )
            ) {
              let Tarr = filesD;
              Tarr.push(
                files[e.currentTarget.attributes["data-id"].value].dmid
              );
              setFilesD(Tarr);
            }
          }
    }
    if (arr.length === 0 && zeroFiles) setUpload(false);
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
    const formData = new FormData();
    var up = false;
    files.map((file, index) => {
      if (file.name) {
        up = true;
        formData.append("src", file);
        formData.append("filetype", "pdf");
        formData.append("declaration", declaration.did);
        formData.append("report", report.rid);
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
          url: "http://157.230.19.233/api/documents/",
          method: "post",
          data: formData,
        })
        .then((res) => {
          setUploadingFile(false);
          setSuccessFile(true);
          if (filesD.length > 0) DeleteFile();
          else setSuccessDel(true);
        })
        .catch((err) => {
          setReqErr(true);
          setUploadingFile(false);
        });
    else {
      setUploadingFile(false);
      setSuccessFile(true);
      if (filesD.length > 0) DeleteFile();
      else setSuccessDel(true);
    }
  };
  const DeleteFile = () => {
    setdelFile(true);
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
          url: `http://157.230.19.233/api/documents/${filesD[i]}/`,
          method: "delete",
        })
        .then((res) => {
          if (i === filesD.length - 1) {
            setSuccessDel(true);
            setdelFile(false);
          }
        })
        .catch((err) => {
          setReqErr(true);
        });
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
        url: `http://157.230.19.233/api/reports/${props.props.props.location.state.rid}/`,
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
        if (files.length > 0) {
          PostFile(report.rid);
        } else if (files.length === 0) {
          if (filesD.length > 0) DeleteFile();
          else setSuccessDel(true);
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
        {!nullData && report.status === "lack_of_info" ? (
          <>
            <h3 className="large-title text-default bold _margin_vertical_md">
              Complement Report
            </h3>
            <Form
              error={fileErr || reqError || duplicateErr || maxErr}
              success={successData && successFile}
            >
              <Message info header="Motif :" content={reason} />
              {declaration && (
                <p className="text-default">
                  Declaration : {declaration.title}
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
                {files &&
                  files.map((file, index) => {
                    return (
                      <span key={index}>
                        <p className="text-default">
                          {file.name
                            ? file.name
                            : file.src.slice(11, file.src.length - 12)}
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
                <Modal
                  open={successFile && successData && successDel}
                  className="_success_modal"
                >
                  <Modal.Header>Success Message</Modal.Header>
                  <Modal.Content>
                    <p className="text-default">
                      {" "}
                      Your changes has been sent successfully. Press the button
                      and you will be redirected back to reports page.
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
                      Got it !
                    </Button>
                  </Modal.Actions>
                </Modal>
                <Transition visible={reqError} animation="scale" duration={200}>
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Something went wrong while sending request !"}
                  />
                </Transition>
                <Transition visible={maxErr} animation="scale" duration={200}>
                  <Message
                    className="pointer"
                    onClick={removeMessage}
                    error
                    content={"Maximum is 3 files !"}
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
          nullData && (
            <h1
              className="text-default"
              style={{
                margin: "auto",
                "font-size": "xxx-large",
                width: "600px",
              }}
            >
              Something went wrong :( ...
            </h1>
          )
        )}
      </Segment>
    </div>
  );
};

export default ComplementReport;
